"use client";
import { ColorScheme, ThemeMetadata } from "@/app/edit/color-scheme.types";
import { getThemeKey } from "@/lib/create-theme";
import { ValueOrFactory } from "@/lib/react.types";
import { CHATTERINO_BLACK_THEME } from "@/resources";
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useState,
} from "react";
import { useAsyncEffect } from "@/lib/hooks/use-async-effect";
import { Theme } from "@/lib/db/theme";
import { ApiResponse } from "@/lib/type";
import { getLocalStorage } from "@/lib/local-storage";

// used for generating theme
export interface ThemeData {
    colors: ColorScheme;
    metadata: ThemeMetadata;
    ctcMeta: ChatterinoThemeCreatorMetadata;
}

interface ThemeContextData {
    data: ThemeData;
    setData: (newValue: ValueOrFactory<ThemeData>) => void;
}
const ThemeContext = createContext<ThemeContextData>(null as any);

interface ThemeContextProps {
    themeId: string;
}
export const ThemeContextProvider = ({
    children,
    themeId,
}: PropsWithChildren<ThemeContextProps>) => {
    const [data, setData] = useState<ThemeData>(CHATTERINO_BLACK_THEME);
    const [error, setError] = useState("");
    // load theme from storage
    useAsyncEffect(async () => {
        setError("");
        // common caching logic
        const storedData = getLocalStorage().getItem(getThemeKey(themeId));
        if (!storedData) {
            if (themeId.startsWith("local-")) {
                setError("theme is local and no data in storage");
                console.log("no data in storage");
            }
        } else {
            try {
                setData(JSON.parse(storedData));
                console.log("loaded data from storage");
            } catch (err) {
                setError(`Failed to parse JSON for local data: ${err}`);
                console.error("Error loading data", err, "data was", {
                    storedData,
                });
            }
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
                    setData(themeData);
                });
            }
        }
    }, [themeId]);

    return (
        <ThemeContext.Provider value={{ data, setData }}>
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
        <ThemeContext.Provider value={{ data: theme, setData: noop }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useConfigContext = () => {
    const v = useContext(ThemeContext);
    if (v == null) throw new Error("Missing context provider");
    return v;
};
interface ChatterinoThemeCreatorMetadata {
    name: string;
    createdAt: string;
    modifiedAt: string;

    checkeredRow: boolean;
    messageSeparator: boolean;
}
