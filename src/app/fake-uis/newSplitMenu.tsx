import styles from "./chatlist.module.css";
import clsx from "clsx";
import { QtButton, QtInput, QtRadio } from "@/app/fake-uis/FakeQt.component";
import { useState } from "react";
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
