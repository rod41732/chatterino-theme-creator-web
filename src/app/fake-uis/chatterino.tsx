import styles from "./chatlist.module.css";
import { FakeChatMessage } from "@/app/data";
import { ChatterinoSplit } from "@/app/fake-uis/chatterinoSplit.component";
import { ChatterinoFakeTab } from "@/app/fake-uis/chatterinoFakeTab";
import clsx from "clsx";

/** normal chat list */
export function ChatterinoSingle({
    chatMessages,
    extraClasses = "",
}: {
    chatMessages: FakeChatMessage[];
    extraClasses?: string;
}) {
    return (
        <div
            className={`flex flex-col h-full overflow-hidden ${extraClasses} ${styles.window}`}
        >
            {/*tab TODO: unknown background */}
            <div className="flex-shrink-0">
                <ChatterinoFakeTab />
            </div>
            <div className={styles.splitContainerCol}>
                {/*<div className={styles.splitContainerRow}>*/}
                {/*    <ChatterinoSplit*/}
                {/*        name="pajlada"*/}
                {/*        chatMessages={chatMessages}*/}
                {/*    />*/}
                {/*    <ChatterinoSplit*/}
                {/*        name="pajlada"*/}
                {/*        chatMessages={chatMessages}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<ChatterinoSplit name="pajlada" chatMessages={chatMessages} />*/}
                <ChatterinoSplit name="pajlada" chatMessages={chatMessages} />
            </div>
        </div>
    );
}

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
            className={`flex flex-col ${extraClasses} overflow-auto ${styles.split}`}
        >
            {/*tab TODO: unknown background */}

            <ChatterinoFakeTab />
            <ChatterinoSplit
                name="active tab"
                chatMessages={chatMessages}
                showReply={true}
                showCompletion={true}
            />
            <ChatterinoSplit
                name="inactive tab"
                chatMessages={chatMessages}
                active={false}
            />
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
            className={`flex flex-col ${extraClasses} overflow-auto ${styles.split}`}
        >
            {/*tab TODO: unknown background */}

            <ChatterinoFakeTab />
            <ChatterinoSplit
                name="active tab"
                chatMessages={chatMessages}
                previewSplit={true}
            />
            <ChatterinoSplit
                name="inactive tab"
                chatMessages={chatMessages}
                active={false}
            />
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
            className={`flex flex-col ${extraClasses} overflow-auto ${styles.split}`}
        >
            {/*tab TODO: unknown background */}

            <ChatterinoFakeTab />
            {/*TODO: there some backgroudn I don't knwo yet, using grey for now*/}
            <div className={styles.splitContainerRow}>
                <div
                    className={clsx(
                        styles.dropTargetRectVertical,
                        styles.droppable
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
                            styles.droppable
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
                        />
                    </div>
                    <div
                        className={clsx(
                            styles.dropTargetRectHorizontal,
                            styles.droppable
                        )}
                    >
                        {" "}
                        +{" "}
                    </div>
                    <ChatterinoSplit
                        name="inactive tab"
                        chatMessages={chatMessages}
                        active={false}
                    />
                </div>
                <div
                    className={clsx(
                        styles.dropTargetRectVertical,
                        styles.droppable
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
            className={`flex flex-col ${extraClasses} overflow-auto ${styles.split}`}
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
