/** attempts to recreate stock Qt UI */

import clsx from "clsx";
import { PropsWithChildren } from "react";
import { BsCheck } from "react-icons/bs";

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
            className="p-[3px] rounded-full  border-black border bg-[#333333] flex items-center justify-center self-center w-min"
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

export function QtInput({ placeholder }: { placeholder?: string }) {
    return (
        <input
            className="w-full border-black focus:border-[#53A0ED] border-2 outline-none bg-[#333333] text-white text-sm caret-white rounded-sm placeholder:text-[#7D7F7D] px-1"
            placeholder={placeholder}
        />
    );
}

export function QtButton({ children }: PropsWithChildren<{}>) {
    return (
        <button className="bg-[#595959] w-[100px] rounded-sm shadow-[inset_0px_0px_2px_#999999] text-white text-sm py-[3px]">
            {children}
        </button>
    );
}
export function QtCheckbox({
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
            className="border-black border bg-[#333333] flex items-center justify-center self-center w-min"
        >
            <BsCheck
                className={clsx(
                    selected ? "text-white" : "text-transparent",
                    "-m-0.5 text-lg"
                )}
            />
        </div>
    );
}
