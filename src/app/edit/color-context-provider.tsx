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
import { getThemeKey } from "../../../lib/create-theme";

// used for generating theme
export interface ThemeData {
    colors: ColorScheme;
    metadata: ThemeMetadata;
}

export interface ChatterinoSettings {
    messageSeparator: boolean;
    confirmBeforeLeave: boolean;
}

export interface TempState {
    hasChange: boolean;
}

type ValueOrFactory<T> = T | ((old: T) => T);

interface ConfigContext {
    data: ThemeData;
    state: TempState;
    settings: ChatterinoSettings;
    setData: (newValue: ValueOrFactory<ThemeData>) => void;
    setSettings: (newValue: ValueOrFactory<ChatterinoSettings>) => void;
    setState: (newValue: ValueOrFactory<TempState>) => void;
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

function usePersistedState<T>(
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

export const ConfigContextProvider = ({
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

    const [settings, setSettings] = usePersistedState<ChatterinoSettings>(
        "settings",
        {
            messageSeparator: false,
            confirmBeforeLeave: true,
        },
    );
    const [state, setState] = useState<TempState>({
        hasChange: false,
    });

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
    }, [data]);

    useEffect(() => {
        document.body.style.setProperty(
            "--settings-message-separator-width",
            settings.messageSeparator ? "1px" : "0",
        );
    }, [settings]);

    return (
        <ConfigContext.Provider
            value={{ data, setData, settings, setSettings, state, setState }}
        >
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfigContext = () => {
    const v = useContext(ConfigContext);
    if (v == null) throw new Error("Missing context provider");
    return v;
};
