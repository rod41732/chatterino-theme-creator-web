import { ColorPickerWrapper } from "@/app/settings/messageSettings";
import { useConfigContext } from "@/app/color-context-provider";
import { useCallback } from "react";
import { produce } from "immer";
import { Radio } from "antd";
import s from "./settings.module.css";
import clsx from "clsx";

export function OverviewSettings() {
    const { data, setData } = useConfigContext();
    const iconTheme = data.metadata.iconTheme;
    const setIconTheme = useCallback(
        (color: "light" | "dark") => {
            setData((cur) =>
                produce(cur, (draft) => {
                    draft.metadata.iconTheme = color;
                })
            );
        },
        [setData]
    );

    return (
        <div className={s.container}>
            <div className={s.sectionTitle}>Icon theme</div>
            <div className="grid grid-cols-[auto,1fr] gap-y-2 gap-x-4 items-center">
                <button
                    className={clsx(
                        "w-[80px] px-3 py-1 border rounded-md",
                        iconTheme == "light"
                            ? "border-gray-700 bg-gray-700 text-white"
                            : "border-gray-300 text-gray-700"
                    )}
                    onClick={() => setIconTheme("light")}
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
                            : "border-gray-300 text-gray-700"
                    )}
                    onClick={() => setIconTheme("dark")}
                >
                    Dark
                </button>
                <div className="text-gray-500">
                    Icons will be dark, usually this is for{" "}
                    <strong>Light Themes</strong>
                </div>
            </div>

            <div className="my-2">&nbsp;</div>

            <div className={s.sectionTitle}>Accent color</div>
            <div className="grid grid-cols-[auto,1fr] gap-y-2 gap-x-4 items-center">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.accent = newColor;
                    }}
                    getColor={(data) => data.colors.accent}
                />
                <p className="text-gray-500 ">Used in some part</p>
            </div>
        </div>
    );
}
