"use client";

import { ThemeContextProvider } from "@/app/edit/ThemeContextProvider";
import { PropsWithChildren } from "react";
import { InsEditContextProvider } from "@/app/components/InsEdit";

interface RouteParams {
    params: {
        id: string;
    };
}
export default function ThemeEditorLayout({
    params: { id },
    children,
}: PropsWithChildren<RouteParams>) {
    return id ? (
        <InsEditContextProvider>
            <ThemeContextProvider key={id} themeId={id}>
                {children}
            </ThemeContextProvider>
        </InsEditContextProvider>
    ) : (
        <div> no theme ID </div>
    );
}
