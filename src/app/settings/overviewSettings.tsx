import { useTabContext } from "@/app/edit/TabContextProvider";
import { useThemeContext } from "@/app/edit/ThemeContextProvider";
import { ColorPickerWrapper } from "@/app/settings/ColorPickerWrapper.component";
import { JumpIcon } from "@/app/settings/JumpIcon.component";
import clsx from "clsx";
import { produce } from "immer";
import { useCallback } from "react";
import s from "./settings.module.css";

import { PreviewTab } from "@/app/edit/editor-tab.types";
import { usePickerLogic } from "@/app/settings/picker.hook";

enum OverviewPickerName {
    accent_color = "accent_color",
}

export function OverviewSettings() {
    const { data, setData } = useThemeContext();
    const iconTheme = data!.metadata.iconTheme;
    const setIconTheme = useCallback(
        (color: "light" | "dark") => {
            setData((cur) =>
                produce(cur!, (draft) => {
                    draft.metadata.iconTheme = color;
                }),
            );
        },
        [setData],
    );
    const { setPreviewTab } = useTabContext();
    const [registerHandler, contextHolder] = usePickerLogic();
    return (
        <div className={s.container}>
            {contextHolder}
            <div className={s.sectionTitle}>Icon theme</div>
            <div className="grid grid-cols-[auto,1fr] gap-y-2 gap-x-4 items-center">
                <button
                    className={clsx(
                        "w-[80px] px-3 py-1 border rounded-md",
                        iconTheme == "light"
                            ? "border-gray-700 bg-gray-700 text-white"
                            : "border-gray-300 text-gray-700",
                    )}
                    onClick={() => {
                        setIconTheme("light");
                    }}
                >
                    Light
                </button>
                <div className="text-gray-500">
                    Icons will be light, usually this is for{" "}
                    <strong>Dark Themes</strong>
                </div>
                <button
                    className={clsx(
                        "w-[80px] px-3 py-1 border rounded-md",
                        iconTheme == "dark"
                            ? "border-gray-700 bg-gray-700 text-white"
                            : "border-gray-300 text-gray-700",
                    )}
                    onClick={() => {
                        setIconTheme("dark");
                    }}
                >
                    Dark
                </button>
                <div className="text-gray-500">
                    Icons will be dark, usually this is for{" "}
                    <strong>Light Themes</strong>
                </div>
            </div>

            <hr className="my-4" />

            <div className={s.sectionTitle}>Accent color</div>
            <div className="grid grid-cols-[auto,1fr] gap-y-2 gap-x-4 items-center">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.accent = newColor;
                    }}
                    getColor={(data) => data.colors.accent}
                    {...registerHandler(OverviewPickerName.accent_color)}
                />
                <p className="text-gray-500 ">
                    Used in Suggestion Menu Highlight{" "}
                    <JumpIcon
                        onClick={() => {
                            setPreviewTab(PreviewTab.CHAT);
                        }}
                    />
                </p>
            </div>
        </div>
    );
}
