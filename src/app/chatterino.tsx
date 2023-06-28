import styles from "./chatlist.module.css";
import { FakeChatMessage } from "@/app/data";
import { ChatterinoSplit } from "@/app/chatterinoSplit.component";
import { ChatterinoFakeTab } from "@/app/chatterinoFakeTab";
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
            className={`flex flex-col ${extraClasses} overflow-auto ${styles.split}`}
        >
            {/*tab TODO: unknown background */}

            <ChatterinoFakeTab />
            <ChatterinoSplit name="pajlada" chatMessages={chatMessages} />
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
            <ChatterinoSplit name="active tab" chatMessages={chatMessages} />
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
