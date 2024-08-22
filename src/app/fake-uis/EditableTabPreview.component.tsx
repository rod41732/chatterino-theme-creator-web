import { useInspectorContextNullable } from "@/app/components/InsEdit";
import styles from "@/app/fake-uis/chatlist.module.css";
import { HoverOverlay } from "@/app/fake-uis/chatterinoTabPreview.component";
import {
    makeTabInspectorWidgets,
    TabState,
} from "@/app/fake-uis/tab-preview-widgets";
import { usePreviewOptionContext } from "@/lib/api/PreviewOptionContext";
import clsx from "clsx";
import { FaCog, FaUserAlt } from "react-icons/fa";
import { useThemeContext } from "../edit/ThemeContextProvider";

function LiveIndicator() {
    const theme = useThemeContext();
    return (
        <div
            className="w-1.5 h-1.5 rounded-full absolute top-1 right-1"
            style={{ backgroundColor: theme.data.colors.tabs.liveIndicator }}
        ></div>
    );
}

function ReturnIndicator() {
    const theme = useThemeContext();
    return (
        <div
            className="w-1.5 h-1.5 rounded-full absolute top-1 right-1"
            style={{ backgroundColor: theme.data.colors.tabs.rerunIndicator }}
        ></div>
    );
}

export function GenericTab({ state }: { state: TabState | "hoverBugged" }) {
    const tb = styles.tabBase;
    const s = styles;
    const { editable } = usePreviewOptionContext();
    const setState = useInspectorContextNullable()?.setState;
    return (
        <div>
            <div className={`flex flex-wrap ${s.tabContainer} w-full`}>
                <div
                    className={clsx(
                        styles.tabBase,
                        styles.tabButton,
                        "space-x-4",
                        editable && "hover:outline hover:outline-red-500",
                    )}
                    onClick={() => {
                        if (!editable) return;
                        if (!setState)
                            throw new Error("Missing InsEditContextProvider");
                        setState({
                            widgets: [
                                { type: "title", title: "Tab icons" },
                                {
                                    type: "colorPicker",
                                    path: "tabs.regular.text",
                                    name: "Button color",
                                    description: "",
                                },
                            ],
                        });
                    }}
                >
                    <FaCog />
                    <FaUserAlt />
                </div>
                <div
                    className={clsx(
                        `${tb} ${s.tabSelectedNoHover}`,
                        editable &&
                            "hover:outline hover:outline-red-500 relative",
                    )}
                    role={editable ? "button" : undefined}
                    onClick={() => {
                        if (!editable) return;
                        if (!setState)
                            throw new Error("Missing InsEditContextProvider");
                        setState({
                            widgets: makeTabInspectorWidgets(
                                "selected",
                                state,
                                { liveIndicator: true },
                            ),
                        });
                    }}
                >
                    Current
                    <LiveIndicator />
                    {state == "hoverBugged" && <HoverOverlay />}
                </div>
                <div
                    className={clsx(
                        `${tb} ${s.tabRegularNoHover}`,
                        editable && "hover:outline hover:outline-red-500",
                    )}
                    role={editable ? "button" : undefined}
                    onClick={() => {
                        if (!editable) return;
                        if (!setState)
                            throw new Error("Missing InsEditContextProvider");
                        setState({
                            widgets: makeTabInspectorWidgets("regular", state, {
                                rerunIndicator: true,
                            }),
                        });
                    }}
                >
                    Unselected
                    <ReturnIndicator />
                    {state == "hoverBugged" && <HoverOverlay />}
                </div>
                <div
                    className={clsx(
                        `${tb} ${s.tabNewMessageNoHover}`,
                        editable && "hover:outline hover:outline-red-500",
                    )}
                    role={editable ? "button" : undefined}
                    onClick={() => {
                        if (!editable) return;
                        if (!setState)
                            throw new Error("Missing InsEditContextProvider");
                        setState({
                            widgets: makeTabInspectorWidgets(
                                "newMessage",
                                state,
                            ),
                        });
                    }}
                >
                    New Message {state == "hoverBugged" && <HoverOverlay />}
                </div>
                <div
                    className={clsx(
                        `${tb} ${s.tabHighlightedNoHover}`,
                        editable && "hover:outline hover:outline-red-500",
                    )}
                    role={editable ? "button" : undefined}
                    onClick={() => {
                        if (!editable) return;
                        if (!setState)
                            throw new Error("Missing InsEditContextProvider");
                        setState({
                            widgets: makeTabInspectorWidgets(
                                "highlighted",
                                state,
                            ),
                        });
                    }}
                >
                    Mentioned {state == "hoverBugged" && <HoverOverlay />}
                </div>
            </div>
        </div>
    );
}

export function NormalTab() {
    return <GenericTab state="regular" />;
}

export function HoverBuggedTab() {
    return <GenericTab state="hoverBugged" />;
}

export function HoverHoverStateTab() {
    return <GenericTab state="hover" />;
}

export function HoverUnfoucsedStateTab() {
    return <GenericTab state="unfocused" />;
}
