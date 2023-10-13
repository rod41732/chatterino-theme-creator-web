import { FakeChatMessage } from "@/data/fake-chat";
import { ChatterinoFakeTab } from "@/app/fake-uis/chatterinoFakeTab";
import { ChatterinoSplit } from "@/app/fake-uis/chatterinoSplit.component";
import clsx from "clsx";
import styles from "./chatlist.module.css";
import { usePreviewOptionContext } from "@/lib/api/PreviewOptionContext";
import { useInsEditContextNullable } from "@/app/components/InsEdit";
import { useMemo } from "react";

/** basic split */
export function ChatterinoSplitVertical({
    chatMessages,
    extraClasses = "",
}: {
    chatMessages: FakeChatMessage[];
    extraClasses?: string;
}) {
    return (
        <div
            className={`${extraClasses} ${styles.window} ${styles.chatterinoWindow}`}
        >
            <ChatterinoFakeTab />
            <div className={styles.splitContainerCol}>
                <ChatterinoSplit
                    name="active tab"
                    chatMessages={chatMessages}
                    showCompletion={true}
                />
                <ChatterinoSplit
                    name="inactive tab"
                    chatMessages={chatMessages}
                    active={false}
                    showReply={true}
                    showScrollToBottom={true}
                />
            </div>
        </div>
    );
}
export function ChatterinoDragSplitPreview({
    chatMessages,
    extraClasses = "",
}: {
    chatMessages: FakeChatMessage[];
    extraClasses?: string;
}) {
    return (
        <div
            className={`${extraClasses} ${styles.window} ${styles.chatterinoWindow}`}
        >
            {/*tab TODO: unknown background */}

            <ChatterinoFakeTab />
            <div className={styles.splitContainerCol}>
                <ChatterinoSplit
                    name="active tab"
                    chatMessages={chatMessages}
                    persistentPreviewSplit={true}
                />
                <ChatterinoSplit
                    name="inactive tab"
                    chatMessages={chatMessages}
                    active={false}
                    previewSplit={true}
                />
            </div>
        </div>
    );
}

export function ChatterinoSplitAdvanced({
    chatMessages,
    extraClasses = "",
    hideTab = false,
    showResize = false,
    persistentPreview = false,
}: {
    chatMessages: FakeChatMessage[];
    extraClasses?: string;
    showResize?: boolean;
    hideTab?: boolean;
    persistentPreview?: boolean;
}) {
    const { editable } = usePreviewOptionContext();
    const setState = useInsEditContextNullable()?.setState;
    const dropTargetProps = useMemo(() => {
        return {
            role: editable ? "button" : undefined,
            onClick: () => {
                if (!editable) return;
                if (!setState)
                    throw new Error("Missing InsEditContextProvider");
                setState({
                    widgets: [
                        {
                            type: "title",
                            title: "Drop target",
                            subtitle:
                                "Drop target are shown when you are adding split (holding Ctrl + Alt) in complex layout.",
                        },
                        {
                            type: "colorPicker",
                            path: "splits.dropTargetRect",
                            name: "Background color",
                            alpha: true,
                            description:
                                "The colors are rendered on top of a grey background (#555 for dark theme and #999 for light themes)",
                        },
                        {
                            type: "colorPicker",
                            path: "splits.dropTargetRectBorder",
                            name: "Border color",
                            description:
                                "Draw as thin border in drop target area.",
                        },
                    ],
                });
            },
        };
    }, [setState, editable]);
    return (
        <div
            className={`${extraClasses} ${styles.window} ${styles.chatterinoWindow}`}
        >
            {/*tab TODO: unknown background */}

            {!hideTab && <ChatterinoFakeTab />}
            {/*TODO: there some backgroudn I don't knwo yet, using grey for now*/}

            <div className={styles.splitContainerRow}>
                <div
                    className={clsx(
                        styles.dropTargetRectVertical,
                        styles.droppable,
                    )}
                    {...dropTargetProps}
                >
                    +
                </div>
                {/*chat inner*/}
                <div className={styles.splitContainerCol}>
                    <div
                        className={clsx(
                            styles.dropTargetRectHorizontal,
                            styles.droppable,
                        )}
                        {...dropTargetProps}
                    >
                        +
                    </div>
                    <div className={styles.splitContainerRow}>
                        <ChatterinoSplit
                            name="active tab"
                            chatMessages={chatMessages}
                            previewSplit={!persistentPreview}
                        />
                        {showResize && (
                            <div
                                className={clsx(
                                    styles.resizeHandleVertical,
                                    editable &&
                                        "hover:outline hover:outline-red-500",
                                )}
                                role={editable ? "button" : undefined}
                                onClick={() => {
                                    if (!editable) return;
                                    if (!setState)
                                        throw new Error(
                                            "Missing InsEditContextProvider",
                                        );
                                    setState({
                                        widgets: [
                                            {
                                                type: "title",
                                                title: "Resize handle",
                                            },
                                            {
                                                type: "colorPicker",
                                                alpha: true,
                                                path: "splits.resizeHandle",
                                                name: "Handle color",
                                                description:
                                                    "Color in the middle of handle",
                                            },
                                            {
                                                type: "colorPicker",
                                                alpha: true,
                                                path: "splits.resizeHandleBackground",
                                                name: "Handle background color",
                                                description:
                                                    '"Glow" color of handle',
                                            },
                                        ],
                                    });
                                }}
                            />
                        )}

                        <ChatterinoSplit
                            name="inactive"
                            chatMessages={chatMessages}
                            active={false}
                            previewSplit={!persistentPreview}
                            persistentPreviewSplit={persistentPreview}
                        />
                    </div>
                    <div
                        className={clsx(
                            styles.dropTargetRectHorizontal,
                            styles.droppable,
                        )}
                        {...dropTargetProps}
                    >
                        {" "}
                        +{" "}
                    </div>
                    <ChatterinoSplit
                        name="inactive tab"
                        chatMessages={chatMessages}
                        previewSplit={!persistentPreview}
                        active={false}
                    />
                </div>
                <div
                    className={clsx(
                        styles.dropTargetRectVertical,
                        styles.droppable,
                    )}
                    {...dropTargetProps}
                >
                    {" "}
                    +{" "}
                </div>
            </div>
        </div>
    );
}

export function ChatterinoSplitResize({
    chatMessages,
    extraClasses = "",
}: {
    chatMessages: FakeChatMessage[];
    extraClasses?: string;
}) {
    return (
        <div
            className={`${extraClasses} ${styles.window} ${styles.chatterinoWindow}`}
        >
            <ChatterinoFakeTab />
            <div className={styles.splitContainerCol}>
                <div className={styles.splitContainerRow}>
                    <ChatterinoSplit
                        name="active"
                        chatMessages={chatMessages}
                    />
                    <div className={styles.resizeHandleVertical} />
                    <ChatterinoSplit
                        name="active"
                        chatMessages={chatMessages}
                    />
                </div>
                <div className={styles.resizeHandleHorizontal} />
                <ChatterinoSplit
                    name="inactive"
                    chatMessages={chatMessages}
                    active={false}
                />
            </div>
        </div>
    );
}
