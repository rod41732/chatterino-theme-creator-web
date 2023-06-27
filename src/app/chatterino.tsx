import { Color } from "@/app/model.types";
import { useEffect, useState } from "react";
import styles from "./chatlist.module.css";

interface ChatterinoChatListProps {
    color: Color;
}

interface FakeChatMessage {
    id: string;
    timestampText: string;
    username: string;
    chat: string;
    history?: boolean;
    timeout?: boolean;
    system?: boolean; // system e.g. timeout
    link?: boolean;
    highlight?: boolean;
}
const chatMessages: FakeChatMessage[] = [
    {
        id: "1",
        timestampText: "20:32",
        username: "doge",
        chat: "fforsen forsen forsen forsen forsen forsen forsen forsen orsen forsen ",
        history: true,
    },
    {
        id: "2",
        timestampText: "20:32",
        username: "doge",
        chat: "deleted deleteddeleted deleteddeleted deleted   deleted deleted ",
        timeout: true,
        history: true,
    },
    {
        id: "3",
        timestampText: "20:32",
        username: "doge",
        chat: "fforsen forsen forsen forsen forsen forsen forsen forsen orsen forsen ",
        history: true,
    },
    {
        id: "4",
        timestampText: "20:32",
        username: "doge",
        chat: "https://kappa.lol/1231231",
        history: true,
        link: true,
    },
    {
        id: "5",
        timestampText: "20:32",
        username: "doge",
        chat: "fforsen forsen forsen forsen forsen forsen forsen forsen orsen forsen ",
        history: true,
    },
    {
        id: "6",
        timestampText: "20:32",
        username: "doge",
        chat: "fforsen forsen forsen forsen forsen forsen forsen forsen orsen forsen ",
        history: true,
    },
    {
        id: "7",
        timestampText: "20:32",
        username: "doge",
        chat: "deleted deleteddeleted deleteddeleted deleted   deleted deleted ",
        timeout: true,
    },
    {
        id: "8",
        timestampText: "20:32",
        username: "doge",
        chat: "doge41732 has been timed out for 5s.",
        system: true,
    },
    {
        id: "8",
        timestampText: "20:32",
        username: "doge",
        chat: "https://kappa.lol/1231231",
        link: true,
    },
    {
        id: "9",
        timestampText: "20:32",
        username: "doge",
        chat: "deleted deleteddeleted deleteddeleted deleted   deleted deleted ",
        timeout: true,
    },
    {
        id: "10",
        timestampText: "20:32",
        username: "doge",
        chat: "fforsen forsen forsen forsen forsen forsen forsen forsen orsen forsen ",
    },
    {
        id: "11",
        timestampText: "20:32",
        username: "doge",
        chat: "fforsen forsen forsen forsen forsen forsen forsen forsen orsen forsen ",
    },
    {
        id: "12",
        timestampText: "20:32",
        username: "doge",
        chat: "Highlighed after goto message",
        highlight: true,
    },
];

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
                                it.system
                                    ? styles.normalText
                                    : styles.systemText
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
                    className={styles.input}
                    placeholder="Send message as doge41732..."
                />
            </div>
        </div>
    );
}
