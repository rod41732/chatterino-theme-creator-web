import { useConfigContext } from "@/app/create/color-context-provider";
import { fakeChatListSmall } from "@/app/create/data";
import { QtCheckbox, QtInput } from "@/app/fake-uis/FakeQt.component";
import { ChatterinoSplit } from "@/app/fake-uis/chatterinoSplit.component";
import clsx from "clsx";
import { useMemo, useState } from "react";
import styles from "./chatlist.module.css";

export function UserCard() {
    const { data } = useConfigContext();
    const iconTheme = useMemo(() => {
        return data!.metadata.iconTheme;
    }, [data]);
    const [isPin, setIsPin] = useState(false);

    return (
        <div
            className={clsx(
                styles.window,
                styles.chatterinoWindow,
                "max-h-[500px] text-sm p-4",
            )}
        >
            <div className="flex h-full overflow-hidden flex-col space-y-4">
                <div className="flex space-x-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt="pajlada' profile image"
                        src="/pajlada.png"
                        className="w-32 h-32"
                    />
                    <div className="flex-grow">
                        <div className="flex space-x-2 items-center">
                            <div> pajlada </div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt="copy name button"
                                src={
                                    iconTheme == "light"
                                        ? "/chatterino-icons/copyLight.png"
                                        : "/chatterino-icons/copyDark.png"
                                }
                                className="opacity-[0.15] p-1 hover:opacity-100 hover:bg-black/50 w-[26px] h-[26px]"
                            />
                            <div className="flex-grow"></div>
                            <div> ID: 123456 </div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt="ocpy ID button"
                                src={
                                    iconTheme == "light"
                                        ? "/chatterino-icons/copyLight.png"
                                        : "/chatterino-icons/copyDark.png"
                                }
                                className="opacity-[0.15] p-1 hover:opacity-100 hover:bg-black/50 w-[26px] h-[26px]"
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt="pin user card button"
                                src={
                                    isPin
                                        ? "/chatterino-icons/pinEnabled.png"
                                        : iconTheme == "light"
                                        ? "/chatterino-icons/pinDisabledLight.png"
                                        : "/chatterino-icons/pinDisabledDark.png"
                                }
                                className="w-[26px] h-[26px] p-1 cursor-pointer"
                                onClick={() => setIsPin((e) => !e)}
                            />
                        </div>
                        <div> Followers: 1337 </div>
                        <div> Created: 2013-01-01 </div>

                        <div> ★ Previously subscribed for 14 months</div>
                    </div>
                </div>
                <div className={clsx(styles.divider, "h-px")} />
                {/*action row*/}
                <div className="flex space-x-4 justify-center">
                    <div className="flex space-x-2">
                        <QtCheckbox selected={false} />
                        <div>Block</div>
                    </div>
                    <div className="flex space-x-2">
                        <QtCheckbox selected={true} />
                        <div>Ignore Highlights</div>
                    </div>
                    <div>Usercard</div>
                </div>
                <div className={clsx(styles.divider, "h-0.5")} />
                <ChatterinoSplit
                    name=""
                    chatMessages={fakeChatListSmall}
                    hideTab={true}
                    hideInput={true}
                />
            </div>
        </div>
    );
}

export function ThreadPopup() {
    return (
        <div
            className={clsx(
                styles.window,
                styles.chatterinoWindow,
                "max-h-[500px] text-sm",
            )}
        >
            <div className="flex h-full overflow-hidden flex-col">
                <div className={clsx(styles.window, "p-2 flex space-x-1")}>
                    <QtCheckbox selected={true} />
                    <p className="text-sm"> Subscribe to thread</p>
                </div>
                <ChatterinoSplit
                    name=""
                    chatMessages={fakeChatListSmall}
                    hideTab={true}
                />
            </div>
        </div>
    );
}

export function FindPopup() {
    return (
        <div
            className={clsx(
                styles.window,
                styles.chatterinoWindow,
                "max-h-[500px] text-sm",
            )}
        >
            <div className="flex h-full overflow-hidden flex-col">
                <div className={clsx(styles.window, "p-2 flex space-x-1")}>
                    <QtInput placeholder="Type to search" />
                </div>
                <ChatterinoSplit
                    name=""
                    chatMessages={fakeChatListSmall}
                    hideTab={true}
                />
            </div>
        </div>
    );
}
