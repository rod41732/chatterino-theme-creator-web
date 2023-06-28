"use client";
import { Tabs } from "antd";
import { useState } from "react";
import {
    ChatterinoDragSplitPreview,
    ChatterinoSingle,
    ChatterinoSplitAdvanced,
    ChatterinoSplitVertical,
} from "@/app/chatterino";
import { ConfigContextProvider } from "@/app/color-context-provider";
import { MessageSettings } from "@/app/messageSettings";
import { ScrollBarSettings } from "@/app/scrollBarSettings";
import { TabsSettings } from "@/app/tabsSettings";
import {
    fakeChatListLarge,
    fakeChatListSmall,
    fakeChatListVerySmall,
} from "@/app/data";
import clsx from "clsx";
import { SplitSettings } from "@/app/splitSettings";
import { ChatterinoTabPreview } from "@/app/chatterinoTabPreview.component";

export default function Home() {
    const [activeTab, setActiveTab] = useState("overview");
    const [activePreviewTab, setActivePreviewTab] = useState("chat");
    return (
        <ConfigContextProvider>
            <div className="h-full flex flex-col">
                <div className="px-4 border-b border-b-gray-200 flex-shrink-0">
                    <div className="text-2xl font-bold py-2">
                        {" "}
                        Chatterino Theme Creator
                    </div>
                </div>
                {/*<div className="h-full bg-emerald-300"></div>*/}
                {/*overflow-auto somehow force the height to be correct??*/}
                <div className="h-full overflow-auto flex">
                    <div className="flex-1">
                        <Tabs
                            // defaultActiveKey="overview"
                            activeKey={activeTab}
                            onTabClick={(key, _) => setActiveTab(key)}
                            items={[
                                {
                                    label: "Overview",
                                    key: "overview",
                                    children: <p> Overview XD</p>,
                                },
                                {
                                    label: "Messages",
                                    key: "messages",
                                    children: <MessageSettings />,
                                },
                                {
                                    label: "Scrollbars",
                                    key: "scrollbars",
                                    children: <ScrollBarSettings />,
                                },
                                {
                                    label: "Splits",
                                    key: "splits",
                                    children: <SplitSettings />,
                                },
                                {
                                    label: "Tabs",
                                    key: "tabs",
                                    children: <TabsSettings />,
                                },
                                {
                                    label: "Window",
                                    key: "window",
                                    children: <p> Window XD</p>,
                                },
                            ]}
                        />
                    </div>
                    <div className="p-6 max-h-full overflow-auto">
                        <Tabs
                            activeKey={activePreviewTab}
                            onTabClick={(key, _) => setActivePreviewTab(key)}
                            items={[
                                {
                                    label: "Chat",
                                    key: "chat",
                                    children: (
                                        // TODO!
                                        <div className="max-h-[80%] overflow-auto">
                                            <ChatterinoSingle
                                                chatMessages={fakeChatListLarge}
                                            />
                                        </div>
                                    ),
                                },
                                {
                                    label: "Split Basic",
                                    key: "spilt_basic",
                                    children: (
                                        <div className="p-4 bg-gray-800">
                                            <ChatterinoSplitVertical
                                                chatMessages={fakeChatListSmall}
                                                extraClasses={clsx(
                                                    "h-[1000px]"
                                                )}
                                            />
                                        </div>
                                    ),
                                },
                                {
                                    label: "Split Drop Preivew",
                                    key: "spilt_drop_preview",
                                    children: (
                                        <div className="p-4 bg-gray-800 relative">
                                            <ChatterinoDragSplitPreview
                                                chatMessages={fakeChatListSmall}
                                                extraClasses={clsx(
                                                    "h-[1000px]"
                                                )}
                                            />
                                        </div>
                                    ),
                                },
                                {
                                    label: "Split Drop Target",
                                    key: "spilt_drop_target",
                                    children: (
                                        <div className="p-4 bg-gray-800 relative">
                                            <ChatterinoSplitAdvanced
                                                chatMessages={
                                                    fakeChatListVerySmall
                                                }
                                                extraClasses={clsx(
                                                    "h-[1000px]"
                                                )}
                                            />
                                        </div>
                                    ),
                                },
                                {
                                    label: "Tab States",
                                    key: "tab_states",
                                    children: <ChatterinoTabPreview />,
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </ConfigContextProvider>
    );
}
