import { useEffect, useState } from "react";
import styles from "./chatlist.module.css";
import { chatMessages } from "@/app/data";

export function ChatterinoChatList({}) {
    const [animationState, setAnimationState] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            setAnimationState((a) => a + 1);
        }, 500);
        return () => clearInterval(interval);
    });

    return (
        <div>
            <style></style>
            {/*chat list*/}
            {/*TODO: some background IDK*/}
            <div>
                {chatMessages.map((it, idx) => (
                    <div
                        key={it.id}
                        className={`px-2 py-1 relative ${
                            idx % 2 == 0 ? styles.chatEven : styles.chatOdd
                        }`}
                    >
                        <span className={styles.systemText}>
                            {" "}
                            {it.timestampText}
                        </span>
                        {!it.system && (
                            <strong className="text-red-500">
                                {it.username}
                            </strong>
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
                            <div
                                className={`absolute inset-0 ${styles.fade}`}
                            ></div>
                        )}
                        {it.timeout && (
                            <div
                                className={`absolute inset-0 ${styles.fade}`}
                            ></div>
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
                ))}
            </div>
            <div
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
