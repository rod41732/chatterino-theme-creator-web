import { PREVIEW_TABS, TABS } from "@/app/create/ColorApp.constants";
import { useConfigContext } from "@/app/create/color-context-provider";
import { useTabContext } from "@/app/create/tab-context-provider";
import { PreviewTab, SettingsTab } from "@/app/create/tab.types";
import clsx from "clsx";
import styles from "./dank.module.css";

export function ColorApp() {
    const { setPreviewTab, setSettingsTab, settingsTab, previewTab } =
        useTabContext();
    const { data, setData } = useConfigContext();

    // modal

    return data ? (
        <div className={`h-full  flex`}>
            {/*left col*/}
            <div className="flex-1 flex-shrink overflow-hidden">
                {/*tab bar*/}
                <div className="flex items-center overflow-x-auto border-b border-gray-200 mb-4">
                    {TABS.map((it) => (
                        <button
                            className={clsx(
                                "mx-3 py-3   min-w-[80px]",
                                "hover:text-sky-500",
                                it.key == settingsTab && "text-sky-500",
                            )}
                            key={it.key}
                            onClick={() =>
                                setSettingsTab(it.key as SettingsTab)
                            }
                        >
                            {it.label}
                        </button>
                    ))}
                </div>
                <div className="overflow-auto max-h-full">
                    {TABS.find((it) => it.key == settingsTab)?.children}
                </div>
            </div>

            {/*right col*/}
            <div
                className={`flex-1 flex-shrink overflow-hidden flex flex-col ${styles.preview}`}
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
            </div>
        </div>
    ) : (
        <div> no data !</div>
    );
}
