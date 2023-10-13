import { useTabContext } from "@/app/edit/TabContextProvider";
import { ColorPickerWrapper } from "@/app/settings/ColorPickerWrapper.component";
import { JumpIcon } from "@/app/settings/JumpIcon.component";
import s from "./settings.module.css";

import { PreviewTab } from "@/app/edit/editor-tab.types";
import { usePickerLogic } from "@/app/settings/picker.hook";

enum MessagePickerName {
    "bg_regular" = "bg_regular",
    "bg_alternate" = "bg_alternate",
    "bg_disabled" = "bg_disabled",
    "hl_start" = "hl_start",
    "hl_end" = "hl_end",
    "selection" = "selection",

    "text_regular" = "text_regular",
    "text_caret" = "text_caret",
    "text_chat_placeholder" = "text_chat_placeholder",
    "text_link" = "text_link",
    "text_system" = "text_system",
}

export function MessageSettings() {
    const { setPreviewTab } = useTabContext();
    const [register, contextHolder] = usePickerLogic();
    return (
        <div className={`grid grid-cols-2 gap-2 ${s.container} `}>
            {contextHolder}
            <div className="flex items-center col-span-2">
                <h1 className="text-xl  font-bold">
                    Settings Related to chat messages
                </h1>
                <JumpIcon onClick={() => setPreviewTab(PreviewTab.CHAT)} />
            </div>

            <div className="text-lg font-bold col-span-2">Backgrounds</div>
            <ul className="col-span-2 text-gray-500 list-disc ml-7">
                <li>
                    Message Background are visible in chat room.
                    <JumpIcon onClick={() => setPreviewTab(PreviewTab.CHAT)} />
                </li>
                <li>
                    Also thread popup{" "}
                    <JumpIcon
                        onClick={() => setPreviewTab(PreviewTab.THREAD_POPUP)}
                    />
                    and find popup{" "}
                    <JumpIcon
                        onClick={() => setPreviewTab(PreviewTab.FIND_POPUP)}
                    />
                </li>
                <li>
                    They are also used for each row in Emote Menu
                    <JumpIcon
                        onClick={() => setPreviewTab(PreviewTab.EMOTE_MENU)}
                    />
                </li>
            </ul>
            <div> Regular</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.backgrounds.regular = newColor;
                }}
                getColor={(data) => data.colors.messages.backgrounds.regular}
                {...register(MessagePickerName.bg_regular)}
            />

            <div> Alternate</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.backgrounds.alternate = newColor;
                }}
                getColor={(data) => data.colors.messages.backgrounds.alternate}
                {...register(MessagePickerName.bg_alternate)}
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
                {...register(MessagePickerName.bg_disabled)}
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
                {...register(MessagePickerName.hl_start)}
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
                {...register(MessagePickerName.hl_end)}
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
                {...register(MessagePickerName.selection)}
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
                {...register(MessagePickerName.text_regular)}
            />

            <div> Caret</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.textColors.caret = newColor;
                }}
                getColor={(data) => data.colors.messages.textColors.caret}
                {...register(MessagePickerName.text_caret)}
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
                {...register(MessagePickerName.text_chat_placeholder)}
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
                {...register(MessagePickerName.text_link)}
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
                {...register(MessagePickerName.text_system)}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                System message, timestamp. etc.
            </p>
        </div>
    );
}
