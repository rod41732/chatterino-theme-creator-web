/** attempts to recreate stock Qt UI */

import clsx from "clsx";
import { PropsWithChildren } from "react";

/**
 *
 * @constructor
 */
export function QtRadio({
    selected,
    onClick,
}: {
    selected: boolean;
    onClick?: () => void;
}) {
    return (
        <div
            role="button"
            onClick={onClick}
            className="p-[3px] rounded-full  border-black border bg-[#333333] flex items-center justify-center"
        >
            <div
                className={clsx(
                    "border rounded-full w-[7px] h-[7px] cursor-pointer",
                    selected
                        ? "border-[#B1B1B1] bg-[#A5A5A5]"
                        : "border-transparent bg-transparent"
                )}
            ></div>
        </div>
    );
}

export function QtInput() {
    return (
        <input className="w-full border-black focus:outline-[#53A0ED] outline-none bg-[#333333] text-white caret-white rounded-sm" />
    );
}

export function QtButton({ children }: PropsWithChildren<{}>) {
    return (
        <button className="bg-[#595959] w-[100px] rounded-sm shadow-[inset_0px_0px_2px_#999999]">
            OK
        </button>
    );
}
