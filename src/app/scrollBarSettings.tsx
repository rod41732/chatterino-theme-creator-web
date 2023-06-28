import { ColorPickerWrapper } from "@/app/messageSettings";

export function ScrollBarSettings() {
    return (
        <div className="grid grid-cols-2 gap-2 ">
            <div className="text-lg font-bold col-span-2">Scrollbar</div>
            <div> Background </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.scrollbars.background = newColor;
                }}
                getColor={(data) => data.color.scrollbars.background}
                alpha={true}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                &quot;Track&quot; Color of scrollbar
            </p>

            <div> Thumb </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.scrollbars.thumb = newColor;
                }}
                getColor={(data) => data.color.scrollbars.thumb}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Thumb is the place where you drag the scrollbar
            </p>

            <div> Thumb Selected </div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.color.scrollbars.thumbSelected = newColor;
                }}
                getColor={(data) => data.color.scrollbars.thumbSelected}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Color of Thumb when you are dragging it
            </p>
        </div>
    );
}
