import { ThemeData, useConfigContext } from "@/app/color-context-provider";
import { produce } from "immer";
import { ColorPicker, Switch } from "antd";
import { WritableDraft } from "immer/src/types/types-external";

export function SplitSettings() {
    const { settings, setSettings } = useConfigContext();
    return (
        <div className="grid grid-cols-[1fr,auto,auto] gap-2 ">
            <div> Background </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.splits.background = newColor;
                    }}
                    getColor={(data) => data.colors.splits.background}
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
                    data.colors.splits.header.focusedBackground = newColor;
                }}
                getColor={(data) => data.colors.splits.header.focusedBackground}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.header.background = newColor;
                }}
                getColor={(data) => data.colors.splits.header.background}
            />

            <div> Text </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.header.focusedText = newColor;
                }}
                getColor={(data) => data.colors.splits.header.focusedText}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.header.text = newColor;
                }}
                getColor={(data) => data.colors.splits.header.text}
            />

            <div> Border </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.header.focusedBorder = newColor;
                }}
                getColor={(data) => data.colors.splits.header.focusedBorder}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.header.border = newColor;
                }}
                getColor={(data) => data.colors.splits.header.border}
            />

            <h2 className="text-lg font-bold col-span-3">Split Drop Preview</h2>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                Hint rectangle when you drag and drop split
            </p>
            <div> Border </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.splits.dropPreviewBorder = newColor;
                    }}
                    getColor={(data) => data.colors.splits.dropPreviewBorder}
                />
            </div>
            <div> Area </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.splits.dropPreview = newColor;
                    }}
                    getColor={(data) => data.colors.splits.dropPreview}
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
                        data.colors.splits.dropTargetRectBorder = newColor;
                    }}
                    getColor={(data) => data.colors.splits.dropTargetRectBorder}
                    alpha={true}
                />
            </div>
            <div> Area </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.splits.dropTargetRect = newColor;
                    }}
                    getColor={(data) => data.colors.splits.dropTargetRect}
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
                        data.colors.splits.input.text = newColor;
                    }}
                    getColor={(data) => data.colors.splits.input.text}
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
                        data.colors.splits.input.background = newColor;
                    }}
                    getColor={(data) => data.colors.splits.input.background}
                    alpha={true}
                />
            </div>

            <div className="col-span-3 py-4"></div>

            <div> Message separator </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.splits.messageSeperator = newColor;
                    }}
                    getColor={(data) => data.colors.splits.messageSeperator}
                />
            </div>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                Separation line between message, if enabled.
            </p>

            <h2 className="text-lg font-bold col-span-3">Resize</h2>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                Resize handles shows when you hold Ctrl to resize split in
                chatterino.
            </p>
            <div> Handle Color </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.splits.resizeHandle = newColor;
                    }}
                    getColor={(data) => data.colors.splits.resizeHandle}
                />
            </div>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                Middle of resize handle color
            </p>
            <div> Background Color </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.splits.resizeHandleBackground = newColor;
                    }}
                    getColor={(data) =>
                        data.colors.splits.resizeHandleBackground
                    }
                    alpha={true}
                />
            </div>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                &quot;glow&quot; area around handle&#39;s color.
            </p>

            <hr className="col-span-3" />

            <div className="col-span-2">Enable message sep (preview only)</div>
            <div>
                <Switch
                    checked={settings.messageSeparator}
                    onChange={(c) => {
                        setSettings({ messageSeparator: c });
                    }}
                />
            </div>
        </div>
    );
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
