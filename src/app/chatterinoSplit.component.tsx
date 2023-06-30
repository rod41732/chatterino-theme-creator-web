import { FakeChatMessage } from "@/app/data";
import { useEffect, useState } from "react";
import styles from "@/app/chatlist.module.css";
import clsx from "clsx";
import { Message } from "@/app/message.component";
import { useConfigContext } from "@/app/color-context-provider";

export function ChatterinoSplit({
    name,
    chatMessages,
    active = true,
    previewSplit = false,
}: {
    name: string;
    active?: boolean;
    chatMessages: FakeChatMessage[];
    previewSplit?: boolean;
}) {
    const [animationState, setAnimationState] = useState(0);
    const [input, setInput] = useState("");
    const {
        data: {
            metadata: { iconTheme },
        },
    } = useConfigContext();

    useEffect(() => {
        let interval = setInterval(() => {
            setAnimationState((a) => a + 1);
        }, 500);
        return () => clearInterval(interval);
    });

    return (
        // make it so that split take space evenly
        <div className={`${styles.split} h-full flex-1 flex flex-col relative`}>
            <div
                className={clsx(
                    active ? styles.splitHeaderFocused : styles.splitHeader,
                    styles.splitHeaderBase
                )}
            >
                <div className="flex-grow text-center py-1">{name}</div>
                <button className="self-stretch flex items-center -m-px mx-2 opacity-50">
                    <img
                        src={
                            iconTheme == "dark"
                                ? "/chatterino-icons/viewersDark.png"
                                : "/chatterino-icons/viewersLight.png"
                        }
                        className="h-5 w-5 object-contain"
                    />
                </button>
                <button className="self-stretch flex items-center -m-px mx-2 opacity-50">
                    <img
                        src={
                            iconTheme == "dark"
                                ? "/chatterino-icons/menuDark.png"
                                : "/chatterino-icons/menuLight.png"
                        }
                        className="h-5 w-5 object-contain"
                    />
                </button>
                <button className="self-stretch flex items-center -m-px opacity-50">
                    <img
                        src={
                            iconTheme == "dark"
                                ? "/chatterino-icons/addSplitDark.png"
                                : "/chatterino-icons/addSplit.png"
                        }
                        className="h-8 w-auto"
                    />
                </button>
            </div>
            <div
                className={`overflow-y-auto flex-grow flex-shrink ${styles.list}`}
            >
                {chatMessages.map((it, idx) => (
                    <Message
                        key={it.id}
                        it={it}
                        idx={idx}
                        animationState={animationState}
                    />
                ))}
            </div>
            <div
                className="flex-shrink-0 relative"
                style={{
                    // TODO: idk border
                    border: "1px solid black",
                    // TODO: idk bg
                    background: "black",
                }}
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
                    {" "}
                    {input.length}
                </div>
            </div>
            {previewSplit && (
                <div
                    className={clsx(
                        styles.dropPreviewRect,
                        "absolute top-0 bottom-0 left-2/3 right-0"
                    )}
                ></div>
            )}
        </div>
    );
}
