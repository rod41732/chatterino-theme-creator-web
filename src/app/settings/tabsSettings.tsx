import { useTabContext } from "@/app/edit/tab-context-provider";
import { PreviewTab } from "@/app/edit/tab.types";
import { ColorPickerWrapper } from "@/app/settings/ColorPickerWrapper.component";
import { JumpIcon } from "@/app/settings/JumpIcon.component";
import s from "./settings.module.css";

export function TabsSettings() {
    const { setPreviewTab } = useTabContext();
    return (
        <div
            className={`grid grid-cols-[300px,auto,auto,auto] gap-2 ${s.container}`}
        >
            <div className="col-span-4">
                <h1 className="text-xl font-bold">Tab Settings</h1>
                <p>
                    See all posseble states of tabs here
                    <JumpIcon
                        onClick={() => setPreviewTab(PreviewTab.TAB_STATES)}
                    />
                </p>
                <p>
                    Tab are also visible in Emote Menu
                    <JumpIcon
                        onClick={() => setPreviewTab(PreviewTab.TAB_STATES)}
                    />
                    and New Split Menu
                    <JumpIcon
                        onClick={() => setPreviewTab(PreviewTab.NEW_SPLIT_MENU)}
                    />
                </p>
            </div>
            <div>
                <p className={s.sectionTitle}> Divider Line</p>
                <div className="text-gray-500">
                    Divider between list of tab, and chat.
                </div>
            </div>
            <div className="col-span-3">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.tabs.dividerLine = newColor;
                    }}
                    getColor={(data) => data.colors.tabs.dividerLine}
                />
            </div>

            <hr className="col-span-4 my-2" />

            <h2>
                <p className={s.sectionTitle}>Regular Tabs</p>
                <div className="text-gray-500">
                    Unselected tab, without new messages.
                </div>
            </h2>
            <div className="self-end text-gray-500 text-center">Regular</div>
            <div className="self-end text-gray-500 text-center">Hover</div>
            <div className="self-end text-gray-500 text-center">Unfocused</div>

            <div> Background </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.regular.backgrounds.regular = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.regular.backgrounds.regular
                }
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.regular.backgrounds.hover = newColor;
                }}
                getColor={(data) => data.colors.tabs.regular.backgrounds.hover}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.regular.backgrounds.unfocused = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.regular.backgrounds.unfocused
                }
            />

            <div> Line </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.regular.line.regular = newColor;
                }}
                getColor={(data) => data.colors.tabs.regular.line.regular}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.regular.line.hover = newColor;
                }}
                getColor={(data) => data.colors.tabs.regular.line.hover}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.regular.line.unfocused = newColor;
                }}
                getColor={(data) => data.colors.tabs.regular.line.unfocused}
            />

            <div> Text </div>
            <div className="col-span-3">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.tabs.regular.text = newColor;
                    }}
                    getColor={(data) => data.colors.tabs.regular.text}
                />
            </div>

            <hr className="col-span-4 my-2" />

            <h2>
                <p className={s.sectionTitle}>Selected Tab</p>
                <div className="text-gray-500">Current tab</div>
            </h2>
            <div className="self-end text-gray-500 text-center">Regular</div>
            <div className="self-end text-gray-500 text-center">Hover</div>
            <div className="self-end text-gray-500 text-center">Unfocused</div>

            <div> Background </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.selected.backgrounds.regular = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.selected.backgrounds.regular
                }
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.selected.backgrounds.hover = newColor;
                }}
                getColor={(data) => data.colors.tabs.selected.backgrounds.hover}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.selected.backgrounds.unfocused = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.selected.backgrounds.unfocused
                }
            />

            <div> Line </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.selected.line.regular = newColor;
                }}
                getColor={(data) => data.colors.tabs.selected.line.regular}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.selected.line.hover = newColor;
                }}
                getColor={(data) => data.colors.tabs.selected.line.hover}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.selected.line.unfocused = newColor;
                }}
                getColor={(data) => data.colors.tabs.selected.line.unfocused}
            />

            <div> Text </div>
            <div className="col-span-3">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.tabs.selected.text = newColor;
                    }}
                    getColor={(data) => data.colors.tabs.selected.text}
                />
            </div>

            <hr className="col-span-4 my-2" />

            <h2>
                <p className={s.sectionTitle}>Highlight Tabs</p>
                <div className="text-gray-500">
                    Tab with mentioned messages.
                </div>
            </h2>
            <div className="self-end text-gray-500 text-center">Regular</div>
            <div className="self-end text-gray-500 text-center">Hover</div>
            <div className="self-end text-gray-500 text-center">Unfocused</div>

            <div> Background </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.highlighted.backgrounds.regular = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.highlighted.backgrounds.regular
                }
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.highlighted.backgrounds.hover = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.highlighted.backgrounds.hover
                }
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.highlighted.backgrounds.unfocused =
                        newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.highlighted.backgrounds.unfocused
                }
            />

            <div> Line </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.highlighted.line.regular = newColor;
                }}
                getColor={(data) => data.colors.tabs.highlighted.line.regular}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.highlighted.line.hover = newColor;
                }}
                getColor={(data) => data.colors.tabs.highlighted.line.hover}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.highlighted.line.unfocused = newColor;
                }}
                getColor={(data) => data.colors.tabs.highlighted.line.unfocused}
            />

            <div> Text </div>
            <div className="col-span-3">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.tabs.highlighted.text = newColor;
                    }}
                    getColor={(data) => data.colors.tabs.highlighted.text}
                />
            </div>

            <hr className="col-span-4 my-2" />

            <h2>
                <p className={s.sectionTitle}>New Message Tabs</p>
                <div className="text-gray-500">Tabs with new mesages</div>
            </h2>
            <div className="self-end text-gray-500 text-center">Regular</div>
            <div className="self-end text-gray-500 text-center">Hover</div>
            <div className="self-end text-gray-500 text-center">Unfocused</div>

            <div> Background </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.newMessage.backgrounds.regular = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.newMessage.backgrounds.regular
                }
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.newMessage.backgrounds.hover = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.newMessage.backgrounds.hover
                }
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.newMessage.backgrounds.unfocused =
                        newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.newMessage.backgrounds.unfocused
                }
            />

            <div> Line </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.newMessage.line.regular = newColor;
                }}
                getColor={(data) => data.colors.tabs.newMessage.line.regular}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.newMessage.line.hover = newColor;
                }}
                getColor={(data) => data.colors.tabs.newMessage.line.hover}
            />
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.tabs.newMessage.line.unfocused = newColor;
                }}
                getColor={(data) => data.colors.tabs.newMessage.line.unfocused}
            />

            <div> Text </div>
            <div className="col-span-3">
                <ColorPickerWrapper
                    mutateColor={(data, newColor) => {
                        data.colors.tabs.newMessage.text = newColor;
                    }}
                    getColor={(data) => data.colors.tabs.newMessage.text}
                />
            </div>
        </div>
    );
}
