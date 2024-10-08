import { ThemeData } from "@/app/edit/color-scheme.types";
import { useThemeContext } from "@/app/edit/ThemeContextProvider";
import s from "@/app/settings/settings.module.css";
import { Popover } from "antd";
import clsx from "clsx";
import { produce } from "immer";
import { WritableDraft } from "immer/src/types/types-external";
import {
    ForwardedRef,
    forwardRef,
    MutableRefObject,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import { ChromePicker } from "react-color";
import { EditableInput } from "react-color/lib/components/common";

export interface ColorPickerWrapperProps {
    mutateColor: (draft: WritableDraft<ThemeData>, color: string) => void;
    getColor: (data: ThemeData) => string;
    alpha?: boolean;
    // handler
    onSelect?: () => void;
    selected?: boolean;
    onColorChange?: (color: string) => void;
}

export interface ColorPickerHandle {
    currentColor: string;
    setColor: (color: string) => void;
    undo: () => string | undefined;
}

const COLOR_NON_ALPHA_LENGTH = 7; // #rrggbb
const COLOR_WITH_ALPHA_LENGTH = 9; // #rrggbbaa

function useAutoRef<T>(v: T): MutableRefObject<T> {
    const ref = useRef(v);
    ref.current = v;
    return ref;
}

function insertWithoutDupe(list: string[], item: string): string[] {
    return [item, ...list.filter((it) => it != item)];
}

export const ColorPickerWrapper = forwardRef(function ColorPickerWrapper(
    {
        mutateColor,
        getColor,
        alpha = false,
        onColorChange,
        onSelect,
        selected = false,
    }: ColorPickerWrapperProps,
    ref: ForwardedRef<ColorPickerHandle>,
) {
    const { data: _data, setData } = useThemeContext();
    const data = useMemo(() => _data!, [_data]);
    useEffect(() => {
        onColorChange?.(getColor(data));
    }, [data, getColor]);

    const [undoStack, setUndoStack] = useState<string[]>([]);
    const [history, setHistory] = useState<string[]>([]);
    const undoStackRef = useAutoRef(undoStack);

    useEffect(() => {
        setUndoStack([getColor(data)]);
        setHistory([getColor(data)]);
    }, []);

    useImperativeHandle(ref, () => {
        return {
            currentColor: getColor(data),
            setColor: (newColor) => {
                if (alpha && newColor.length != COLOR_WITH_ALPHA_LENGTH) {
                    newColor = newColor + "ff";
                } else if (
                    !alpha &&
                    newColor.length != COLOR_NON_ALPHA_LENGTH
                ) {
                    newColor = newColor.substring(0, COLOR_NON_ALPHA_LENGTH);
                }
                setData(produce(data, (draft) => mutateColor(draft, newColor)));
                setUndoStack((stack) => [...stack, newColor]);
                setHistory((hist) => insertWithoutDupe(hist, newColor));
            },
            undo: () => {
                const stack = undoStackRef.current;
                if (stack.length < 2) return;
                const popped = stack.slice(0, -1);
                const newColor = popped.at(-1)!;

                setData(produce(data, (draft) => mutateColor(draft, newColor)));
                setUndoStack((stack) => popped);
                return newColor;
            },
        };
    }, [data, getColor, mutateColor, alpha]);

    return (
        <div
            className={clsx(
                `flex flex-wrap items-center justify-center space-x-2 ${s.container}`,
                selected ? "hover:bg-gray-300" : "",
            )}
            role="button"
            onMouseEnter={onSelect}
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
                        <div> Recently used: </div>
                        <div className="flex flex-wrap gap-2">
                            {history.map((newColor) => {
                                return (
                                    <button
                                        key={newColor}
                                        className="flex flex-col space-y-0.5 items-center"
                                        onClick={() => {
                                            setData(
                                                produce(data, (draft) =>
                                                    mutateColor(
                                                        draft,
                                                        newColor,
                                                    ),
                                                ),
                                            );
                                        }}
                                    >
                                        <div
                                            className="w-4 h-4"
                                            style={{ background: newColor }}
                                        ></div>
                                        <div className="text-xs">
                                            {newColor}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                }
                overlayClassName={clsx("bg-red p-0")}
                onOpenChange={(open) => {
                    // only trigger on close
                    if (open) return;
                    // color is known to reset popup is closed when dragging if not handled (because drag is cancelled on
                    // color picker when hide?)
                    const draggedColor = getColor(data);
                    setTimeout(() => {
                        console.log(open, draggedColor);
                        setData(
                            produce(data, (draft) =>
                                mutateColor(draft, draggedColor),
                            ),
                        );
                        setUndoStack((cur) => [...cur, draggedColor]);
                        setHistory((history) =>
                            insertWithoutDupe(history, draggedColor),
                        );
                    }, 100);
                }}
            >
                <div className="border-white border-4 rounded-md outline outline-1 outline-gray-200">
                    <div
                        className="w-5 h-5 outline outline-1 outline-gray-300 rounded-sm"
                        style={{ background: getColor(data) }}
                    ></div>
                </div>
            </Popover>

            <div className="relative flex2">
                <EditableInput
                    value={getColor(data)}
                    label="hex"
                    style={{
                        label: { display: "none" },
                        input: {
                            width: "80px",
                            fontSize: "14px",
                            border: "1px solid rgb(209, 213, 219)",
                            color: "black",
                        },
                    }}
                    onChange={(e) => {
                        let colorString = e.hex;
                        colorString = colorString.replace(/^#/, "");
                        if (
                            colorString.length != 6 &&
                            colorString.length != 8
                        ) {
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
                        setUndoStack((stack) => [...stack, colorString]);
                        setHistory((hist) =>
                            insertWithoutDupe(hist, colorString),
                        );
                    }}
                />
            </div>
        </div>
    );
});
