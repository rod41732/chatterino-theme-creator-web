import {
    InsEditWidgetDef,
    useInsEditContextNullable,
} from "@/app/components/InsEdit";
import { useConfigContext } from "@/app/edit/ThemeContextProvider";
import { useEffect, useRef, useState } from "react";
import { usePreviewOptionContext } from "@/lib/api/PreviewOptionContext";
import {
    fakeChatListVerySmall,
    fakeChatListVerySmallNoDistract,
} from "@/data/fake-chat";
import styles from "@/app/fake-uis/chatlist.module.css";
import {
    HoverHoverStateTab,
    HoverUnfoucsedStateTab,
    NormalTab,
} from "@/app/fake-uis/EditableTabPreview.component";
import { ChatterinoSplitHeader } from "@/app/fake-uis/ChatterinoSplitHeader.component";
import clsx from "clsx";
import { Message } from "@/app/fake-uis/message.component";
import { IconThemeSwitcher } from "@/app/edit/IconThemeColorSwitcher";
import { makeWidgets } from "@/app/fake-uis/tab-preview-widgets";
import {
    QtButton,
    QtCheckbox,
    QtInput,
    QtRadio,
} from "@/app/fake-uis/FakeQt.component";
import { ChatterinoSplitAdvanced } from "@/app/fake-uis/chatterino";
import { ChatterinoSplit } from "@/app/fake-uis/chatterinoSplit.component";

const USERCARD_WIDGETS: InsEditWidgetDef[] = [
    { type: "title", title: "User card" },
    {
        type: "colorPicker",
        path: "window.background",
        name: "Background",
        description: "",
    },
    {
        type: "colorPicker",
        path: "window.text",
        name: "Text",
        description: "",
    },
    {
        type: "custom",
        children: (
            <div>
                <p className="font-bold"> Icon theme </p>
                <IconThemeSwitcher />
            </div>
        ),
    },
];
const COMPLETION_MENU_WIDGETS: InsEditWidgetDef[] = [
    {
        type: "title",
        title: "Completion menu",
    },
    {
        type: "colorPicker",
        path: "window.background",
        name: "Background color",
        description: "",
    },
    {
        type: "colorPicker",
        path: "window.text",
        name: "Text color",
        description: "",
    },
    {
        type: "colorPicker",
        path: "accent",
        name: "Accent color",
        description: "Affect selection and scroll bar color",
    },
];

export function ComponentsOverview() {
    const { data } = useConfigContext();
    const [animationState, setAnimationState] = useState(0);
    useEffect(() => {
        let interval = setInterval(() => {
            setAnimationState((a) => a + 1);
        }, 500);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        let interval = setInterval(() => {
            setAnimationState((a) => a + 1);
        }, 500);
        return () => clearInterval(interval);
    });

    const { editable } = usePreviewOptionContext();
    const setState = useInsEditContextNullable()?.setState;
    const chatContainerRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo(
                0,
                chatContainerRef.current?.scrollHeight!,
            );
        }
    }, [fakeChatListVerySmall]);

    const showScrollToBottom = true;
    const iconTheme = data.metadata.iconTheme;

    // alias for tab components
    const tb = styles.tabBase;
    const s = styles;
    // user card
    const [isPin, setIsPin] = useState(false);

    return (
        <div
            className="flex-1 h-full flex-shrink overflow-hidden grid gap-2 p-2"
            style={{
                gridTemplateAreas: `
                 "lft pop new" 
                 "lft spl spl"
            `,
                gridTemplateRows: "auto 1fr",
                gridTemplateColumns: "1fr 1fr 1fr",
            }}
        >
            <div style={{ gridArea: "lft" }}>
                <p className="font-bold"> Chat </p>
                <NormalTab />
                <ChatterinoSplitHeader active={true} name="active_channel" />
                <div
                    className={clsx(
                        "relative flex-grow flex-shrink overflow-hidden",
                        styles.split,
                    )}
                >
                    <div
                        className={`relative ${styles.list}`}
                        ref={(it) => (chatContainerRef.current = it!)}
                    >
                        {fakeChatListVerySmall.map((it, idx) => (
                            <Message
                                key={it.id}
                                it={it}
                                idx={idx}
                                animationState={animationState}
                            />
                        ))}
                        <div
                            className={clsx("h-24")}
                            role={editable ? "button" : undefined}
                            onClick={() => {
                                if (!editable) return;
                                if (!setState)
                                    throw new Error(
                                        "Missing InsEditContextProvider",
                                    );
                                setState({
                                    widgets: [
                                        {
                                            type: "title",
                                            title: "Split",
                                        },
                                        {
                                            type: "colorPicker",
                                            path: "splits.background",
                                            name: "Split background",
                                            description:
                                                "Background in empty area of split. This is mostly visible in chat room with few messages.",
                                        },
                                    ],
                                });
                            }}
                        ></div>
                        <div
                            className={`absolute top-0 right-0 bottom-0 w-[20px] ${styles.fakeScrollbar}`}
                            role={editable ? "button" : undefined}
                            onClick={() => {
                                if (!editable) return;
                                if (!setState)
                                    throw new Error(
                                        "Missing InsEditContextProvider",
                                    );
                                setState({
                                    widgets: [
                                        {
                                            type: "title",
                                            title: "Scrollbars",
                                        },
                                        {
                                            type: "colorPicker",
                                            path: "scrollbars.background",
                                            name: "Background color",
                                            alpha: true,
                                            description: "",
                                        },
                                        {
                                            type: "colorPicker",
                                            path: "scrollbars.thumbSelected",
                                            name: "Thumb color (selected)",
                                            description: "",
                                        },
                                        {
                                            type: "colorPicker",
                                            path: "scrollbars.thumb",
                                            name: "Thumb color",
                                            description: "",
                                        },
                                    ],
                                });
                            }}
                        >
                            <div
                                className={`absolute top-0 right-0 w-1/2 hover:w-full h-24 ${styles.fakeScrollbarThumb}`}
                            >
                                {" "}
                            </div>
                        </div>
                    </div>
                    {showScrollToBottom && (
                        <div
                            className={clsx(
                                `absolute z-10 bottom-0 left-0 right-0 py-1 ${styles.scrollToBottom}`,
                                editable && "cursor-not-allowed",
                            )}
                            title={
                                editable
                                    ? "This cannot be customized"
                                    : undefined
                            }
                        >
                            More messages below.
                        </div>
                    )}
                </div>

                <div
                    className={clsx(
                        styles.replyIndicator,
                        "font-bold text-base py-1 px-2 flex items-center select-none",
                        editable && "hover:outline hover:outline-red-500",
                    )}
                    role={editable ? "button" : undefined}
                    onClick={() => {
                        if (!editable) return;
                        if (!setState)
                            throw new Error("Missing InsEditContextProvider");
                        setState({
                            widgets: [
                                {
                                    type: "title",
                                    title: "Reply indicator",
                                },
                                {
                                    type: "colorPicker",
                                    path: "splits.input.background",
                                    name: "Background color",
                                    description:
                                        "Background of reply indicator",
                                },
                                {
                                    type: "custom",
                                    children: (
                                        <div className="space-y-2">
                                            <p className="font-bold">
                                                Text and Icon color
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {" "}
                                                Text color cannot be directly
                                                set, but it&#39;s based on Icon
                                                Theme settings.{" "}
                                            </p>
                                            <IconThemeSwitcher />
                                        </div>
                                    ),
                                },
                            ],
                        });
                    }}
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

                {/*input */}
                <EditableInput />

                <p className="font-bold mt-2">Split header states</p>
                <ChatterinoSplitHeader active={true} name="active_channel" />

                <ChatterinoSplitHeader active={false} name="inactive_channel" />

                <p className="font-bold mt-2"> Tab bar states </p>

                <div className="text-sm">
                    {data.ctcMeta.simpleTabSettings ? "All states" : "Normal"}
                </div>
                <NormalTab />

                {data.ctcMeta.simpleTabSettings ? (
                    <div className="text-gray-500">
                        Disable Simple Tab Color Settings to customize color for
                        individual states
                    </div>
                ) : (
                    <div>
                        {/*<HoverBuggedTab />*/}
                        <div className="text-sm"> Hover</div>
                        <HoverHoverStateTab />
                        <div className="text-sm"> Unfocused</div>
                        <HoverUnfoucsedStateTab />
                    </div>
                )}
            </div>

            <div style={{ gridArea: "new" }}>
                <div className="">
                    <div className="font-bold"> New split</div>
                    <div className={clsx(styles.window, "flex flex-col ")}>
                        <div
                            className={`flex flex-wrap ${styles.tabContainer} w-full ${styles.window}`}
                        >
                            <div
                                className={clsx(
                                    styles.tabSelected,
                                    styles.tabBase,
                                    editable &&
                                        "hover:outline-red-500 hover:outline",
                                )}
                                role={editable ? "button" : undefined}
                                onClick={() => {
                                    if (!editable) return;
                                    if (!setState)
                                        throw new Error(
                                            "Missing InsEditContextProvider",
                                        );
                                    setState({
                                        widgets: makeWidgets(
                                            "selected",
                                            "regular",
                                        ),
                                    });
                                }}
                            >
                                Tab
                            </div>
                            <div
                                className={clsx(
                                    `${tb} ${s.tabRegular}`,
                                    editable &&
                                        "hover:outline-red-500 hover:outline",
                                )}
                                role={editable ? "button" : undefined}
                                onClick={() => {
                                    if (!editable) return;
                                    if (!setState)
                                        throw new Error(
                                            "Missing InsEditContextProvider",
                                        );
                                    setState({
                                        widgets: makeWidgets(
                                            "regular",
                                            "regular",
                                        ),
                                    });
                                }}
                            >
                                Tab2{" "}
                            </div>
                        </div>
                        <div
                            className={clsx(
                                "p-4 space-y-3 text-sm flex-grow",
                                editable &&
                                    "hover:outline-red-500 hover:outline",
                            )}
                            role={editable ? "button" : undefined}
                            onClick={() => {
                                if (!editable) return;
                                if (!setState)
                                    throw new Error(
                                        "Missing InsEditContextProvider",
                                    );
                                setState({
                                    widgets: [
                                        {
                                            type: "title",
                                            title: "New Split menu",
                                        },
                                        {
                                            type: "colorPicker",
                                            path: "window.background",
                                            description:
                                                "Background of various UI element",
                                            name: "Background",
                                        },
                                        {
                                            type: "colorPicker",
                                            path: "window.text",
                                            description:
                                                "Text of various UI element",
                                            name: "Text of various UI element",
                                        },
                                    ],
                                });
                            }}
                        >
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <QtRadio selected={true} />
                                    <div> Radio selected</div>
                                </div>
                                <p> Example input box </p>
                                <QtInput />
                            </div>

                            <div className="flex items-center space-x-2">
                                <QtRadio selected={false} />
                                <div> Radio unselected</div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <QtRadio selected={false} />
                                <div> Radio unselected</div>
                            </div>
                        </div>

                        <div className="p-4 space-x-2 flex justify-end">
                            <QtButton> OK </QtButton>
                            <QtButton> Cancel </QtButton>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ gridArea: "spl" }} className="flex flex-col gap-y-2">
                <div className="flex space-x-2">
                    <div className="flex-1">
                        <div className="font-bold"> User card</div>
                        <div
                            className={clsx(styles.window, "p-4")}
                            role={editable ? "button" : undefined}
                            onClick={() => {
                                if (!editable) return;
                                if (!setState)
                                    throw new Error(
                                        "Missing InsEditContextProvider",
                                    );
                                setState({ widgets: USERCARD_WIDGETS });
                            }}
                        >
                            <div className="flex overflow-hidden flex-col space-y-4">
                                <div className="flex space-x-4">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        alt="pajlada' profile image"
                                        src="/pajlada.png"
                                        className="w-32 h-32"
                                    />
                                    <div className="flex-grow">
                                        <div className="flex space-x-2 items-center">
                                            <div> pajlada</div>
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
                                            <div> ID: 123456</div>
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
                                                onClick={() =>
                                                    setIsPin((e) => !e)
                                                }
                                            />
                                        </div>
                                        <div> Followers: 1337</div>
                                        <div> Created: 2013-01-01</div>

                                        <div>
                                            {" "}
                                            ★ Previously subscribed for 14
                                            months
                                        </div>
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
                            </div>
                        </div>
                    </div>

                    <div className="w-[300px] flex-shrink-0">
                        <div className="font-bold">Completion Menu</div>
                        <div
                            className={clsx(
                                `p-2 h-[150px] ${styles.window} ${styles.completionMenu}`,
                                editable &&
                                    "hover:outline hover:outline-red-500",
                            )}
                            role={editable ? "button" : undefined}
                            onClick={() => {
                                if (!editable) return;
                                if (!setState)
                                    throw new Error(
                                        "Missing InsEditContextProvider",
                                    );
                                setState({
                                    widgets: COMPLETION_MENU_WIDGETS,
                                });
                            }}
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
                    </div>
                </div>

                <div className="flex-1 flex-shrink flex flex-col">
                    <div className="font-bold"> Split</div>
                    <ChatterinoSplitAdvanced
                        chatMessages={fakeChatListVerySmallNoDistract}
                        hideTab={true}
                        showResize={true}
                        persistentPreview={true}
                    />
                </div>
            </div>

            <div style={{ gridArea: "pop" }}>
                <div className="font-bold"> Thread and find</div>

                <div
                    className={clsx(
                        styles.window,
                        "flex flex-col",
                        editable && "hover:outline hover:outline-red-500",
                    )}
                    role={editable ? "button" : undefined}
                    onClick={() => {
                        if (!editable) return;
                        if (!setState)
                            throw new Error("Missing InsEditContextProvider");
                        setState({
                            widgets: [
                                {
                                    type: "title",
                                    title: "Other UI elements",
                                },
                                {
                                    type: "colorPicker",
                                    path: "window.background",
                                    description:
                                        "Background of various UI element",
                                    name: "Background",
                                },
                                {
                                    type: "colorPicker",
                                    path: "window.text",
                                    description: "Text of various UI element",
                                    name: "Text of various UI element",
                                },
                            ],
                        });
                    }}
                >
                    <div className={clsx(styles.window, "p-2 flex space-x-1")}>
                        <QtCheckbox selected={true} />
                        <p className="text-sm"> Subscribe to thread</p>
                    </div>
                    <div className={clsx(styles.window, "p-2 flex space-x-1")}>
                        <QtInput placeholder="Type to search" />
                    </div>
                </div>
                <ChatterinoSplit
                    hideTab
                    name="as"
                    hideInput={true}
                    chatMessages={fakeChatListVerySmallNoDistract}
                />
                <EditableInput />
            </div>
        </div>
    );
}

function EditableInput() {
    const { data } = useConfigContext();
    const iconTheme = data.metadata.iconTheme;
    const { editable } = usePreviewOptionContext();
    const setState = useInsEditContextNullable()?.setState;
    const [input, setInput] = useState("");

    return (
        <div
            className={clsx(
                "flex-shrink-0 relative",
                styles.inputBorder,
                editable && "hover:outline hover:outline-red-500",
            )}
            role={editable ? "button" : undefined}
            onClick={() => {
                if (!editable) return;
                if (!setState)
                    throw new Error("Missing InsEditContextProvider");
                setState({
                    widgets: [
                        { type: "title", title: "Input field" },
                        {
                            type: "colorPicker",
                            path: "splits.input.background",
                            name: "Background",
                            description: "Background of input",
                        },
                        {
                            type: "colorPicker",
                            path: "messages.textColors.regular",
                            name: "Text color",
                            description: "Text color",
                        },
                        {
                            type: "colorPicker",
                            path: "messages.textColors.caret",
                            name: "Caret color",
                            description:
                                "Color of cursor when typing in the field." +
                                "NOTE: due to a bug, it might not be actually applied.",
                        },
                        {
                            type: "colorPicker",
                            path: "messages.textColors.chatPlaceholder",
                            name: "Text placeholder color",
                            description:
                                "Color of placeholder text (i.e. Send a message...)",
                        },
                    ],
                });
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
                    "absolute top-1 right-1 select-none",
                    editable && "hover:outline hover:outline-red-500",
                )}
                role={editable ? "button" : undefined}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!editable) return;
                    if (!setState)
                        throw new Error("Missing InsEditContextProvider");
                    setState({
                        widgets: [
                            { type: "title", title: "Character count" },
                            {
                                type: "colorPicker",
                                path: "splits.input.text",
                                name: "Character counter",
                                description:
                                    "Color of character counter in chat field (if enabled)",
                            },
                        ],
                    });
                }}
            >
                {input.length}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                alt="emote menu button"
                className={clsx(
                    "absolute bottom-1 right-1",
                    "w-4 h-4",
                    editable && "hover:outline hover:outline-red-500",
                )}
                role={editable ? "button" : undefined}
                src={
                    iconTheme == "light"
                        ? "/chatterino-icons/emote.svg"
                        : "/chatterino-icons/emoteDark.svg"
                }
                onClick={(e) => {
                    e.stopPropagation();
                    if (!editable) return;
                    if (!setState)
                        throw new Error("Missing InsEditContextProvider");
                    setState({
                        widgets: [
                            { type: "title", title: "Emote button" },
                            {
                                type: "custom",
                                children: (
                                    <div>
                                        <p className="text-base font-bold">
                                            Icon color
                                        </p>
                                        <IconThemeSwitcher />
                                        <p className="text-sm text-gray-500">
                                            Used in icon such as emote menu
                                        </p>
                                    </div>
                                ),
                            },
                        ],
                    });
                }}
            />
        </div>
    );
}
