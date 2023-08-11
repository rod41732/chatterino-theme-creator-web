import { ThemeData, useConfigContext } from "@/app/edit/ThemeContextProvider";
import s from "@/app/settings/settings.module.css";
import { Popover } from "antd";
import clsx from "clsx";
import { produce } from "immer";
import { WritableDraft } from "immer/src/types/types-external";
import { useMemo } from "react";
import { ChromePicker } from "react-color";
import { EditableInput } from "react-color/lib/components/common";

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
    const { data: _data, setData } = useConfigContext();
    const data = useMemo(() => _data!, [_data]);

    return (
        <div
            className={`flex flex-wrap items-center justify-center space-x-2 ${s.container} mb-2`}
        >
            <Popover
                content={
                    <div className="p-5 pb-0">
                        <ChromePicker
                            className="!shadow-none select-none"
                            color={getColor(data)}
                            onChange={(color) => {
                                const alphaValue =
                                    Math.ceil((color.rgb.a ?? 1) * 256) - 1;
                                console.log("alpha", alphaValue);

                                const alphaPart = alpha
                                    ? alphaValue.toString(16).padStart(2, "0")
                                    : "";

                                setData(
                                    produce(data, (draft) =>
                                        mutateColor(
                                            draft,
                                            color.hex + alphaPart,
                                        ),
                                    ),
                                );
                            }}
                        />
                    </div>
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
