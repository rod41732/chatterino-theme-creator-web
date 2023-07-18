import { ThemeData, useConfigContext } from "@/app/color-context-provider";
import { produce } from "immer";
import { ColorPicker, Popover } from "antd";
import { WritableDraft } from "immer/src/types/types-external";
import s from "./settings.module.css";
import { useMemo, useState } from "react";
import { ChromePicker } from "react-color";
import clsx from "clsx";
import { EditableInput } from "react-color/lib/components/common";

export function MessageSettings() {
    return (
        <div className={`grid grid-cols-2 gap-2 ${s.container} `}>
            <div className="text-lg font-bold col-span-2">Backgrounds</div>
            <div> Regular</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.backgrounds.regular = newColor;
                }}
                getColor={(data) => data.colors.messages.backgrounds.regular}
            />

            <div> Alternate</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.backgrounds.alternate = newColor;
                }}
                getColor={(data) => data.colors.messages.backgrounds.alternate}
            />

            {/*sep */}
            <hr className="col-span-2 my-2" />

            <div> Disabled</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.disabled = newColor;
                }}
                getColor={(data) => data.colors.messages.disabled}
                alpha={true}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Overlay color over historical or timed out messages
            </p>

            <div> Highlight Animation Start</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.highlightAnimationStart = newColor;
                }}
                getColor={(data) =>
                    data.colors.messages.highlightAnimationStart
                }
                alpha={true}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Flashing color when [Go to message] is used
            </p>

            <div> Highlight Animation End</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.highlightAnimationEnd = newColor;
                }}
                getColor={(data) => data.colors.messages.highlightAnimationEnd}
                alpha={true}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Color when [Go to message] end (usually transparent)
            </p>

            <div> Selection</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.selection = newColor;
                }}
                getColor={(data) => data.colors.messages.selection}
                alpha={true}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Color when selecting text
            </p>

            <hr className="col-span-2 my-2" />

            <div className="text-lg font-bold col-span-2">Text Colors</div>
            <div> Regular message</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.textColors.regular = newColor;
                }}
                getColor={(data) => data.colors.messages.textColors.regular}
            />

            <div> Caret</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.textColors.caret = newColor;
                }}
                getColor={(data) => data.colors.messages.textColors.caret}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Caret (blinking cursor) color. might not work on some platform.
            </p>

            <div> Chat Placeholder</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.textColors.chatPlaceholder = newColor;
                }}
                getColor={(data) =>
                    data.colors.messages.textColors.chatPlaceholder
                }
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Placeholder in chat field
            </p>

            <div> Link</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.textColors.link = newColor;
                }}
                getColor={(data) => data.colors.messages.textColors.link}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Color when [Go to message] end (usually transparent)
            </p>

            <div> System</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.textColors.system = newColor;
                }}
                getColor={(data) => data.colors.messages.textColors.system}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                System message, timestamp. etc.
            </p>
        </div>
    );
}

function trimOpacity(hexString: string): string {
    if (hexString.length == 9) {
        return hexString.substring(0, 7);
    }
    return hexString;
}

function ensureOpactiy(hexString: string): string {
    if (hexString.length == 7) {
        return hexString + "ff";
    }
    return hexString;
}

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
                        className="!shadow-none"
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
                <div
                    className="w-7 h-7 border-white border-4 rounded-md outline outline-1 outline-gray-300 relative group"
                    style={{ background: getColor(data) }}
                ></div>
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
