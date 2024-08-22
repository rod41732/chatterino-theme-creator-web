import { PREVIEW_TABS } from "@/app/edit/ColorApp.constants";
import { useTabContext } from "@/app/edit/TabContextProvider";
import { useThemeContext } from "@/app/edit/ThemeContextProvider";
import { PreviewTab } from "@/app/edit/editor-tab.types";
import { ColorProvider } from "@/lib/ColorProvider";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import styles from "./preview.module.css";

function ColorProviderFromContext({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) {
    const { data } = useThemeContext();
    return (
        <ColorProvider theme={data} className={className}>
            {children}
        </ColorProvider>
    );
}

export function ColorApp() {
    const { setPreviewTab, previewTab } = useTabContext();

    // modal

    return (
        <div className={`h-full`}>
            {/*left col*/}
            {/*<div className="flex-1 max-w-md flex-shrink overflow-hidden flex flex-col">*/}
            {/*    tab bar*/}
            {/*    <div className="flex items-center overflow-x-auto border-b border-gray-200 mb-4 flex-shrink-0">*/}
            {/*        {TABS.map((it) => (*/}
            {/*            <button*/}
            {/*                className={clsx(*/}
            {/*                    "mx-3 py-3   min-w-[80px]",*/}
            {/*                    "hover:text-sky-500",*/}
            {/*                    it.key == settingsTab && "text-sky-500",*/}
            {/*                )}*/}
            {/*                key={it.key}*/}
            {/*                onClick={() =>*/}
            {/*                    setSettingsTab(it.key as SettingsTab)*/}
            {/*                }*/}
            {/*            >*/}
            {/*                {it.label}*/}
            {/*            </button>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*    <div className="overflow-auto">*/}
            {/*        {TABS.find((it) => it.key == settingsTab)?.children}*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*right col*/}
            <ColorProviderFromContext
                className={`flex-shrink h-full overflow-hidden flex flex-col ${styles.preview}`}
            >
                {/*tab bar*/}
                <div className="flex items-center overflow-x-auto">
                    {PREVIEW_TABS.map((it) => (
                        <button
                            className={clsx(
                                "mx-3 py-3   min-w-[80px]",
                                "hover:text-sky-500",
                                it.key == previewTab && "text-sky-500",
                            )}
                            key={it.key}
                            onClick={() => setPreviewTab(it.key as PreviewTab)}
                        >
                            {it.label}
                        </button>
                    ))}
                </div>
                <div className="overflow-hidden relative flex-1">
                    {PREVIEW_TABS.find((it) => it.key == previewTab)?.children}
                </div>
            </ColorProviderFromContext>
        </div>
    );
}
