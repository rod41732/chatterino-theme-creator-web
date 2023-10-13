import { PropsWithChildren, useEffect, useMemo } from "react";
import { flattenJSON } from "./flatten-json";
import { ThemeData } from "@/app/edit/color-scheme.types";

export function ColorProvider({
    theme,
    className,
    children,
}: PropsWithChildren<{
    theme: ThemeData;
    className?: string;
}>) {
    const style = useMemo(() => {
        // color based styles
        const style = Object.fromEntries(flattenJSON("--", theme.colors, "-"));
        // some "hardcoded/conditional" styles
        style["--opposite-of-icon-theme"] =
            theme.metadata.iconTheme == "light" ? "#000000" : "#ffffff";
        style["--similar-to-icon-theme"] =
            theme.metadata.iconTheme == "light" ? "#cccccc" : "#333333";
        style["--empty-split-color"] =
            theme.metadata.iconTheme == "light" ? "#555555" : "#999999";
        style["--settings-message-separator-width"] = theme.ctcMeta
            .messageSeparator
            ? "1px"
            : "0";
        return style;
    }, [theme]);

    useEffect(() => {
        if (!theme) return;
        // some "hard coded" color values that are based on theme
    }, [theme]);

    return (
        <div className={className} style={style}>
            {children}
        </div>
    );
}
