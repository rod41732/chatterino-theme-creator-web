import { ColorScheme, ThemeMetadata } from "@/app/model.types";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { flattenKV } from "@/app/themes-data";

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
    data: ThemeData | null;
    state: TempState;
    settings: ChatterinoSettings;
    setData: (newValue: ValueOrFactory<ThemeData | null>) => void;
    setSettings: (newValue: ValueOrFactory<ChatterinoSettings>) => void;
    setState: (newValue: ValueOrFactory<TempState>) => void;
}

const ConfigContext = createContext<ConfigContext>(null as any);

export const THEME_DATA_KEY = "themeData";
export function saveTheme(theme: ThemeData) {
    localStorage.setItem(THEME_DATA_KEY, JSON.stringify(theme));
}
export const ConfigContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [data, setData] = useState<ThemeData | null>(null);
    const [settings, setSettings] = useState<ChatterinoSettings>({
        messageSeparator: false,
        confirmBeforeLeave: false,
    });
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
            data.metadata.iconTheme == "light" ? "#000000" : "#ffffff"
        );
        document.body.style.setProperty(
            "--similar-to-icon-theme",
            data.metadata.iconTheme == "light" ? "#cccccc" : "#333333"
        );
        document.body.style.setProperty(
            "--empty-split-color",
            data.metadata.iconTheme == "light" ? "#555555" : "#999999"
        );
    }, [data]);

    useEffect(() => {
        document.body.style.setProperty(
            "--settings-message-separator-width",
            settings.messageSeparator ? "1px" : "0"
        );
    }, [settings]);

    useEffect(() => {
        const storedData = localStorage.getItem(THEME_DATA_KEY);
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
    }, []);

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
