"use client";
import { ColorScheme, ThemeMetadata } from "@/app/edit/model.types";
import { flattenKV } from "@/app/edit/themes-data";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { CHATTERINO_BLACK_THEME } from "@/resources";
import { getThemeKey } from "@/lib/create-theme";
import { ValueOrFactory } from "@/lib/react";

interface ChatterinoThemeCreatorMetadata {
    name: string;
    createdAt: string;
    modifiedAt: string;

    checkeredRow: boolean;
    messageSeparator: boolean;
}

// used for generating theme
export interface ThemeData {
    colors: ColorScheme;
    metadata: ThemeMetadata;
    ctcMeta: ChatterinoThemeCreatorMetadata;
}

interface ConfigContext {
    data: ThemeData;
    setData: (newValue: ValueOrFactory<ThemeData>) => void;
}

const ConfigContext = createContext<ConfigContext>(null as any);

function defaultDeserialize<T>(s: string | null, defaultValue: T): T {
    if (s == null) return defaultValue;
    try {
        return JSON.parse(s);
    } catch (err) {
        console.error("Error parsing", { s }, err);
    }
    return defaultValue;
}

export function usePersistedState<T>(
    key: string,
    defaultValue: T,
    serialize: (v: T) => string = JSON.stringify,
    deserialize: (s: string | null, def: T) => T = defaultDeserialize,
) {
    const [state, setState] = useState<T>(() => {
        return deserialize(localStorage.getItem(key), defaultValue);
    });
    useEffect(() => {
        localStorage.setItem(key, serialize(state));
    }, [state, key, serialize]);

    return [state, setState] as const;
}

interface ThemeContextProps {
    themeId: string;
}

export const ThemeContextProvider = ({
    children,
    themeId,
}: PropsWithChildren<ThemeContextProps>) => {
    const [data, setData] = useState<ThemeData>(CHATTERINO_BLACK_THEME);
    // load theme from storage
    useEffect(() => {
        const storedData = localStorage.getItem(getThemeKey(themeId));
        if (!storedData) {
            console.log("no data in storage");
            return;
        }
        try {
            setData(JSON.parse(storedData));
            console.log("loaded data from storage");
        } catch (err) {
            console.error("Error loading data", err, "data was", {
                storedData,
            });
        }
    }, [themeId]);

    useEffect(() => {
        if (!data) return;
        // the convention used for generating
        const cssVariables = flattenKV("--", data.colors, "-");
        for (const [variable, val] of cssVariables) {
            document.body.style.setProperty(variable, val);
        }
        // log css xd
        // console.log(
        //     "set props",
        //     cssVariables.map((it) => it.join(": ") + ";").join("\n")
        // );
    }, [data]);

    useEffect(() => {
        if (!data) return;
        // some "hard coded" color values that are based on theme

        document.body.style.setProperty(
            "--opposite-of-icon-theme",
            data.metadata.iconTheme == "light" ? "#000000" : "#ffffff",
        );
        document.body.style.setProperty(
            "--similar-to-icon-theme",
            data.metadata.iconTheme == "light" ? "#cccccc" : "#333333",
        );
        document.body.style.setProperty(
            "--empty-split-color",
            data.metadata.iconTheme == "light" ? "#555555" : "#999999",
        );
        document.body.style.setProperty(
            "--settings-message-separator-width",
            data.ctcMeta.messageSeparator ? "1px" : "0",
        );
    }, [data]);

    return (
        <ConfigContext.Provider value={{ data, setData }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfigContext = () => {
    const v = useContext(ConfigContext);
    if (v == null) throw new Error("Missing context provider");
    return v;
};
