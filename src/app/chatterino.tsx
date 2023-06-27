import { useEffect, useState } from "react";
import styles from "./chatlist.module.css";
import { chatMessages, FakeChatMessage } from "@/app/data";

export function ChatterinoChatList({}) {
    const [animationState, setAnimationState] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            setAnimationState((a) => a + 1);
        }, 500);
        return () => clearInterval(interval);
    });

    return (
        <div className="flex flex-col max-h-full min-h-0 overflow-auto">
            <div>tab</div>
            {/*chat list*/}
            {/*TODO: some background IDK*/}
            <div className="overflow-y-auto flex-shrink">
                {chatMessages.map((it, idx) => (
                    <Messsage
                        key={it.id}
                        it={it}
                        idx={idx}
                        animationState={animationState}
                    />
                ))}
            </div>
            <div
                className="flex-shrink-0"
                style={{
                    // TODO: idk border
                    border: "1px solid #ff00ff",
                    // TODO: idk bg
                    background: "black",
                }}
            >
                <input
                    className={`${styles.input} w-full px-2 py-2`}
                    placeholder="Try typing message here..."
                />
            </div>
        </div>
    );
}
function Messsage({
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
            className={`px-2 py-1 relative ${
                idx % 2 == 0 ? styles.chatEven : styles.chatOdd
            }`}
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
                            ? `transition-colors duration-500 ${styles.highlightOverlayStart}`
                            : `${styles.highlightOverlayEnd}`
                    }`}
                ></div>
            )}
        </div>
    );
}
