import { ColorPickerWrapper } from "@/app/messageSettings";

export function TabsSettings() {
    return (
        <div className="grid grid-cols-2 gap-2 ">
            <div> Divider Line</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.dividerLine = newColor;
                }}
                getColor={(data) => data.color.tabs.dividerLine}
            />
            <div className="text-gray-500">
                Divider between list of tab, and chat.
            </div>

            <h2 className="text-lg font-bold col-span-2">Regular Tabs</h2>
            <div className="text-gray-500">
                Unselected tab, without new messages.
            </div>

            <div>Text Color</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.regular.text = newColor;
                }}
                getColor={(data) => data.color.tabs.regular.text}
            />

            <h3 className="font-bold col-span-2"> Background </h3>
            <div>Regular</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.regular.backgrounds.regular = newColor;
                }}
                getColor={(data) => data.color.tabs.regular.backgrounds.regular}
            />
            <div>Hover</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.regular.backgrounds.hover = newColor;
                }}
                getColor={(data) => data.color.tabs.regular.backgrounds.hover}
            />
            <div>Unfocused</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.regular.backgrounds.unfocused = newColor;
                }}
                getColor={(data) =>
                    data.color.tabs.regular.backgrounds.unfocused
                }
            />

            <h3 className="font-bold col-span-2"> Line </h3>
            <div>Regular</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.regular.line.regular = newColor;
                }}
                getColor={(data) => data.color.tabs.regular.line.regular}
            />
            <div>Hover</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.regular.line.hover = newColor;
                }}
                getColor={(data) => data.color.tabs.regular.line.hover}
            />
            <div>Unfocused</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.regular.line.unfocused = newColor;
                }}
                getColor={(data) => data.color.tabs.regular.line.unfocused}
            />

            <h2 className="text-lg font-bold col-span-2">Selected Tab</h2>
            <div className="text-gray-500">Currently selected tab</div>

            <div>Text Color</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.selected.text = newColor;
                }}
                getColor={(data) => data.color.tabs.selected.text}
            />

            <h3 className="font-bold col-span-2"> Background </h3>
            <div>Regular</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.selected.backgrounds.regular = newColor;
                }}
                getColor={(data) =>
                    data.color.tabs.selected.backgrounds.regular
                }
            />
            <div>Hover</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.selected.backgrounds.hover = newColor;
                }}
                getColor={(data) => data.color.tabs.selected.backgrounds.hover}
            />
            <div>Unfocused</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.selected.backgrounds.unfocused = newColor;
                }}
                getColor={(data) =>
                    data.color.tabs.selected.backgrounds.unfocused
                }
            />

            <h3 className="font-bold col-span-2"> Line </h3>
            <div>Regular</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.selected.line.regular = newColor;
                }}
                getColor={(data) => data.color.tabs.selected.line.regular}
            />
            <div>Hover</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.selected.line.hover = newColor;
                }}
                getColor={(data) => data.color.tabs.selected.line.hover}
            />
            <div>Unfocused</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.selected.line.unfocused = newColor;
                }}
                getColor={(data) => data.color.tabs.selected.line.unfocused}
            />

            <h2 className="text-lg font-bold col-span-2">Highlighted Tab</h2>
            <div className="text-gray-500">
                Tab with highlight (e.g mention)
            </div>

            <div>Text Color</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.highlighted.text = newColor;
                }}
                getColor={(data) => data.color.tabs.highlighted.text}
            />

            <h3 className="font-bold col-span-2"> Background </h3>
            <div>Regular</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.highlighted.backgrounds.regular = newColor;
                }}
                getColor={(data) =>
                    data.color.tabs.highlighted.backgrounds.regular
                }
            />
            <div>Hover</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.highlighted.backgrounds.hover = newColor;
                }}
                getColor={(data) =>
                    data.color.tabs.highlighted.backgrounds.hover
                }
            />
            <div>Unfocused</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.highlighted.backgrounds.unfocused =
                        newColor;
                }}
                getColor={(data) =>
                    data.color.tabs.highlighted.backgrounds.unfocused
                }
            />

            <h3 className="font-bold col-span-2"> Line </h3>
            <div>Regular</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.highlighted.line.regular = newColor;
                }}
                getColor={(data) => data.color.tabs.highlighted.line.regular}
            />
            <div>Hover</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.highlighted.line.hover = newColor;
                }}
                getColor={(data) => data.color.tabs.highlighted.line.hover}
            />
            <div>Unfocused</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.highlighted.line.unfocused = newColor;
                }}
                getColor={(data) => data.color.tabs.highlighted.line.unfocused}
            />

            <h2 className="text-lg font-bold col-span-2">New Message Tab</h2>
            <div className="text-gray-500">
                Background tab with new messages.
            </div>

            <div>Text Color</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.newMessage.text = newColor;
                }}
                getColor={(data) => data.color.tabs.newMessage.text}
            />

            <h3 className="font-bold col-span-2"> Background </h3>
            <div>Regular</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.newMessage.backgrounds.regular = newColor;
                }}
                getColor={(data) =>
                    data.color.tabs.newMessage.backgrounds.regular
                }
            />
            <div>Hover</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.newMessage.backgrounds.hover = newColor;
                }}
                getColor={(data) =>
                    data.color.tabs.newMessage.backgrounds.hover
                }
            />
            <div>Unfocused</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.newMessage.backgrounds.unfocused = newColor;
                }}
                getColor={(data) =>
                    data.color.tabs.newMessage.backgrounds.unfocused
                }
            />

            <h3 className="font-bold col-span-2"> Line </h3>
            <div>Regular</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.newMessage.line.regular = newColor;
                }}
                getColor={(data) => data.color.tabs.newMessage.line.regular}
            />
            <div>Hover</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.newMessage.line.hover = newColor;
                }}
                getColor={(data) => data.color.tabs.newMessage.line.hover}
            />
            <div>Unfocused</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.tabs.newMessage.line.unfocused = newColor;
                }}
                getColor={(data) => data.color.tabs.newMessage.line.unfocused}
            />
        </div>
    );
}
