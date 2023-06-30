import { ColorPickerWrapper } from "@/app/messageSettings";

export function WindowSettings() {
    return (
        <div className="grid grid-cols-2 gap-2 ">
            <div className="text-lg font-bold col-span-2">Window</div>
            <div> Background </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.window.background = newColor;
                }}
                getColor={(data) => data.color.window.background}
                alpha={true}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                &quot;Track&quot; Color of scrollbar
            </p>

            <div> Text </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.window.text = newColor;
                }}
                getColor={(data) => data.color.window.text}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Some part of UI
            </p>
        </div>
    );
}
