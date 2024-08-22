"use client";
import { ThemeData, ThemeDataSchema } from "@/app/edit/color-scheme.types";
import { getThemeKey } from "@/lib/create-theme";
import { Theme } from "@/lib/db/theme";
import { useAsyncEffect } from "@/lib/hooks/use-async-effect";
import { getLocalStorage } from "@/lib/local-storage";
import { ValueOrFactory } from "@/lib/react.types";
import { ApiResponse } from "@/lib/type";
import { CHATTERINO_BLACK_THEME } from "@/resources";
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useState,
} from "react";

interface ThemeContextData {
    data: ThemeData;
    setData: (newValue: ValueOrFactory<ThemeData>) => void;
    extras: {
        owner?: Theme["owner"];
    };
}
const ThemeContext = createContext<ThemeContextData>(null as any);

interface ThemeContextProps {
    themeId: string;
}

/** ThemeContext provide data (colors) about current theme */
export const ThemeContextProvider = ({
    children,
    themeId,
}: PropsWithChildren<ThemeContextProps>) => {
    const [data, setData] = useState<ThemeData>(CHATTERINO_BLACK_THEME);
    const [error, setError] = useState("");
    const [extras, setExtras] = useState<ThemeContextData["extras"]>({});
    // load theme from storage
    useAsyncEffect(async () => {
        setError("");
        setExtras({});
        // common caching logic
        const storedData = getLocalStorage().getItem(getThemeKey(themeId));
        if (!storedData) {
            if (themeId.startsWith("local-")) {
                setError("theme is local and no data in storage");
                console.log("no data in storage");
            }
        } else {
            let raw;
            try {
                raw = JSON.parse(storedData);
            } catch (err) {
                setError(`Failed to parse JSON for local data: ${err}`);
                console.error("Error loading data", err, "data was", {
                    storedData,
                });
            }

            try {
                const parsed: ThemeData = ThemeDataSchema.parse(raw);
                setData(parsed);
            } catch (err) {
                console.error("Error parsing theme data", err);
                console.warn("Using un-validated data");
                setData(raw);
            }

            // ZOD?
            console.log("loaded data from storage");
        }
        // load remote
        if (themeId.startsWith("remote-")) {
            const remoteId = +themeId.slice("remote-".length);
            if (isNaN(remoteId)) {
                setError(`Invalid remote ID: "${remoteId}"`);
            } else {
                const theme = await fetch("/api/themes/by-id", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: remoteId }),
                    credentials: "include",
                }).then(async (res) => {
                    const data = await res.json();
                    if (!res.ok) {
                        console.error(
                            "Error getting theme by ID",
                            res.status,
                            data,
                        );
                        setError(`Failed to get theme by ID ${res.status}`);
                        throw new Error(
                            `Failed to get theme by ID ${res.status}`,
                        );
                    }
                    const themeModel = (data as ApiResponse<Theme>).data;
                    const themeData = themeModel.data as ThemeData;

                    setExtras({ owner: themeModel.owner });
                    setData(themeData);
                });
            }
        }
    }, [themeId]);

    return (
        <ThemeContext.Provider value={{ data, setData, extras }}>
            {children}
        </ThemeContext.Provider>
    );
};

export function ReadonlyThemeContextProvider({
    theme,
    children,
}: PropsWithChildren<{ theme: ThemeData }>) {
    const noop = useCallback(() => {}, []);
    return (
        <ThemeContext.Provider
            value={{ data: theme, setData: noop, extras: {} }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => {
    const v = useContext(ThemeContext);
    if (v == null) throw new Error("Missing context provider");
    return v;
};
