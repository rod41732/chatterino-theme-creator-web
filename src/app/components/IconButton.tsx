import { PropsWithChildren } from "react";
import { Tooltip } from "antd";
import clsx from "clsx";

/** preset style of button, suitable of putting react-icons as direct child */
export function IconButton({
    children,
    onClick,
    tooltip,
    disabled = false,
    className,
}: PropsWithChildren<{
    onClick?: () => void;
    tooltip?: string;
    disabled?: boolean;
    className?: string;
}>) {
    return tooltip ? (
        <Tooltip title={tooltip}>
            <div>
                <button
                    className={clsx(
                        "border-gray-200 text-gray-800 bg hover:bg-gray-500/20 transition-colors p-2 rounded-full text-xl",
                        disabled && "opacity-25 pointer-events-none",
                        className,
                    )}
                    onClick={onClick}
                    disabled={disabled}
                >
                    {children}
                </button>
            </div>
        </Tooltip>
    ) : (
        <div>
            <button
                className={clsx(
                    "border-gray-200 text-gray-800 bg hover:bg-gray-500/20 transition-colors p-2 rounded-full text-xl",
                    disabled && "opacity-25 pointer-events-none",
                    className,
                )}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </button>
        </div>
    );
}
