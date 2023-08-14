import { useTabContext } from "@/app/edit/TabContextProvider";
import { PreviewTab } from "@/app/edit/editor-tab.types";
import { ColorPickerWrapper } from "@/app/settings/ColorPickerWrapper.component";
import { JumpIcon } from "@/app/settings/JumpIcon.component";
import s from "./settings.module.css";
import { usePickerLogic } from "@/app/settings/picker.hook";

enum PickerName {
    divider = "divider",
    // reg
    reg_bg_reg = "reg_bg_reg",
    reg_bg_hover = "reg_bg_hover",
    reg_bg_unfocus = "reg_bg_unfocus",
    reg_line_reg = "reg_line_reg",
    reg_line_hover = "reg_line_hover",
    reg_line_unfocus = "reg_line_unfocus",
    reg_text = "reg_text",
    // selected
    sel_bg_reg = "sel_bg_reg",
    sel_bg_hover = "sel_bg_hover",
    sel_bg_unfocus = "sel_bg_unfocus",
    sel_line_reg = "sel_line_reg",
    sel_line_hover = "sel_line_hover",
    sel_line_unfocus = "sel_line_unfocus",
    sel_text = "sel_text",
    // highlight
    hl_bg_reg = "hl_bg_reg",
    hl_bg_hover = "hl_bg_hover",
    hl_bg_unfocus = "hl_bg_unfocus",
    hl_line_reg = "hl_line_reg",
    hl_line_hover = "hl_line_hover",
    hl_line_unfocus = "hl_line_unfocus",
    hl_text = "hl_text",
    // new messag
    nm_bg_reg = "nm_bg_reg",
    nm_bg_hover = "nm_bg_hover",
    nm_bg_unfocus = "nm_bg_unfocus",
    nm_line_reg = "nm_line_reg",
    nm_line_hover = "nm_line_hover",
    nm_line_unfocus = "nm_line_unfocus",
    nm_text = "nm_text",
}

export function TabsSettings() {
    const { setPreviewTab } = useTabContext();
    const [register, contextHolder] = usePickerLogic();
    return (
        <div
            className={`grid grid-cols-[300px,auto,auto,auto] gap-2 ${s.container}`}
        >
            {contextHolder}
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
                    {...register(PickerName.divider)}
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
                {...register(PickerName.reg_bg_reg)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.regular.backgrounds.regular = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.regular.backgrounds.regular
                }
            />
            <ColorPickerWrapper
                {...register(PickerName.reg_bg_hover)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.regular.backgrounds.hover = newColor;
                }}
                getColor={(data) => data.colors.tabs.regular.backgrounds.hover}
            />
            <ColorPickerWrapper
                {...register(PickerName.reg_bg_unfocus)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.regular.backgrounds.unfocused = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.regular.backgrounds.unfocused
                }
            />

            <div> Line </div>
            <ColorPickerWrapper
                {...register(PickerName.reg_line_reg)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.regular.line.regular = newColor;
                }}
                getColor={(data) => data.colors.tabs.regular.line.regular}
            />
            <ColorPickerWrapper
                {...register(PickerName.reg_line_hover)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.regular.line.hover = newColor;
                }}
                getColor={(data) => data.colors.tabs.regular.line.hover}
            />
            <ColorPickerWrapper
                {...register(PickerName.reg_line_unfocus)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.regular.line.unfocused = newColor;
                }}
                getColor={(data) => data.colors.tabs.regular.line.unfocused}
            />

            <div> Text </div>
            <div className="col-span-3">
                <ColorPickerWrapper
                    {...register(PickerName.reg_text)}
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
                {...register(PickerName.sel_bg_reg)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.selected.backgrounds.regular = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.selected.backgrounds.regular
                }
            />
            <ColorPickerWrapper
                {...register(PickerName.sel_bg_hover)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.selected.backgrounds.hover = newColor;
                }}
                getColor={(data) => data.colors.tabs.selected.backgrounds.hover}
            />
            <ColorPickerWrapper
                {...register(PickerName.sel_bg_unfocus)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.selected.backgrounds.unfocused = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.selected.backgrounds.unfocused
                }
            />

            <div> Line </div>
            <ColorPickerWrapper
                {...register(PickerName.sel_line_reg)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.selected.line.regular = newColor;
                }}
                getColor={(data) => data.colors.tabs.selected.line.regular}
            />
            <ColorPickerWrapper
                {...register(PickerName.sel_line_hover)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.selected.line.hover = newColor;
                }}
                getColor={(data) => data.colors.tabs.selected.line.hover}
            />
            <ColorPickerWrapper
                {...register(PickerName.sel_line_unfocus)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.selected.line.unfocused = newColor;
                }}
                getColor={(data) => data.colors.tabs.selected.line.unfocused}
            />

            <div> Text </div>
            <div className="col-span-3">
                <ColorPickerWrapper
                    {...register(PickerName.sel_text)}
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
                {...register(PickerName.hl_bg_reg)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.highlighted.backgrounds.regular = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.highlighted.backgrounds.regular
                }
            />
            <ColorPickerWrapper
                {...register(PickerName.hl_bg_hover)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.highlighted.backgrounds.hover = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.highlighted.backgrounds.hover
                }
            />
            <ColorPickerWrapper
                {...register(PickerName.hl_bg_unfocus)}
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
                {...register(PickerName.hl_line_reg)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.highlighted.line.regular = newColor;
                }}
                getColor={(data) => data.colors.tabs.highlighted.line.regular}
            />
            <ColorPickerWrapper
                {...register(PickerName.hl_line_hover)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.highlighted.line.hover = newColor;
                }}
                getColor={(data) => data.colors.tabs.highlighted.line.hover}
            />
            <ColorPickerWrapper
                {...register(PickerName.hl_line_unfocus)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.highlighted.line.unfocused = newColor;
                }}
                getColor={(data) => data.colors.tabs.highlighted.line.unfocused}
            />

            <div> Text </div>
            <div className="col-span-3">
                <ColorPickerWrapper
                    {...register(PickerName.hl_text)}
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
                {...register(PickerName.nm_bg_reg)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.newMessage.backgrounds.regular = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.newMessage.backgrounds.regular
                }
            />
            <ColorPickerWrapper
                {...register(PickerName.nm_bg_hover)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.newMessage.backgrounds.hover = newColor;
                }}
                getColor={(data) =>
                    data.colors.tabs.newMessage.backgrounds.hover
                }
            />
            <ColorPickerWrapper
                {...register(PickerName.nm_bg_unfocus)}
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
                {...register(PickerName.nm_line_reg)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.newMessage.line.regular = newColor;
                }}
                getColor={(data) => data.colors.tabs.newMessage.line.regular}
            />
            <ColorPickerWrapper
                {...register(PickerName.nm_line_hover)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.newMessage.line.hover = newColor;
                }}
                getColor={(data) => data.colors.tabs.newMessage.line.hover}
            />
            <ColorPickerWrapper
                {...register(PickerName.nm_line_unfocus)}
                mutateColor={(data, newColor) => {
                    data.colors.tabs.newMessage.line.unfocused = newColor;
                }}
                getColor={(data) => data.colors.tabs.newMessage.line.unfocused}
            />

            <div> Text </div>
            <div className="col-span-3">
                <ColorPickerWrapper
                    {...register(PickerName.nm_text)}
                    mutateColor={(data, newColor) => {
                        data.colors.tabs.newMessage.text = newColor;
                    }}
                    getColor={(data) => data.colors.tabs.newMessage.text}
                />
            </div>
        </div>
    );
}
