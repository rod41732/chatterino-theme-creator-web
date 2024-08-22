"use client";

import { InspectorContextProvider } from "@/app/components/InsEdit";
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
        <InspectorContextProvider>
            <ThemeContextProvider key={id} themeId={id}>
                {children}
            </ThemeContextProvider>
        </InspectorContextProvider>
    ) : (
        <div> no theme ID </div>
    );
}
