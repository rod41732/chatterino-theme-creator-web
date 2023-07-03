import { ColorScheme, ThemeMetadata } from "@/app/model.types";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { COLOR, flattenKV } from "@/app/themes-data";

// used for generating theme
export interface ThemeData {
    colors: ColorScheme;
    metadata: ThemeMetadata;
}
export interface ChatterinoSettings {
    messageSeparator: boolean;
}

type ValueOrFactory<T> = T | ((old: T) => T);

interface ConfigContext {
    data: ThemeData;
    settings: ChatterinoSettings;
    setData: (newValue: ValueOrFactory<ThemeData>) => void;
    setSettings: (newValue: ValueOrFactory<ChatterinoSettings>) => void;
}

const ConfigContext = createContext<ConfigContext>(null as any);

export const ConfigContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [data, setData] = useState<ThemeData>({
        colors: COLOR,
        metadata: {
            iconTheme: "light",
        },
    });
    const [settings, setSettings] = useState<ChatterinoSettings>({
        messageSeparator: false,
    });

    useEffect(() => {
        // the convention used for generating
        const cssVariables = flattenKV("--", data.colors, "-");
        for (const [variable, val] of cssVariables) {
            document.body.style.setProperty(variable, val);
        }
        // log css xd
        console.log(
            "set props",
            cssVariables.map((it) => it.join(": ") + ";").join("\n")
        );
    }, [data.colors]);

    useEffect(() => {
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
    }, [data.metadata]);

    useEffect(() => {
        document.body.style.setProperty(
            "--settings-message-separator-width",
            settings.messageSeparator ? "1px" : "0"
        );
    }, [settings]);

    return (
        <ConfigContext.Provider
            value={{ data, setData, settings, setSettings }}
        >
            {" "}
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfigContext = () => {
    const v = useContext(ConfigContext);
    if (v == null) throw new Error("Missing context provider");
    return v;
};
