import { PropsWithChildren } from "react";
import { useConfigContext } from "@/app/edit/ThemeContextProvider";
import clsx from "clsx";

export function ThemeAwareBackground({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) {
    const { data } = useConfigContext();
    const isDarkTheme = data.metadata.iconTheme == "light";
    return (
        <div
            className={clsx(
                className,
                isDarkTheme
                    ? "bg-gray-50 text-gray-900" // show have white bg to contrast
                    : "bg-gray-900 text-gray-50",
            )}
        >
            {children}
        </div>
    );
}
