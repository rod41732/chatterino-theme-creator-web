import { useTabContext } from "@/app/edit/TabContextProvider";
import { PreviewTab } from "@/app/edit/editor-tab.types";
import { ColorPickerWrapper } from "@/app/settings/ColorPickerWrapper.component";
import { JumpIcon } from "@/app/settings/JumpIcon.component";
import s from "./settings.module.css";
import { usePickerLogic } from "@/app/settings/picker.hook";

enum PickerName {
    bg = "bg",
    text = "text",
}

export function WindowSettings() {
    const { setPreviewTab } = useTabContext();
    const [register, contextHolder] = usePickerLogic();
    return (
        <div className={`grid grid-cols-2 gap-2 ${s.container}`}>
            {contextHolder}
            <div className="text-lg font-bold col-span-2">Window</div>
            <p className="text-gray-500 col-span-2">
                Window background/text are mostly used in &quot;Non-Chat&quot;
                part of UI. For example
                <ul className="ml-7 list-disc">
                    <li>
                        Header of chat
                        <JumpIcon
                            onClick={() => setPreviewTab(PreviewTab.CHAT)}
                        />
                        and other part of UI that have tabs: Emote Menu
                        <JumpIcon
                            onClick={() => setPreviewTab(PreviewTab.EMOTE_MENU)}
                        />
                    </li>
                    <li>
                        Completion Menu
                        <JumpIcon
                            onClick={() => setPreviewTab(PreviewTab.CHAT)}
                        />
                    </li>
                    <li>
                        New Split Menu
                        <JumpIcon
                            onClick={() =>
                                setPreviewTab(PreviewTab.NEW_SPLIT_MENU)
                            }
                        />
                    </li>
                    <li>
                        User Card
                        <JumpIcon
                            onClick={() => setPreviewTab(PreviewTab.USER_CARD)}
                        />
                    </li>
                    <li>
                        Top of Thread Popup
                        <JumpIcon
                            onClick={() =>
                                setPreviewTab(PreviewTab.THREAD_POPUP)
                            }
                        />
                        and Find popup
                        <JumpIcon
                            onClick={() => setPreviewTab(PreviewTab.FIND_POPUP)}
                        />
                    </li>
                </ul>
            </p>
            <div> Background </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.window.background = newColor;
                }}
                getColor={(data) => data.colors.window.background}
                alpha={true}
                {...register(PickerName.bg)}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                &quot;Track&quot; Color of scrollbar
            </p>

            <div> Text </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.window.text = newColor;
                }}
                getColor={(data) => data.colors.window.text}
                {...register(PickerName.text)}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Some part of UI
            </p>
        </div>
    );
}
