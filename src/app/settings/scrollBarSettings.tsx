import s from "./settings.module.css";
import { ColorPickerWrapper } from "@/app/settings/ColorPickerWrapper.component";
import { JumpIcon } from "@/app/settings/JumpIcon.component";
import { useTabContext } from "@/app/tab-context-provider";

import { PreviewTab } from "@/app/tab.types";

export function ScrollBarSettings() {
    const { setPreviewTab } = useTabContext();
    return (
        <div className={`grid grid-cols-2 gap-2 ${s.container}`}>
            <h1 className="text-xl col-span-2 font-bold">Scrollbar settings</h1>

            <ul className="col-span-2 list-disc ml-6 text-gray-500">
                <li>
                    Scrollbar are visible in chat with many messages.
                    <JumpIcon onClick={() => setPreviewTab(PreviewTab.CHAT)} />
                </li>
                <li>
                    They are also visible in emote menu
                    <JumpIcon
                        onClick={() => setPreviewTab(PreviewTab.EMOTE_MENU)}
                    />
                </li>
            </ul>

            <div className="text-lg font-bold col-span-2">Scrollbar</div>
            <div> Background </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.scrollbars.background = newColor;
                }}
                getColor={(data) => data.colors.scrollbars.background}
                alpha={true}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                &quot;Track&quot; Color of scrollbar
            </p>

            <div> Thumb </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.scrollbars.thumb = newColor;
                }}
                getColor={(data) => data.colors.scrollbars.thumb}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Thumb is the place where you drag the scrollbar
            </p>

            <div> Thumb Selected </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.scrollbars.thumbSelected = newColor;
                }}
                getColor={(data) => data.colors.scrollbars.thumbSelected}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Color of Thumb when you are dragging it
            </p>
        </div>
    );
}
