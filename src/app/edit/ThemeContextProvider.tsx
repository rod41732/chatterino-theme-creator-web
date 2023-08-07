"use client";
import { ColorScheme, ThemeMetadata } from "@/app/edit/color-scheme.types";
import { flattenJSON } from "@/lib/flatten-json";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { CHATTERINO_BLACK_THEME } from "@/resources";
import { getThemeKey } from "@/lib/create-theme";
import { ValueOrFactory } from "@/lib/react.types";

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
        const cssVariables = flattenJSON("--", data.colors, "-");
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
        <ThemeContext.Provider value={{ data, setData }}>
            {children}
        </ThemeContext.Provider>
    );
};

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
