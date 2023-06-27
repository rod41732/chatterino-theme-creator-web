"use client";
import { Tabs } from "antd";
import { useState } from "react";
import { ChatterinoChatList } from "@/app/chatterino";
import { ConfigContextProvider } from "@/app/color-context-provider";
import { MessageSettings } from "@/app/messageSettings";

export default function Home() {
    const [activeTab, setActiveTab] = useState("overview");
    return (
        <ConfigContextProvider>
            <div className="h-full flex flex-col">
                <div className="px-4 border-b border-b-gray-200 flex-shrink-0">
                    <div className="text-2xl font-bold py-2">
                        {" "}
                        Chatterino Theme Creator
                    </div>
                </div>
                <div className="flex flex-grow">
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
                                    children: <p> Scrollbars XD</p>,
                                },
                                {
                                    label: "Splits",
                                    key: "splits",
                                    children: <p> Splits XD</p>,
                                },
                                {
                                    label: "Tabs",
                                    key: "tabs",
                                    children: <p> Tabs XD</p>,
                                },
                                {
                                    label: "Window",
                                    key: "window",
                                    children: <p> Window XD</p>,
                                },
                            ]}
                        />
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <ChatterinoChatList />
                    </div>
                </div>
            </div>
        </ConfigContextProvider>
    );
}
