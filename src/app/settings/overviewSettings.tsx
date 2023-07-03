import { ColorPickerWrapper } from "@/app/settings/messageSettings";
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
        <div className="">
            <div className="text-lg font-bold col-span-2">Icon theme</div>
            <Radio.Group
                value={iconTheme}
                onChange={(e) => {
                    setIconTheme(e.target.value);
                }}
                buttonStyle="solid"
            >
                <Radio.Button value="light">Light</Radio.Button>
                <Radio.Button value="dark">Dark</Radio.Button>u
            </Radio.Group>

            <div className="text-lg font-bold col-span-2">Accent color</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.accent = newColor;
                }}
                getColor={(data) => data.colors.accent}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Used in some part
            </p>
        </div>
    );
}
