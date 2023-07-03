"use client";
import { Button, Modal } from "antd";
import { ReactNode, useRef, useState } from "react";
import {
    ChatterinoDragSplitPreview,
    ChatterinoSplitAdvanced,
    ChatterinoSplitResize,
    ChatterinoSplitVertical,
} from "@/app/fake-uis/chatterino";
import {
    ConfigContextProvider,
    ThemeData,
    useConfigContext,
} from "@/app/color-context-provider";
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
import {
    CHATTERINO_BLACK_THEME,
    CHATTERINO_DARK_THEME,
    CHATTERINO_LIGHT_THEME,
    CHATTERINO_WHITE_THEME,
} from "@/resources";
import { css2qt, qt2css } from "@/utils";

interface Tab {
    label: string;
    key: string;
    children: ReactNode;
}

function downloadFile(text: string, fileName: string) {
    const a = document.createElement("a");
    a.href = "data:text/plan;charset=utf-8," + encodeURIComponent(text);
    a.download = fileName;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function ExportButton() {
    const { data } = useConfigContext();
    return (
        <Button
            className="border-gray-200 text-gray-800 bg"
            onClick={() => {
                downloadFile(JSON.stringify(css2qt(data)), "theme.json");
            }}
        >
            {" "}
            Export{" "}
        </Button>
    );
}

export default function Home() {
    const [activeTab, setActiveTab] = useState("overview");
    const [activePreviewTab, setActivePreviewTab] = useState("chat");
    const [isOpen, setOpen] = useState(false);

    return (
        <ConfigContextProvider>
            <div className="h-full flex flex-col">
                <div className="px-4 border-b border-b-gray-200 flex-shrink-0 flex items-center space-x-2">
                    <div className="text-2xl font-bold py-2">
                        Chatterino Theme Creator
                    </div>
                    <div className="flex-grow"></div>
                    <Button
                        type="primary"
                        className="border-gray-200 text-gray-800 font-bold"
                        onClick={() => setOpen(true)}
                    >
                        New
                    </Button>
                    <ExportButton />
                </div>
                {/*<div className="h-full bg-emerald-300"></div>*/}
                {/*overflow-auto somehow force the height to be correct??*/}
                <div className="h-full overflow-auto flex">
                    {/*left col*/}
                    <div className="flex-1 flex-shrink overflow-hidden">
                        {/*tab bar*/}
                        <div className="flex items-center overflow-x-auto border-b border-gray-200 mb-4">
                            {tabs.map((it) => (
                                <button
                                    className={clsx(
                                        "mx-3 py-3   min-w-[80px]",
                                        "hover:text-sky-500",
                                        it.key == activeTab && "text-sky-500"
                                    )}
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
                                    className={clsx(
                                        "mx-3 py-3   min-w-[80px]",
                                        "hover:text-sky-500",
                                        it.key == activePreviewTab &&
                                            "text-sky-500"
                                    )}
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
            <ThemeModal isOpen={isOpen} setOpen={setOpen} />
        </ConfigContextProvider>
    );
}

const tabs: Tab[] = [
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
        children: <WindowSettings />,
    },
];
const previewTabs: Tab[] = [
    {
        label: "Chat",
        key: "chat",
        children: (
            <div className="p-4 bg-gray-800 text-white h-full overflow-hidden flex flex-col">
                <ChatterinoSplitVertical
                    chatMessages={fakeChatListLarge}
                    extraClasses={clsx("h-[1000px]")}
                />
            </div>
        ),
    },
    {
        label: "Split Drop Preivew",
        key: "spilt_drop_preview",
        children: (
            <div className="p-4 bg-gray-800 text-white h-full overflow-hidden">
                <div>
                    Hover mouse around split & drop target to simulate dragging
                    split
                </div>
                <ChatterinoDragSplitPreview chatMessages={fakeChatListSmall} />
            </div>
        ),
    },
    {
        label: "Split Drop Target",
        key: "spilt_drop_target",
        children: (
            <div className="p-4 bg-gray-800 text-white h-full overflow-hidden flex flex-col">
                <div>
                    Hover mouse around split & drop target to simulate dragging
                    split
                </div>
                <ChatterinoSplitAdvanced chatMessages={fakeChatListVerySmall} />
            </div>
        ),
    },
    {
        label: "Split Resize",
        key: "spilt_resize",
        children: (
            <div className="p-4 bg-gray-800 text-white h-full overflow-hidden flex flex-col">
                <ChatterinoSplitResize chatMessages={fakeChatListVerySmall} />
            </div>
        ),
    },
    {
        label: "Tab States",
        key: "tab_states",
        children: (
            <div className="p-4 bg-gray-800 h-full overflow-auto flex flex-col">
                <ChatterinoTabPreview />
            </div>
        ),
    },
];

function ThemeModal({
    isOpen,
    setOpen,
}: {
    isOpen: boolean;
    setOpen: (v: boolean) => void;
}) {
    const { data, setData } = useConfigContext();
    const [selectedPreset, setSelectedPreset] = useState("dark");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>();
    return (
        <Modal
            open={isOpen}
            afterOpenChange={(v) => setOpen(v)}
            okButtonProps={{
                type: "default",
            }}
            onOk={() => {
                switch (selectedPreset) {
                    case "light":
                        setData(CHATTERINO_LIGHT_THEME);
                        break;
                    case "dark":
                        setData(CHATTERINO_DARK_THEME);
                        break;
                    case "white":
                        setData(CHATTERINO_WHITE_THEME);
                        break;
                    case "black":
                        setData(CHATTERINO_BLACK_THEME);
                        break;
                    case "custom":
                        if (!selectedFile) {
                            alert("No file selected!");
                            return;
                        }
                        selectedFile
                            .text()
                            .then((res) => {
                                // TODO: extra no validation
                                const theme = JSON.parse(res) as ThemeData;
                                setData(qt2css(theme));
                            })
                            .catch((err) => {
                                console.error("Error reading file", err);
                                alert("Error reading file: " + err.message);
                            });
                }
                setOpen(false);
            }}
            onCancel={() => setOpen(false)}
        >
            <h1 className="col-span-2 text-xl font-bold"> New Theme </h1>
            <hr className="my-4" />
            {/*<div className="flex items-center space-x-2">*/}
            <h2 className="col-span-2 text-base font-semibold my-4">
                From Chatterino Theme ...
            </h2>
            <div className="space-y-2">
                {["light", "dark", "white", "black"].map((it) => (
                    <button
                        key={it}
                        className={clsx(
                            "w-full py-4 rounded-md border font-mono",
                            selectedPreset == it
                                ? "bg-gray-700 text-gray-100 border-gray-100 "
                                : "bg-gray-100 text-gray-700 border-gray-700 "
                        )}
                        onClick={() => setSelectedPreset(it)}
                    >
                        {it.toUpperCase()}
                    </button>
                ))}
            </div>
            <h2 className="col-span-2 text-base font-semibold my-4">
                Import from your existing theme
            </h2>
            <div className="space-y-2">
                <button
                    className={clsx(
                        "w-full py-4 rounded-md border font-mono",
                        selectedPreset == "custom"
                            ? "bg-gray-700 text-gray-100 border-gray-100 "
                            : "bg-gray-100 text-gray-700 border-gray-700 "
                    )}
                    onClick={() => {
                        setSelectedPreset("custom");
                        fileInputRef.current?.click();
                    }}
                >
                    Choose file
                </button>
                {selectedPreset == "custom" && selectedFile == null && (
                    <p className="my-1 text-red-500"> Please select a file </p>
                )}
                {selectedPreset == "custom" && selectedFile && (
                    <p>
                        <strong>{selectedFile.name}</strong> selected
                    </p>
                )}
                <input
                    type="file"
                    className="hidden"
                    ref={(it) => (fileInputRef.current = it!)}
                    onChange={(e) => {
                        const file = e.target?.files?.[0];
                        if (!file) {
                            setSelectedFile(null);
                        } else {
                            setSelectedFile(file);
                        }
                    }}
                />
            </div>
        </Modal>
    );
}
