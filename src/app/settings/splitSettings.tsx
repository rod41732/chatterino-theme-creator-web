import { ThemeData, useConfigContext } from "@/app/color-context-provider";
import { produce } from "immer";
import { Checkbox, ColorPicker, Switch } from "antd";
import { WritableDraft } from "immer/src/types/types-external";
import s from "./settings.module.css";
import { ColorPickerWrapper } from "@/app/settings/messageSettings";

export function SplitSettings() {
    const { settings, setSettings } = useConfigContext();
    return (
        <div
            className={`grid grid-cols-[1fr,auto,auto] gap-2 h-full overflow-auto ${s.container}`}
        >
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
                Empty area in split, also seen as thin border between splits
            </p>

            <h2 className="text-lg font-bold">Header</h2>
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

            {/*columns*/}
            <div> </div>
            <div> Border </div>
            <div> Area </div>

            <div> Color </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.dropPreviewBorder = newColor;
                }}
                getColor={(data) => data.colors.splits.dropPreviewBorder}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.dropPreview = newColor;
                }}
                getColor={(data) => data.colors.splits.dropPreview}
                alpha={true}
            />

            <h2 className="text-lg font-bold col-span-3">Split Drop Target</h2>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                Target that is used for adding split in certain situations
            </p>

            {/*columns*/}
            <div> </div>
            <div> Border </div>
            <div> Area </div>

            <div> Color </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.dropTargetRectBorder = newColor;
                }}
                getColor={(data) => data.colors.splits.dropTargetRectBorder}
                alpha={true}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.dropTargetRect = newColor;
                }}
                getColor={(data) => data.colors.splits.dropTargetRect}
                alpha={true}
            />

            <h2 className="text-lg font-bold col-span-3">Input</h2>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                Chat Input Field
            </p>
            <div> Character counter color</div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.splits.input.text = newColor;
                    }}
                    getColor={(data) => data.colors.splits.input.text}
                    alpha={true}
                />
            </div>
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

            <div className="flex space-x-2 items-center col-span-3">
                <Checkbox
                    checked={settings.messageSeparator}
                    onChange={(c) => {
                        setSettings({ messageSeparator: c.target.checked });
                    }}
                />
                <div>Enable message sep (for preview only)</div>
            </div>
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

            {/*columns*/}
            <div> </div>
            <div> Handle </div>
            <div> Glow </div>

            <div> Color </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.resizeHandle = newColor;
                }}
                getColor={(data) => data.colors.splits.resizeHandle}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.resizeHandleBackground = newColor;
                }}
                getColor={(data) => data.colors.splits.resizeHandleBackground}
                alpha={true}
            />
        </div>
    );
}
