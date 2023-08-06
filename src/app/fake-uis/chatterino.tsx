import { FakeChatMessage } from "@/app/create/data";
import { ChatterinoFakeTab } from "@/app/fake-uis/chatterinoFakeTab";
import { ChatterinoSplit } from "@/app/fake-uis/chatterinoSplit.component";
import clsx from "clsx";
import styles from "./chatlist.module.css";

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
            {/*TODO: there some backgroudn I don't knwo yet, using grey for now*/}
            <div className={styles.splitContainerRow}>
                <div
                    className={clsx(
                        styles.dropTargetRectVertical,
                        styles.droppable,
                    )}
                >
                    {" "}
                    +{" "}
                </div>
                {/*chat inner*/}
                <div className={styles.splitContainerCol}>
                    <div
                        className={clsx(
                            styles.dropTargetRectHorizontal,
                            styles.droppable,
                        )}
                    >
                        +
                    </div>
                    <div className={styles.splitContainerRow}>
                        <ChatterinoSplit
                            name="active tab"
                            chatMessages={chatMessages}
                            previewSplit={true}
                        />
                        <ChatterinoSplit
                            name="inactive"
                            chatMessages={chatMessages}
                            active={false}
                            previewSplit={true}
                        />
                    </div>
                    <div
                        className={clsx(
                            styles.dropTargetRectHorizontal,
                            styles.droppable,
                        )}
                    >
                        {" "}
                        +{" "}
                    </div>
                    <ChatterinoSplit
                        name="inactive tab"
                        chatMessages={chatMessages}
                        previewSplit={true}
                        active={false}
                    />
                </div>
                <div
                    className={clsx(
                        styles.dropTargetRectVertical,
                        styles.droppable,
                    )}
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
