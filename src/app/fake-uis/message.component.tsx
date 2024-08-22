import {
    InspectorWidgetDef,
    useInspectorContextNullable,
} from "@/app/components/InsEdit";
import { useThemeContext } from "@/app/edit/ThemeContextProvider";
import styles from "@/app/fake-uis/chatlist.module.css";
import { ColorPickerWrapper } from "@/app/settings/ColorPickerWrapper.component";
import { FakeChatMessage } from "@/data/fake-chat";
import { usePreviewOptionContext } from "@/lib/api/PreviewOptionContext";
import { Checkbox } from "antd";
import clsx from "clsx";
import { produce } from "immer";

function makeWidgets(it: FakeChatMessage): InspectorWidgetDef[] {
    let title: InspectorWidgetDef = { type: "title", title: "", size: "large" };
    const widgets: InspectorWidgetDef[] = [title];
    widgets.push({
        type: "title",
        size: "small",
        title: "Text",
        subtitle: "Text color",
    });

    if (it.link) {
        title.title = "Link Message";
        title.subtitle = "Message with links";

        widgets.push({
            type: "colorPicker",
            path: "messages.textColors.link",
            name: "Link color",
            description: "Text color for link in chat",
        });

        widgets.push({
            type: "colorPicker",
            path: "messages.textColors.system",
            name: "Timestamp color",
            description:
                "Timestamp color, this is also color for system message.",
        });
    } else if (it.system) {
        title.title = "System Message";
        title.subtitle = "System message such as timeouts, bans, etc.";

        widgets.push({
            type: "colorPicker",
            path: "messages.textColors.system",
            name: "System message color",
            description: "System message color, also the color of timestamp",
        });
    } else {
        title.title = "Message";
        title.subtitle = "Regular message";

        widgets.push({
            type: "colorPicker",
            path: "messages.textColors.regular",
            name: "Text color",
            description: "Text color of regular message",
        });

        widgets.push({
            type: "colorPicker",
            path: "messages.textColors.system",
            name: "Timestamp color",
            description:
                "Timestamp color, this is also color for system message.",
        });
    }

    widgets.push({
        type: "title",
        title: "Background",
        subtitle: "Message background",
    });
    widgets.push({
        type: "colorPicker",
        path: "messages.backgrounds.regular",
        name: "Message Background",
        description: "",
    });
    widgets.push({
        type: "custom",
        children: <AlternateBackgroundSettings />,
    });

    if (it.history || it.timeout || it.highlight) {
        widgets.push({ type: "divider" });
        widgets.push({
            type: "title",
            size: "large",
            title: "Modifiers",
            subtitle: "Modifiers that are applied on top of message",
        });

        widgets.push({
            type: "colorPicker",
            path: "messages.disabled",
            name: "Overlay color",
            alpha: true,
            description:
                "Overlay color for history or deleted messages. The color is applied twice if the messsage" +
                "is both historical and deleted.",
        });

        if (it.highlight) {
            widgets.push({ type: "divider" });
            widgets.push({
                type: "title",
                size: "small",
                title: "Message Highlights",
            });
            widgets.push({
                type: "colorPicker",
                path: "messages.highlightAnimationStart",
                name: "Highlight animation start",
                alpha: true,
                description:
                    "Highlight color of message, this is triggered when 'Right click -> Go to message' is used",
            });
            widgets.push({
                type: "colorPicker",
                path: "messages.highlightAnimationEnd",
                name: "Highlight animation end",
                alpha: true,
                description:
                    "End color of highlight animation, this should be set to transparent color",
            });
        }
    }

    widgets.push({ type: "title", size: "small", title: "Miscellaneous" });
    widgets.push({
        type: "colorPicker",
        path: "messages.selection",
        name: "Selection color",
        alpha: true,
        description: "Color when you drag over text to select it.",
    });

    widgets.push({ type: "divider" });
    widgets.push({
        type: "custom",
        children: <MessageSeparatorSettings />,
    });

    return widgets;
}

function AlternateBackgroundSettings() {
    const { data, setData } = useThemeContext();

    return (
        <div>
            <div className="flex space-x-2 items-center col-span-3">
                <Checkbox
                    checked={data.ctcMeta.checkeredRow}
                    onChange={(c) => {
                        setData((cur) =>
                            produce(cur, (draft) => {
                                draft.ctcMeta.checkeredRow = c.target.checked;
                            }),
                        );
                    }}
                >
                    <div>Alternate background color (checkered rows)</div>
                </Checkbox>
            </div>
            {data.ctcMeta.checkeredRow && (
                <>
                    <div className="flex items-center mb-2">
                        <div>
                            <div>Message Alternate background</div>
                            <code className="text-gray-500 text-xs block">
                                messages.backgrounds.alternate
                            </code>
                        </div>
                        <div className="flex-1"> </div>
                        <ColorPickerWrapper
                            mutateColor={(data, newColor) => {
                                data.colors.messages.backgrounds.alternate =
                                    newColor;
                            }}
                            getColor={(data) =>
                                data.colors.messages.backgrounds.alternate
                            }
                        />
                    </div>
                </>
            )}
        </div>
    );
}
function MessageSeparatorSettings() {
    const { data, setData } = useThemeContext();

    return (
        <div>
            <div className="flex space-x-2 items-center col-span-3">
                <Checkbox
                    checked={data.ctcMeta.messageSeparator}
                    onChange={(c) => {
                        setData((cur) =>
                            produce(cur, (draft) => {
                                draft.ctcMeta.messageSeparator =
                                    c.target.checked;
                            }),
                        );
                    }}
                >
                    <div>Customize message separator line</div>
                </Checkbox>
            </div>
            {data.ctcMeta.messageSeparator && (
                <>
                    <div className="flex items-center mb-2">
                        <div>
                            <div>Message separator</div>
                            <code className="text-gray-500 text-xs block">
                                splits.messageSeperator
                            </code>
                        </div>
                        <div className="flex-1"> </div>
                        <ColorPickerWrapper
                            mutateColor={(data, newColor) => {
                                data.colors.splits.messageSeperator = newColor;
                            }}
                            getColor={(data) =>
                                data.colors.splits.messageSeperator
                            }
                        />
                    </div>
                    <p className="text-gray-500 col-span-3 -mt-3 mb-1 text-xs">
                        NOTE: you will need to enable message separator in
                        chatterino settings to see separator
                    </p>
                </>
            )}
        </div>
    );
}

export function Message({
    it,
    idx,
    animationState,
}: {
    it: FakeChatMessage;
    idx: number;
    animationState: number;
}) {
    const { editable } = usePreviewOptionContext();
    const setState = useInspectorContextNullable()?.setState;
    const {
        data: {
            ctcMeta: { checkeredRow },
        },
    } = useThemeContext();
    return (
        <div
            className={clsx(
                "px-2 py-1 relative",
                idx % 2 == 0 || !checkeredRow
                    ? styles.chatBackgroundRegular
                    : styles.chatBackgroundAlternate,
                styles.chatMessage,
                editable && "hover:outline hover:outline-red-500",
            )}
            role={editable ? "button" : undefined}
            onClick={() => {
                if (!editable) return;
                if (!setState)
                    throw new Error("Missing InsEditContextProvider");
                setState({ widgets: makeWidgets(it) });
            }}
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
                            ? `transition-colors duration-500 ${styles.highlightOverlayEnd}`
                            : `${styles.highlightOverlayStart}`
                    }`}
                ></div>
            )}
        </div>
    );
}
