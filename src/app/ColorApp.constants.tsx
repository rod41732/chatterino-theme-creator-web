import { OverviewSettings } from "@/app/settings/overviewSettings";
import { MessageSettings } from "@/app/settings/messageSettings";
import { ScrollBarSettings } from "@/app/settings/scrollBarSettings";
import { SplitSettings } from "@/app/settings/splitSettings";
import { TabsSettings } from "@/app/settings/tabsSettings";
import { WindowSettings } from "@/app/settings/windowSettings";
import {
    ChatterinoDragSplitPreview,
    ChatterinoSplitAdvanced,
    ChatterinoSplitResize,
    ChatterinoSplitVertical,
} from "@/app/fake-uis/chatterino";
import {
    fakeChatListLarge,
    fakeChatListSmall,
    fakeChatListVerySmall,
} from "@/app/data";
import clsx from "clsx";
import { ChatterinoTabPreview } from "@/app/fake-uis/chatterinoTabPreview.component";
import { ReactNode } from "react";
import { ChatterinoEmptySplit } from "@/app/fake-uis/emptysplit";
import { NewSplitMenu } from "@/app/fake-uis/newSplitMenu";

interface Tab {
    label: string;
    key: string;
    children: ReactNode;
}

export const TABS: Tab[] = [
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

export const PREVIEW_TABS: Tab[] = [
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
        label: "Empty Split",
        key: "empty_split",
        children: (
            <div className="p-4 bg-gray-800 text-white h-full overflow-hidden flex flex-col">
                <ChatterinoEmptySplit />
            </div>
        ),
    },
    {
        label: "New Split Menu",
        key: "new_split_menu",
        children: (
            <div className="p-4 bg-gray-800 text-white h-full overflow-hidden flex flex-col">
                <NewSplitMenu />
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
