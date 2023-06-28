import { FakeChatMessage } from "@/app/data";
import styles from "@/app/chatlist.module.css";
import clsx from "clsx";

export function Message({
    it,
    idx,
    animationState,
}: {
    it: FakeChatMessage;
    idx: number;
    animationState: number;
}) {
    return (
        <div
            className={clsx(
                "px-2 py-1 relative",
                idx % 2 == 0 ? styles.chatEven : styles.chatOdd,
                styles.chatMessage
            )}
        >
            <span className={styles.systemText}> {it.timestampText}</span>
            {!it.system && (
                <strong className="text-red-500">{it.username}</strong>
            )}
            <span
                className={
                    it.link
                        ? styles.linkText
                        : it.system
                        ? styles.systemText
                        : styles.normalText
                }
            >
                {" "}
                {it.chat}
            </span>
            {it.history && (
                <div className={`absolute inset-0 ${styles.fade}`}></div>
            )}
            {it.timeout && (
                <div className={`absolute inset-0 ${styles.fade}`}></div>
            )}
            {it.highlight && (
                <div
                    className={`absolute inset-0 ${
                        animationState % 3 != 0
                            ? `transition-colors duration-500 ${styles.highlightOverlayEnd}`
                            : `${styles.highlightOverlayStart}`
                    }`}
                ></div>
            )}
        </div>
    );
}
