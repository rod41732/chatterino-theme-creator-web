import { useConfigContext } from "@/app/edit/ThemeContextProvider";
import { useMemo } from "react";
import clsx from "clsx";
import styles from "@/app/fake-uis/chatlist.module.css";
import { usePreviewOptionContext } from "@/lib/api/PreviewOptionContext";
import { useInsEditContextNullable } from "@/app/components/InsEdit";
import { IconThemeSwitcher } from "@/app/edit/IconThemeColorSwitcher";

interface ChatterinoSplitHeaderProps {
    active: boolean;
    name: string;
}

export function ChatterinoSplitHeader({
    active,
    name,
}: ChatterinoSplitHeaderProps) {
    const { data } = useConfigContext();
    const iconTheme = useMemo(() => {
        return data!.metadata.iconTheme;
    }, [data]);
    const { editable } = usePreviewOptionContext();

    const setState = useInsEditContextNullable()?.setState;

    return (
        <div
            className={clsx(
                active ? styles.splitHeaderFocused : styles.splitHeader,
                styles.splitHeaderBase,
            )}
        >
            <div
                className={clsx(
                    "flex-grow text-center py-1",
                    editable && "hover:outline-red-500 hover:outline",
                )}
                role={editable ? "button" : undefined}
                onClick={() => {
                    if (!editable) return;
                    if (!setState)
                        throw new Error("Missing InsEditContextProvider");
                    const stateName = active ? "Active" : "Inactive";
                    setState({
                        widgets: [
                            {
                                type: "title",
                                title: `Split header (${stateName})`,
                            },
                            {
                                type: "colorPicker",
                                name: "Background",
                                path: active
                                    ? "splits.header.focusedBackground"
                                    : "splits.header.background",
                                description: `Background of the split header ${stateName}`,
                            },
                            {
                                type: "colorPicker",
                                name: "Border",
                                path: active
                                    ? "splits.header.focusedBorder"
                                    : "splits.header.border",
                                description: `Border of the split header ${stateName}`,
                            },
                            {
                                type: "colorPicker",
                                name: "Text",
                                path: active
                                    ? "splits.header.focusedText"
                                    : "splits.header.text",
                                description: `Text of the split header (${stateName})`,
                            },
                        ],
                    });
                }}
            >
                {name}
            </div>
            <div
                className={clsx(
                    styles.splitHeaderChatRoomStatus,
                    editable && "hover:outline-red-500 hover:outline",
                )}
                role={editable ? "button" : undefined}
                onClick={() => {
                    if (!editable) return;
                    if (!setState)
                        throw new Error("Missing InsEditContextProvider");
                    setState({
                        widgets: [
                            {
                                type: "title",
                                title: `Status text`,
                                subtitle:
                                    "This displays room status like slow mode, follower-mode etc.",
                            },
                            {
                                type: "colorPicker",
                                name: "Text color",
                                path: "window.text",
                                description: ``,
                            },
                        ],
                    });
                }}
            >
                {" "}
                follow (10,080m){" "}
            </div>
            <div
                className={clsx(
                    "flex items-center",
                    editable && "hover:outline hover:outline-red-500 ",
                )}
                role={editable ? "button" : undefined}
                onClick={() => {
                    if (!editable) return;
                    if (!setState)
                        throw new Error("Missing InsEditContextProvider");
                    setState({
                        widgets: [
                            {
                                type: "title",
                                title: "Header icons",
                                subtitle: "Action icons on header",
                            },
                            {
                                type: "custom",
                                children: (
                                    <div className="space-y-2">
                                        <IconThemeSwitcher />
                                        <p>
                                            The color of icon is derived from
                                            `Icon theme`
                                        </p>
                                    </div>
                                ),
                            },
                        ],
                    });
                }}
            >
                <button className="self-stretch flex items-center -m-px mx-2 opacity-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt="viewers list"
                        src={
                            iconTheme == "dark"
                                ? "/chatterino-icons/viewersDark.png"
                                : "/chatterino-icons/viewersLight.png"
                        }
                        className="h-5 w-5 object-contain"
                    />
                </button>
                <button className="self-stretch flex items-center -m-px mx-2 opacity-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt="split menu"
                        src={
                            iconTheme == "dark"
                                ? "/chatterino-icons/menuDark.png"
                                : "/chatterino-icons/menuLight.png"
                        }
                        className="h-5 w-5 object-contain"
                    />
                </button>
                <button className="self-stretch flex items-center -m-px opacity-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt="add split"
                        src={
                            iconTheme == "dark"
                                ? "/chatterino-icons/addSplitDark.png"
                                : "/chatterino-icons/addSplit.png"
                        }
                        className="h-8 w-auto"
                    />
                </button>
            </div>
        </div>
    );
}
