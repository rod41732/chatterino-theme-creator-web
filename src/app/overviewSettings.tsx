import { ColorPickerWrapper } from "@/app/messageSettings";
import { useConfigContext } from "@/app/color-context-provider";
import { useCallback } from "react";
import { produce } from "immer";
import { Radio } from "antd";

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
        <div className="grid grid-cols-2 gap-2 ">
            <div className="text-lg font-bold col-span-2">Icon theme</div>
            <Radio.Group
                value={iconTheme}
                onChange={(e) => setIconTheme(e.target.value)}
            >
                <Radio.Button value="light">Light</Radio.Button>
                <Radio.Button value="dark">Dark</Radio.Button>
            </Radio.Group>

            <div className="text-lg font-bold col-span-2">Accent color</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.accent = newColor;
                }}
                getColor={(data) => data.color.accent}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Used in some part
            </p>
        </div>
    );
}
