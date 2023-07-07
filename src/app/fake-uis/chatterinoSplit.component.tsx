import { FakeChatMessage } from "@/app/data";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/fake-uis/chatlist.module.css";
import clsx from "clsx";
import { Message } from "@/app/fake-uis/message.component";
import { useConfigContext } from "@/app/color-context-provider";

export function ChatterinoSplit({
    name,
    chatMessages,
    active = true,
    previewSplit = false,
    persistentPreviewSplit = false,
    showReply = false,
    showCompletion = false,
    showScrollToBottom = false,
    hideTab = false,
    hideInput = false,
}: {
    name: string;
    active?: boolean;
    chatMessages: FakeChatMessage[];
    previewSplit?: boolean;
    persistentPreviewSplit?: boolean;
    showReply?: boolean;
    showCompletion?: boolean;
    showScrollToBottom?: boolean;
    hideTab?: boolean;
    hideInput?: boolean;
}) {
    const [animationState, setAnimationState] = useState(0);
    const [input, setInput] = useState("");
    const {
        data: {
            metadata: { iconTheme },
        },
    } = useConfigContext();
    const chatContainerRef = useRef<HTMLDivElement>();

    useEffect(() => {
        let interval = setInterval(() => {
            setAnimationState((a) => a + 1);
        }, 500);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo(
                0,
                chatContainerRef.current?.scrollHeight!
            );
        }
    }, [chatMessages]);

    return (
        // make it so that split take space evenly
        <div
            className={`${
                hideTab ? styles.embeddedSplit : styles.split
            } flex-1 flex flex-col relative overflow-hidden`}
        >
            {/*header*/}
            {!hideTab && (
                <div
                    className={clsx(
                        active ? styles.splitHeaderFocused : styles.splitHeader,
                        styles.splitHeaderBase
                    )}
                >
                    <div className="flex-grow text-center py-1">{name}</div>
                    <div className={styles.splitHeaderChatRoomStatus}>
                        {" "}
                        follow (10,080m){" "}
                    </div>
                    <button className="self-stretch flex items-center -m-px mx-2 opacity-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            alt="viewers list"
                            src={
                                iconTheme == "dark"
                                    ? "/chatterino-icons/viewersDark.png"
                                    : "/chatterino-icons/viewersLight.png"
                            }
                            className="h-5 w-5 object-contain"
                        />
                    </button>
                    <button className="self-stretch flex items-center -m-px mx-2 opacity-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            alt="split menu"
                            src={
                                iconTheme == "dark"
                                    ? "/chatterino-icons/menuDark.png"
                                    : "/chatterino-icons/menuLight.png"
                            }
                            className="h-5 w-5 object-contain"
                        />
                    </button>
                    <button className="self-stretch flex items-center -m-px opacity-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            alt="add split"
                            src={
                                iconTheme == "dark"
                                    ? "/chatterino-icons/addSplitDark.png"
                                    : "/chatterino-icons/addSplit.png"
                            }
                            className="h-8 w-auto"
                        />
                    </button>
                </div>
            )}

            {/*list */}
            <div className="relative flex-grow flex-shrink overflow-hidden">
                <div
                    className={`overflow-y-auto overflow-x-hidden h-full ${styles.list}`}
                    ref={(it) => (chatContainerRef.current = it!)}
                >
                    {chatMessages.map((it, idx) => (
                        <Message
                            key={it.id}
                            it={it}
                            idx={idx}
                            animationState={animationState}
                        />
                    ))}
                    <div className={clsx("h-[8px]", styles.split)}></div>
                </div>
                {showScrollToBottom && (
                    <div
                        className={`absolute z-10 bottom-0 left-0 right-0 py-1 ${styles.scrollToBottom}`}
                    >
                        More messages below.
                    </div>
                )}
            </div>

            {/*reply, chat box, etc*/}
            {showReply && !hideInput && (
                <div
                    className={clsx(
                        styles.replyIndicator,
                        "font-bold text-base py-1 px-2 flex items-center"
                    )}
                >
                    <p className="flex-grow"> Replying to @doge41732</p>

                    <img
                        className="w-4 h-4"
                        src={
                            iconTheme == "light"
                                ? "/chatterino-icons/cancel.svg"
                                : "/chatterino-icons/cancelDark.svg"
                        }
                    />
                </div>
            )}
            {!hideInput && (
                <div
                    className={clsx(
                        "flex-shrink-0 relative",
                        styles.inputBorder
                    )}
                >
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className={`${styles.input} w-full px-2 py-2 outline-0`}
                        placeholder="Try typing message here..."
                    />
                    <div
                        className={clsx(
                            styles.characterCount,
                            "absolute top-1 right-1"
                        )}
                    >
                        {input.length}
                    </div>
                    <img
                        className={clsx("absolute bottom-1 right-1", "w-4 h-4")}
                        src={
                            iconTheme == "light"
                                ? "/chatterino-icons/emote.svg"
                                : "/chatterino-icons/emoteDark.svg"
                        }
                    />
                    {showCompletion && (
                        <div
                            className={`text-base w-[300px] h-[200px] absolute top-0 left-1/2 -translate-y-full -translate-x-1/2 p-2 ${styles.window}  ${styles.completionMenu}`}
                        >
                            <div className="relative">
                                <div
                                    className={clsx(
                                        styles.emoteSelect,
                                        "absolute inset-0"
                                    )}
                                ></div>
                                <div className="flex items-center relative">
                                    <img
                                        src="https://cdn.frankerfacez.com/emote/536927/4"
                                        className="h-8 w-auto mx-2"
                                    />
                                    <p
                                        className={clsx(
                                            styles.windowText,
                                            "text-xs"
                                        )}
                                    >
                                        {" "}
                                        FeelsDankMan - Global FrankerFaceZ{" "}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center relative">
                                <img
                                    src="https://cdn.frankerfacez.com/emote/536927/4"
                                    className="h-8 w-auto mx-2"
                                />
                                <p
                                    className={clsx(
                                        styles.windowText,
                                        "text-xs"
                                    )}
                                >
                                    {" "}
                                    FeelsDankMan - Global FrankerFaceZ{" "}
                                </p>
                            </div>
                            <div className="flex items-center relative">
                                <img
                                    src="https://cdn.frankerfacez.com/emote/536927/4"
                                    className="h-8 w-auto mx-2"
                                />
                                <p
                                    className={clsx(
                                        styles.windowText,
                                        "text-xs"
                                    )}
                                >
                                    {" "}
                                    FeelsDankMan - Global FrankerFaceZ{" "}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {!previewSplit && persistentPreviewSplit && (
                <div
                    className={clsx(
                        styles.dropPreviewRect,
                        "absolute top-0 bottom-0 left-2/3 right-0"
                    )}
                ></div>
            )}
            {/*// split hover*/}
            {/*top*/}
            {previewSplit && (
                <div
                    className={clsx(
                        "absolute top-0 bottom-1/2 left-0 right-0 ",
                        styles.droppable
                        // 'bg-red-500/10'
                    )}
                ></div>
            )}
            {/*bottom*/}
            {previewSplit && (
                <div
                    className={clsx(
                        "absolute top-1/2 bottom-0 left-0 right-0 ",
                        styles.droppable
                        // 'bg-red-500/10'
                    )}
                ></div>
            )}
            {/*left */}
            {previewSplit && (
                <div
                    className={clsx(
                        "absolute top-0 bottom-0 left-0 right-2/3 ",
                        styles.droppable
                        // 'bg-red-500/10'
                    )}
                ></div>
            )}
            {/*right */}
            {previewSplit && (
                <div
                    className={clsx(
                        "absolute top-0 bottom-0 left-2/3 right-0 ",
                        styles.droppable
                        // 'bg-red-500/10'
                    )}
                ></div>
            )}
        </div>
    );
}
