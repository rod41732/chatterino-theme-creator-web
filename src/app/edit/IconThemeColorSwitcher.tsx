import { useThemeContext } from "@/app/edit/ThemeContextProvider";
import clsx from "clsx";
import { produce } from "immer";
import { useCallback, useMemo } from "react";

export function IconThemeSwitcher() {
    const { data, setData } = useThemeContext();
    const iconTheme = useMemo(() => {
        return data!.metadata.iconTheme;
    }, [data]);

    const setIconTheme = useCallback(
        (color: "light" | "dark") => {
            setData((cur) =>
                produce(cur!, (draft) => {
                    draft.metadata.iconTheme = color;
                }),
            );
        },
        [setData],
    );
    return (
        <div className="grid grid-cols-[auto,1fr] gap-y-2 gap-x-4 items-center">
            <button
                className={clsx(
                    "w-[80px] px-3 py-1 border rounded-md",
                    iconTheme == "light"
                        ? "border-gray-700 bg-gray-700 text-white"
                        : "border-gray-300 text-gray-700",
                )}
                onClick={() => {
                    setIconTheme("light");
                }}
            >
                Light
            </button>
            <div className="text-gray-500">
                Icons will be light, usually this is for{" "}
                <strong>Dark Themes</strong>
            </div>
            <button
                className={clsx(
                    "w-[80px] px-3 py-1 border rounded-md",
                    iconTheme == "dark"
                        ? "border-gray-700 bg-gray-700 text-white"
                        : "border-gray-300 text-gray-700",
                )}
                onClick={() => {
                    setIconTheme("dark");
                }}
            >
                Dark
            </button>
            <div className="text-gray-500">
                Icons will be dark, usually this is for{" "}
                <strong>Light Themes</strong>
            </div>
        </div>
    );
}
