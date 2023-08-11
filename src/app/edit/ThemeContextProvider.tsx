"use client";
import { ColorScheme, ThemeMetadata } from "@/app/edit/color-scheme.types";
import { getThemeKey } from "@/lib/create-theme";
import { ValueOrFactory } from "@/lib/react.types";
import { CHATTERINO_BLACK_THEME } from "@/resources";
import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

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
