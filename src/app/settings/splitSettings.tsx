import { useConfigContext } from "@/app/edit/ThemeContextProvider";
import { Checkbox } from "antd";
import { produce } from "immer";
import s from "./settings.module.css";

import { useTabContext } from "@/app/edit/TabContextProvider";
import { ColorPickerWrapper } from "@/app/settings/ColorPickerWrapper.component";
import { JumpIcon } from "@/app/settings/JumpIcon.component";

import { PreviewTab } from "@/app/edit/editor-tab.types";
import { usePickerLogic } from "@/app/settings/picker.hook";

enum SplitPickerName {
    split_bg = "split_bg",
    header_focused_bg = "header_focused_bg",
    header_bg = "header_bg",
    header_focused_text = "header_focused_text",
    header_text = "header_text",
    header_focused_border = "header_focused_border",
    header_border = "header_border",

    drop_preview_border = "drop_preview_border",
    drop_preview = "drop_preview",

    drop_target_rect_border = "drop_target_rect_border",
    drop_target_rect = "drop_target_rect",

    input_text = "input_text",
    input_bg = "input_bg",

    message_sep = "message_sep",

    resize_handle = "resize_handle",
    resize_handle_bg = "resize_handle_bg",
}

export function SplitSettings() {
    const { setPreviewTab } = useTabContext();
    const { data, setData } = useConfigContext();

    const [registerHandler, contextHolder] = usePickerLogic();

    return (
        <div
            className={`grid grid-cols-[1fr,auto,auto] gap-2 h-full overflow-auto ${s.container}`}
        >
            {contextHolder}
            <div> Background </div>
            <div className="col-span-2">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.splits.background = newColor;
                    }}
                    getColor={(data) => data.colors.splits.background}
                    {...registerHandler(SplitPickerName.split_bg)}
                />
            </div>
            <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                Empty area in split (e.g. when there are few messages in split),
                also seen as thin border between splits. Also very visible in
                empty split{" "}
            </p>
            <ul className="col-span-3 list-disc ml-6 text-gray-500">
                <li>
                    Noticeable in tab with empty space (few messages).
                    <JumpIcon
                        onClick={() =>
                            setPreviewTab(PreviewTab.SPILT_DROP_TARGET)
                        }
                    />
                </li>
                <li>
                    Noticeable in empty split (when you create new tab).
                    <JumpIcon
                        onClick={() => setPreviewTab(PreviewTab.EMPTY_SPLIT)}
                    />
                </li>
            </ul>
            <hr className="col-span-3 my-2" />
            <h2 className="text-lg font-bold">
                Header{" "}
                <JumpIcon
                    onClick={() => setPreviewTab(PreviewTab.SPILT_DROP_PREVIEW)}
                />
            </h2>
            <div className="self-end text-gray-500 text-center">
                {" "}
                Focused (Selected){" "}
            </div>
            <div className="self-end text-gray-500 text-center">
                {" "}
                Unfocused{" "}
            </div>
            <div> Background </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.header.focusedBackground = newColor;
                }}
                getColor={(data) => data.colors.splits.header.focusedBackground}
                {...registerHandler(SplitPickerName.header_focused_bg)}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.header.background = newColor;
                }}
                getColor={(data) => data.colors.splits.header.background}
                {...registerHandler(SplitPickerName.header_bg)}
            />
            <div> Text </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.header.focusedText = newColor;
                }}
                getColor={(data) => data.colors.splits.header.focusedText}
                {...registerHandler(SplitPickerName.header_focused_text)}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.header.text = newColor;
                }}
                getColor={(data) => data.colors.splits.header.text}
                {...registerHandler(SplitPickerName.header_text)}
            />
            <p className="col-span-3">
                Unfocused text color is also used for empty split text
            </p>
            <div> Border </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.header.focusedBorder = newColor;
                }}
                getColor={(data) => data.colors.splits.header.focusedBorder}
                {...registerHandler(SplitPickerName.header_focused_border)}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.header.border = newColor;
                }}
                getColor={(data) => data.colors.splits.header.border}
                {...registerHandler(SplitPickerName.header_border)}
            />
            <hr className="col-span-3 my-2" />
            <div>
                <h2 className={s.sectionTitle}>
                    Split Drop Preview{" "}
                    <JumpIcon
                        onClick={() =>
                            setPreviewTab(PreviewTab.SPILT_DROP_PREVIEW)
                        }
                    />
                </h2>
                <p className="text-gray-500 -mt-3 mb-1">
                    Hint rectangle when you drag and drop split
                </p>
            </div>
            <div className="self-end text-gray-500 text-center"> Border </div>
            <div className="self-end text-gray-500 text-center"> Area </div>
            <div> Color </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.dropPreviewBorder = newColor;
                }}
                getColor={(data) => data.colors.splits.dropPreviewBorder}
                {...registerHandler(SplitPickerName.drop_preview_border)}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.dropPreview = newColor;
                }}
                getColor={(data) => data.colors.splits.dropPreview}
                alpha={true}
                {...registerHandler(SplitPickerName.drop_preview)}
            />
            <div>
                <h2 className={s.sectionTitle}>
                    Split Drop Target
                    <JumpIcon
                        onClick={() =>
                            setPreviewTab(PreviewTab.SPILT_DROP_TARGET)
                        }
                    />
                </h2>
                <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                    Target that is used for adding split in certain situations
                </p>
            </div>
            <div className="self-end text-gray-500 text-center"> Border </div>
            <div className="self-end text-gray-500 text-center"> Area </div>
            <div> Color </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.dropTargetRectBorder = newColor;
                }}
                getColor={(data) => data.colors.splits.dropTargetRectBorder}
                alpha={true}
                {...registerHandler(SplitPickerName.drop_target_rect_border)}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.dropTargetRect = newColor;
                }}
                getColor={(data) => data.colors.splits.dropTargetRect}
                alpha={true}
                {...registerHandler(SplitPickerName.drop_target_rect)}
            />
            <hr className="col-span-3 my-2" />
            <h2 className="text-lg font-bold col-span-3">
                Input
                <JumpIcon onClick={() => setPreviewTab(PreviewTab.CHAT)} />
            </h2>
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
                    {...registerHandler(SplitPickerName.input_text)}
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
                    {...registerHandler(SplitPickerName.input_bg)}
                />
            </div>
            <hr className="col-span-3 my-2" />
            <div className="flex space-x-2 items-center col-span-3">
                <Checkbox
                    checked={data.ctcMeta.messageSeparator}
                    onChange={(c) => {
                        setData((cur) =>
                            produce(cur, (draft) => {
                                draft.ctcMeta.messageSeparator =
                                    c.target.checked;
                            }),
                        );
                    }}
                >
                    <div>Customize message separator line</div>
                </Checkbox>
            </div>
            {data.ctcMeta.messageSeparator && (
                <>
                    <div> Message separator </div>
                    <div className="col-span-2">
                        <ColorPickerWrapper
                            mutateColor={(data, newColor) => {
                                data.colors.splits.messageSeperator = newColor;
                            }}
                            getColor={(data) =>
                                data.colors.splits.messageSeperator
                            }
                            {...registerHandler(SplitPickerName.message_sep)}
                        />
                    </div>
                    <p className="text-gray-500 col-span-3 -mt-3 mb-1">
                        NOTE: you will need to enable message separator in
                        chatterino settings to see separator
                    </p>
                </>
            )}
            <hr className="col-span-3 my-2" />
            <div>
                <h2 className={s.sectionTitle}>
                    Resize
                    <JumpIcon
                        onClick={() => setPreviewTab(PreviewTab.SPILT_RESIZE)}
                    />
                </h2>

                <p className="text-gray-500  -mt-3 mb-1">
                    Resize handles shows when you hold Ctrl to resize split in
                    chatterino.
                </p>
            </div>
            <div className="self-end text-gray-500 text-center"> Handle </div>
            <div className="self-end text-gray-500 text-center"> Glow </div>
            <div> Color </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.resizeHandle = newColor;
                }}
                getColor={(data) => data.colors.splits.resizeHandle}
                {...registerHandler(SplitPickerName.resize_handle)}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.splits.resizeHandleBackground = newColor;
                }}
                getColor={(data) => data.colors.splits.resizeHandleBackground}
                alpha={true}
                {...registerHandler(SplitPickerName.resize_handle_bg)}
            />
        </div>
    );
}
