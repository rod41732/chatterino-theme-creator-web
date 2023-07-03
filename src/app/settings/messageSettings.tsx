import { ThemeData, useConfigContext } from "@/app/color-context-provider";
import { produce } from "immer";
import { ColorPicker } from "antd";
import { WritableDraft } from "immer/src/types/types-external";

export function MessageSettings() {
    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="text-lg font-bold col-span-2">Backgrounds</div>
            <div> Regular </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.backgrounds.regular = newColor;
                }}
                getColor={(data) => data.colors.messages.backgrounds.regular}
            />

            <div> Alternate </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.backgrounds.alternate = newColor;
                }}
                getColor={(data) => data.colors.messages.backgrounds.alternate}
            />

            {/*sep */}
            <hr className="col-span-2 my-2" />

            <div> Disabled </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.disabled = newColor;
                }}
                getColor={(data) => data.colors.messages.disabled}
                alpha={true}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Overlay color over historical or timed out messages
            </p>

            <div> Highlight Animation Start </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.highlightAnimationStart = newColor;
                }}
                getColor={(data) =>
                    data.colors.messages.highlightAnimationStart
                }
                alpha={true}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Flashing color when [Go to message] is used
            </p>

            <div> Highlight Animation End </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.highlightAnimationEnd = newColor;
                }}
                getColor={(data) => data.colors.messages.highlightAnimationEnd}
                alpha={true}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Color when [Go to message] end (usually transparent)
            </p>

            <div> Selection </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.selection = newColor;
                }}
                getColor={(data) => data.colors.messages.selection}
                alpha={true}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Color when selecting text
            </p>

            <hr className="col-span-2 my-2" />

            <div className="text-lg font-bold col-span-2">Text Colors</div>
            <div> Regular message </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.textColors.regular = newColor;
                }}
                getColor={(data) => data.colors.messages.textColors.regular}
            />

            <div> Caret </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.textColors.caret = newColor;
                }}
                getColor={(data) => data.colors.messages.textColors.caret}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Caret (blinking cursor) color. might not work on some platform.
            </p>

            <div> Chat Placeholder </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.textColors.chatPlaceholder = newColor;
                }}
                getColor={(data) =>
                    data.colors.messages.textColors.chatPlaceholder
                }
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Placeholder in chat field
            </p>

            <div> Link </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.textColors.link = newColor;
                }}
                getColor={(data) => data.colors.messages.textColors.link}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Color when [Go to message] end (usually transparent)
            </p>

            <div> System </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.messages.textColors.system = newColor;
                }}
                getColor={(data) => data.colors.messages.textColors.system}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                System message, timestamp. etc.
            </p>
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
        <div className="flex items-center space-x-2">
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
            <p className="text-gray-700"> {getColor(data).toUpperCase()}</p>
        </div>
    );
}
