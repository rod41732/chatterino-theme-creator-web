import { ThemeData, useConfigContext } from "@/app/color-context-provider";
import { useMemo, useState } from "react";
import s from "@/app/settings/settings.module.css";
import { Popover } from "antd";
import { ChromePicker } from "react-color";
import { produce } from "immer";
import clsx from "clsx";
import { EditableInput } from "react-color/lib/components/common";
import { WritableDraft } from "immer/src/types/types-external";

interface ColorPickerWrapperProps {
    mutateColor: (draft: WritableDraft<ThemeData>, color: string) => void;
    getColor: (data: ThemeData) => string;
    alpha?: boolean;
}

export function ColorPickerWrapper({
    mutateColor,
    getColor,
    alpha = false,
}: ColorPickerWrapperProps) {
    const { data: _data, setData, setState } = useConfigContext();
    const data = useMemo(() => _data!, [_data]);
    const [showPicker, setShowPicker] = useState(false);

    return (
        <div
            className={`flex flex-wrap items-center justify-center space-x-2 ${s.container} mb-2`}
        >
            <Popover
                content={
                    <ChromePicker
                        className="!shadow-none select-none"
                        color={getColor(data)}
                        onChange={(color) => {
                            const alphaValue = Math.floor(
                                (color.rgb.a ?? 1) * 256,
                            );
                            const alphaPart = alpha
                                ? alphaValue.toString(16).padStart(2, "0")
                                : "";

                            setData(
                                produce(data, (draft) =>
                                    mutateColor(draft, color.hex + alphaPart),
                                ),
                            );
                        }}
                    />
                }
                overlayClassName={clsx("bg-red p-0")}
            >
                <div className="border-white border-4 rounded-md outline outline-1 outline-gray-200">
                    <div
                        className="w-5 h-5 outline outline-1 outline-gray-300 rounded-sm"
                        style={{ background: getColor(data) }}
                    ></div>
                </div>
            </Popover>

            <EditableInput
                value={getColor(data)}
                label="hex"
                style={{
                    label: { display: "none" },
                    input: {
                        width: "80px",
                        fontSize: "14px",
                        border: "1px solid rgb(209, 213, 219)",
                    },
                }}
                onChange={(e) => {
                    let colorString = e.hex;
                    colorString = colorString.replace(/^#/, "");
                    if (colorString.length != 6 && colorString.length != 8) {
                        // console.log(
                        //     "invalid color length (only 6 or 8)",
                        //     colorString,
                        // );
                        return;
                    }
                    if (!/^[0-9a-f]+$/i.test(colorString)) {
                        // console.log(
                        //     `invalid character in color [${colorString}]`,
                        // );
                        return;
                    }

                    if (alpha && colorString.length == 6) {
                        colorString = colorString + "ff";
                    } else if (!alpha && colorString.length == 8) {
                        colorString = colorString.substring(0, 6);
                    }

                    colorString = "#" + colorString;

                    setData(
                        produce(data, (draft) =>
                            mutateColor(draft, colorString),
                        ),
                    );
                }}
            />
        </div>
    );
}