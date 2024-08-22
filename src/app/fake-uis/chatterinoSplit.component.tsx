import { useInspectorContextNullable } from "@/app/components/InsEdit";
import { useThemeContext } from "@/app/edit/ThemeContextProvider";
import styles from "@/app/fake-uis/chatlist.module.css";
import { ChatterinoSplitHeader } from "@/app/fake-uis/ChatterinoSplitHeader.component";
import { Message } from "@/app/fake-uis/message.component";
import { FakeChatMessage } from "@/data/fake-chat";
import { usePreviewOptionContext } from "@/lib/api/PreviewOptionContext";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";

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
    const { data } = useThemeContext();
    const iconTheme = useMemo(() => {
        return data!.metadata.iconTheme;
    }, [data]);
    const chatContainerRef = useRef<HTMLDivElement>();
    const { editable } = usePreviewOptionContext();
    const setState = useInspectorContextNullable()?.setState;

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
                chatContainerRef.current?.scrollHeight!,
            );
        }
    }, [chatMessages]);

    const splitDropPreviewProps = useMemo(() => {
        return {
            role: editable ? "button" : undefined,
            onClick: () => {
                if (!editable) return;
                if (!setState)
                    throw new Error("Missing InsEditContextProvider");
                setState({
                    widgets: [
                        {
                            type: "title",
                            title: "Split Drop Preview",
                            subtitle:
                                "Preview that shows when you are dragging split around. These are show as rectangular area over chat split.",
                        },
                        {
                            type: "colorPicker",
                            path: "splits.dropPreview",
                            name: "Background color",
                            alpha: true,
                            description: "",
                        },
                        {
                            type: "colorPicker",
                            path: "splits.dropPreviewBorder",
                            name: "Border color",
                            description:
                                "Draw as thin border in drop target area.",
                        },
                    ],
                });
            },
        };
    }, [setState, editable]);

    return (
        // make it so that split take space evenly
        <div
            className={`${
                hideTab ? styles.embeddedSplit : styles.split
            } flex-1 flex flex-col relative overflow-hidden`}
        >
            {/*header*/}
            {!hideTab && <ChatterinoSplitHeader active={active} name={name} />}

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
                        "font-bold text-base py-1 px-2 flex items-center select-none",
                    )}
                >
                    <p className="flex-grow"> Replying to @doge41732</p>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt="cancel reply button"
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
                        styles.inputBorder,
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
                            "absolute top-1 right-1 select-none",
                        )}
                    >
                        {input.length}
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt="emote menu button"
                        className={clsx("absolute bottom-1 right-1", "w-4 h-4")}
                        src={
                            iconTheme == "light"
                                ? "/chatterino-icons/emote.svg"
                                : "/chatterino-icons/emoteDark.svg"
                        }
                    />
                    {showCompletion && (
                        // TODO: scrollbar is using accent color
                        <div
                            className={`p-2 border-2 border-red-500 w-[300px] h-[200px] absolute top-0 left-1/2 -translate-y-full 
                            -translate-x-1/2 ${styles.window} ${styles.completionMenu}`}
                        >
                            <div
                                className={`text-base w-full h-full select-none overflow-auto ${styles.completionMenuInner}`}
                            >
                                {Array(10)
                                    .fill(0)
                                    .map((_, idx) => {
                                        return (
                                            <div key={idx} className="relative">
                                                <div
                                                    className={clsx(
                                                        idx == 0 &&
                                                            styles.emoteSelect,
                                                        "absolute inset-0",
                                                    )}
                                                ></div>
                                                <div className="flex items-center relative">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        alt="FeelsDankMan"
                                                        src="https://cdn.frankerfacez.com/emote/536927/4"
                                                        className="h-8 w-auto mx-2"
                                                    />
                                                    <p
                                                        className={clsx(
                                                            styles.windowText,
                                                            "text-xs",
                                                        )}
                                                    >
                                                        {" "}
                                                        FeelsDankMan - Global
                                                        FrankerFaceZ{" "}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {!previewSplit && persistentPreviewSplit && (
                <div
                    className={clsx(
                        styles.dropPreviewRect,
                        "absolute top-0 bottom-0 left-2/3 right-0",
                    )}
                    {...splitDropPreviewProps}
                ></div>
            )}
            {/*// split hover*/}
            {/*top*/}
            {previewSplit && (
                <div
                    className={clsx(
                        "absolute top-0 bottom-1/2 left-0 right-0 ",
                        styles.droppable,
                        // 'bg-red-500/10'
                    )}
                    {...splitDropPreviewProps}
                ></div>
            )}
            {/*bottom*/}
            {previewSplit && (
                <div
                    className={clsx(
                        "absolute top-1/2 bottom-0 left-0 right-0 ",
                        styles.droppable,
                        // 'bg-red-500/10'
                    )}
                    {...splitDropPreviewProps}
                ></div>
            )}
            {/*left */}
            {previewSplit && (
                <div
                    className={clsx(
                        "absolute top-0 bottom-0 left-0 right-2/3 ",
                        styles.droppable,
                        // 'bg-red-500/10'
                    )}
                    {...splitDropPreviewProps}
                ></div>
            )}
            {/*right */}
            {previewSplit && (
                <div
                    className={clsx(
                        "absolute top-0 bottom-0 left-2/3 right-0 ",
                        styles.droppable,
                        // 'bg-red-500/10'
                    )}
                    {...splitDropPreviewProps}
                ></div>
            )}
        </div>
    );
}
