import { ConfigData, useConfigContext } from "@/app/color-context-provider";
import { produce } from "immer";
import { ColorPicker } from "antd";
import { WritableDraft } from "immer/src/types/types-external";

export function SplitSettings() {
    return (
        <div className="grid grid-cols-[1fr,auto,auto] gap-2 ">
            <div> Background </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.color.splits.background = newColor;
                    }}
                    getColor={(data) => data.color.splits.background}
                />
            </div>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                Empty area in split, also thin border
            </p>

            <h2 className="text-lg font-bold col-span-3">Header</h2>
            {/*columns*/}
            <div> Color </div>
            <div> Focused (Selected) </div>
            <div> Unfocused </div>

            <div> Background </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.splits.header.focusedBackground = newColor;
                }}
                getColor={(data) => data.color.splits.header.focusedBackground}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.splits.header.background = newColor;
                }}
                getColor={(data) => data.color.splits.header.background}
            />

            <div> Text </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.splits.header.focusedText = newColor;
                }}
                getColor={(data) => data.color.splits.header.focusedText}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.splits.header.text = newColor;
                }}
                getColor={(data) => data.color.splits.header.text}
            />

            <div> Border </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.splits.header.focusedBorder = newColor;
                }}
                getColor={(data) => data.color.splits.header.focusedBorder}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.splits.header.border = newColor;
                }}
                getColor={(data) => data.color.splits.header.border}
            />

            <h2 className="text-lg font-bold col-span-3">Split Drop Preview</h2>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                Hint rectangle when you drag and drop split
            </p>
            <div> Border </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.color.splits.dropPreviewBorder = newColor;
                    }}
                    getColor={(data) => data.color.splits.dropPreviewBorder}
                />
            </div>
            <div> Area </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.color.splits.dropPreview = newColor;
                    }}
                    getColor={(data) => data.color.splits.dropPreview}
                    alpha={true}
                />
            </div>

            <h2 className="text-lg font-bold col-span-3">Split Drop Target</h2>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                Target that is used for adding split in certain situations
            </p>
            <div> Border </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.color.splits.dropTargetRectBorder = newColor;
                    }}
                    getColor={(data) => data.color.splits.dropTargetRectBorder}
                    alpha={true}
                />
            </div>
            <div> Area </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.color.splits.dropTargetRect = newColor;
                    }}
                    getColor={(data) => data.color.splits.dropTargetRect}
                    alpha={true}
                />
            </div>

            <h2 className="text-lg font-bold col-span-3">Input</h2>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                Chat Input Field
            </p>
            <div> Text Color </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.color.splits.input.text = newColor;
                    }}
                    getColor={(data) => data.color.splits.input.text}
                    alpha={true}
                />
            </div>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                Color for character counter, if enabled.
            </p>
            <div> Background color </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.color.splits.input.background = newColor;
                    }}
                    getColor={(data) => data.color.splits.input.background}
                    alpha={true}
                />
            </div>

            <div className="col-span-3 py-4"></div>

            <div> Message separator </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.color.splits.messageSeperator = newColor;
                    }}
                    getColor={(data) => data.color.splits.messageSeperator}
                />
            </div>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                Separation line between message, if enabled.
            </p>

            <h2 className="text-lg font-bold col-span-3">Resize</h2>
            <div> Handle Color </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.color.splits.resizeHandle = newColor;
                    }}
                    getColor={(data) => data.color.splits.resizeHandle}
                />
            </div>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                Middle of resize handle color
            </p>
            <div> Background Color </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.color.splits.resizeHandleBackground = newColor;
                    }}
                    getColor={(data) =>
                        data.color.splits.resizeHandleBackground
                    }
                    alpha={true}
                />
            </div>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                &quot;glow&quot; area around handle&#39;s color (the glow is
                about 2px)
            </p>
        </div>
    );
}

interface ColorPickerWrapperProps {
    mutateColor: (draft: WritableDraft<ConfigData>, color: string) => void;
    getColor: (data: ConfigData) => string;
    alpha?: boolean;
}
export function ColorPickerWrapper({
    mutateColor,
    getColor,
    alpha = false,
}: ColorPickerWrapperProps) {
    const { data, setData } = useConfigContext();
    return (
        <ColorPicker
            format={"hex"}
            // somehow need to set default value to show properly
            defaultValue={getColor(data)}
            // it's fine to pass string!!
            color={getColor(data) as any}
            onChange={(c, h) => {
                setData(produce(data, (draft) => mutateColor(draft, h)));
            }}
            onFormatChange={() => {}}
            disabledAlpha={!alpha}
        />
    );
}
