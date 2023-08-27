"use client";

import { ThemeContextProvider } from "@/app/edit/ThemeContextProvider";
import { PropsWithChildren } from "react";

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
        <ThemeContextProvider key={id} themeId={id}>
            {children}
        </ThemeContextProvider>
    ) : (
        <div> no theme ID </div>
    );
}
