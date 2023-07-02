"use client";
import { Tabs } from "antd";
import { ReactNode, useMemo, useState } from "react";
import {
    ChatterinoDragSplitPreview,
    ChatterinoSingle,
    ChatterinoSplitAdvanced,
    ChatterinoSplitResize,
    ChatterinoSplitVertical,
} from "@/app/fake-uis/chatterino";
import { ConfigContextProvider } from "@/app/color-context-provider";
import { MessageSettings } from "@/app/settings/messageSettings";
import { ScrollBarSettings } from "@/app/settings/scrollBarSettings";
import { TabsSettings } from "@/app/settings/tabsSettings";
import {
    fakeChatListLarge,
    fakeChatListSmall,
    fakeChatListVerySmall,
} from "@/app/data";
import clsx from "clsx";
import { SplitSettings } from "@/app/settings/splitSettings";
import { ChatterinoTabPreview } from "@/app/fake-uis/chatterinoTabPreview.component";
import { WindowSettings } from "@/app/settings/windowSettings";
import { OverviewSettings } from "@/app/settings/overviewSettings";

interface Tab {
    label: string;
    key: string;
    children: ReactNode;
}

export default function Home() {
    const [activeTab, setActiveTab] = useState("overview");
    const [activePreviewTab, setActivePreviewTab] = useState("chat");
    const tabs = useMemo(
        () => [
            {
                label: "Overview",
                key: "overview",
                children: <OverviewSettings />,
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
                children: (
                    <div className="max-h-full overflow-y-scroll">
                        <SplitSettings />
                    </div>
                ),
            },
            {
                label: "Tabs",
                key: "tabs",
                children: <TabsSettings />,
            },
            {
                label: "Window",
                key: "window",
                children: <WindowSettings />,
            },
        ],
        []
    );
    const previewTabs: Tab[] = [
        {
            label: "Chat",
            key: "chat",
            children: <ChatterinoSingle chatMessages={fakeChatListLarge} />,
        },
        {
            label: "Split Basic",
            key: "spilt_basic",
            children: (
                <div className="p-4 bg-gray-800">
                    <ChatterinoSplitVertical
                        chatMessages={fakeChatListSmall}
                        extraClasses={clsx("h-[1000px]")}
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
                        extraClasses={clsx("h-[1000px]")}
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
                        chatMessages={fakeChatListVerySmall}
                        extraClasses={clsx("h-[1000px]")}
                    />
                </div>
            ),
        },
        {
            label: "Split Resize",
            key: "spilt_resize",
            children: (
                <div className="p-4 bg-gray-800 relative">
                    <ChatterinoSplitResize
                        chatMessages={fakeChatListVerySmall}
                        extraClasses={clsx("h-[1000px]")}
                    />
                </div>
            ),
        },
        {
            label: "Tab States",
            key: "tab_states",
            children: <ChatterinoTabPreview />,
        },
    ];
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
                    {/*left col*/}
                    <div className="flex-1 flex-shrink overflow-hidden">
                        {/*tab bar*/}
                        <div className="flex items-center overflow-x-auto">
                            {tabs.map((it) => (
                                <button
                                    className="mx-5 border"
                                    key={it.key}
                                    onClick={() => setActiveTab(it.key)}
                                >
                                    {it.label}
                                </button>
                            ))}
                        </div>
                        <div className="overflow-auto max-h-full">
                            {tabs.find((it) => it.key == activeTab)?.children}
                        </div>
                    </div>

                    {/*right col*/}
                    <div className="flex-1 flex-shrink overflow-hidden flex flex-col">
                        {/*tab bar*/}
                        <div className="flex items-center overflow-x-auto">
                            {previewTabs.map((it) => (
                                <button
                                    className="mx-5 border"
                                    key={it.key}
                                    onClick={() => setActivePreviewTab(it.key)}
                                >
                                    {it.label}
                                </button>
                            ))}
                        </div>
                        <div className="overflow-hidden relative flex-1">
                            {
                                previewTabs.find(
                                    (it) => it.key == activePreviewTab
                                )?.children
                            }
                        </div>
                    </div>
                </div>
            </div>
        </ConfigContextProvider>
    );
}
