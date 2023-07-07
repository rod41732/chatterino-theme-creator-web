import styles from "./chatlist.module.css";
import clsx from "clsx";
import { QtButton, QtInput, QtRadio } from "@/app/fake-uis/FakeQt.component";
import { useState } from "react";
import { ChatterinoSplit } from "@/app/fake-uis/chatterinoSplit.component";
import { fakeChatListVerySmall } from "@/app/data";
export function NewSplitMenu() {
    const [selectedMenu, setSelectedMenu] = useState("channel");
    return (
        <div
            className={clsx(
                styles.window,
                "h-full max-h-[300px] w-full max-h-[400px] flex flex-col overflow-hidden"
            )}
        >
            <div
                className={`flex flex-wrap ${styles.tabContainer} w-full ${styles.window}`}
            >
                <div className={clsx(styles.tabSelected, styles.tabBase)}>
                    Twitch
                </div>
            </div>
            <div className="p-4 space-y-3 text-sm flex-grow">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <QtRadio
                            selected={selectedMenu == "channel"}
                            onClick={() => setSelectedMenu("channel")}
                        />
                        <div> Channel </div>
                    </div>
                    <>
                        <p> Join a Twitch channel by its name.</p>
                        <QtInput />
                    </>
                </div>

                <div className="flex items-center space-x-2">
                    <QtRadio
                        selected={selectedMenu == "whispers"}
                        onClick={() => setSelectedMenu("whispers")}
                    />
                    <div> Whispers </div>
                </div>
                <div className="flex items-center space-x-2">
                    <QtRadio
                        selected={selectedMenu == "mentions"}
                        onClick={() => setSelectedMenu("mentions")}
                    />
                    <div> Mentions </div>
                </div>
                <div className="flex items-center space-x-2">
                    <QtRadio
                        selected={selectedMenu == "watching"}
                        onClick={() => setSelectedMenu("watching")}
                    />
                    <div> Watching </div>
                </div>
                <div className="flex items-center space-x-2">
                    <QtRadio
                        selected={selectedMenu == "live"}
                        onClick={() => setSelectedMenu("live")}
                    />
                    <div> Live </div>
                </div>
            </div>
            <div className="p-4 space-x-2 flex justify-end">
                <QtButton> OK </QtButton>
                <QtButton> Cancel </QtButton>
            </div>
        </div>
    );
}

export function EmoteMenu() {
    const [selectedMenu, setSelectedMenu] = useState("channel");
    return (
        <div
            className={clsx(
                styles.window,
                "h-full max-h-[300px] w-full flex flex-col overflow-hidden"
            )}
        >
            <div className="p-4">
                <QtInput placeholder={"Search all emotes..."} />
            </div>
            <div
                className={`flex flex-wrap ${styles.tabContainer} w-full ${styles.window}`}
            >
                <div className={clsx(styles.tabSelected, styles.tabBase)}>
                    Subs
                </div>
                <div className={clsx(styles.tabRegular, styles.tabBase)}>
                    Channel
                </div>
                <div className={clsx(styles.tabRegular, styles.tabBase)}>
                    Global
                </div>
                <div className={clsx(styles.tabRegular, styles.tabBase)}>
                    Emojis
                </div>
            </div>

            <div
                className={clsx(
                    styles.split,
                    "w-full h-full overflow-y-auto",
                    styles.list
                )}
            >
                <div
                    className={clsx(
                        styles.chatOdd,
                        styles.normalText,
                        "px-2 py-1 relative text-center"
                    )}
                >
                    pajlada
                </div>
                <div
                    className={clsx(
                        styles.chatEven,
                        styles.normalText,
                        "px-2 py-1 relative flex items-center flex-wrap justify-center"
                    )}
                >
                    {Array(30)
                        .fill(null)
                        .map((_, idx) => (
                            <img
                                key={idx}
                                src="https://cdn.frankerfacez.com/emote/536927/4"
                                className="h-8 w-auto mx-0.5"
                            />
                        ))}
                </div>
                <div
                    className={clsx(
                        styles.chatOdd,
                        styles.normalText,
                        "px-2 py-1 relative flex items-center flex-wrap justify-center"
                    )}
                >
                    {Array(12)
                        .fill(null)
                        .map((_, idx) => (
                            <img
                                key={idx}
                                src="https://cdn.frankerfacez.com/emote/536927/4"
                                className="h-8 w-auto mx-0.5"
                            />
                        ))}
                </div>
                <div
                    className={clsx(
                        styles.chatEven,
                        styles.normalText,
                        "px-2 py-1 relative text-center"
                    )}
                >
                    forsen
                </div>
                <div
                    className={clsx(
                        styles.chatOdd,
                        styles.normalText,
                        "px-2 py-1 relative flex items-center flex-wrap justify-center"
                    )}
                >
                    {Array(12)
                        .fill(null)
                        .map((_, idx) => (
                            <img
                                key={idx}
                                src="https://cdn.frankerfacez.com/emote/536927/4"
                                className="h-8 w-auto mx-0.5"
                            />
                        ))}
                </div>
                <div className="h-1"></div>
            </div>
        </div>
    );
}
