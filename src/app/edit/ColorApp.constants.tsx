import {
    fakeChatListLarge,
    fakeChatListSmall,
    fakeChatListVerySmall,
} from "@/app/edit/data";
import { PreviewTab, SettingsTab } from "@/app/edit/tab.types";
import {
    ChatterinoDragSplitPreview,
    ChatterinoSplitAdvanced,
    ChatterinoSplitResize,
    ChatterinoSplitVertical,
} from "@/app/fake-uis/chatterino";
import { ChatterinoTabPreview } from "@/app/fake-uis/chatterinoTabPreview.component";
import { ChatterinoEmptySplit } from "@/app/fake-uis/emptysplit";
import { EmoteMenu, NewSplitMenu } from "@/app/fake-uis/newSplitMenu";
import { FindPopup, ThreadPopup, UserCard } from "@/app/fake-uis/userInfoCard";
import { MessageSettings } from "@/app/settings/messageSettings";
import { OverviewSettings } from "@/app/settings/overviewSettings";
import { ScrollBarSettings } from "@/app/settings/scrollBarSettings";
import { SplitSettings } from "@/app/settings/splitSettings";
import { TabsSettings } from "@/app/settings/tabsSettings";
import { WindowSettings } from "@/app/settings/windowSettings";
import clsx from "clsx";
import { ReactNode } from "react";

interface Tab {
    label: string;
    key: string;
    children: ReactNode;
}

export const TABS: Tab[] = [
    {
        label: "Overview",
        key: SettingsTab.OVERVIEW,
        children: <OverviewSettings />,
    },
    {
        label: "Messages",
        key: SettingsTab.MESSAGES,
        children: <MessageSettings />,
    },
    {
        label: "Scrollbars",
        key: SettingsTab.SCROLLBARS,
        children: <ScrollBarSettings />,
    },
    {
        label: "Splits",
        key: SettingsTab.SPLITS,
        children: <SplitSettings />,
    },
    {
        label: "Tabs",
        key: SettingsTab.TABS,
        children: <TabsSettings />,
    },
    {
        label: "Window",
        key: SettingsTab.WINDOW,
        children: <WindowSettings />,
    },
];

export const PREVIEW_TABS: Tab[] = [
    {
        label: "Chat",
        key: PreviewTab.CHAT,
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
        key: PreviewTab.SPILT_DROP_PREVIEW,
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
        key: PreviewTab.SPILT_DROP_TARGET,
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
        key: PreviewTab.SPILT_RESIZE,
        children: (
            <div className="p-4 bg-gray-800 text-white h-full overflow-hidden flex flex-col">
                <ChatterinoSplitResize chatMessages={fakeChatListVerySmall} />
            </div>
        ),
    },
    {
        label: "Empty Split",
        key: PreviewTab.EMPTY_SPLIT,
        children: (
            <div className="p-4 bg-gray-800 text-white h-full overflow-hidden flex flex-col">
                <ChatterinoEmptySplit />
            </div>
        ),
    },
    {
        label: "New Split Menu",
        key: PreviewTab.NEW_SPLIT_MENU,
        children: (
            <div className="p-4 bg-gray-800 text-white h-full overflow-hidden flex flex-col">
                <NewSplitMenu />
            </div>
        ),
    },
    {
        label: "Emote Menu",
        key: PreviewTab.EMOTE_MENU,
        children: (
            <div className="p-4 bg-gray-800 text-white h-full overflow-hidden flex flex-col">
                <EmoteMenu />
            </div>
        ),
    },
    {
        label: "Tab States",
        key: PreviewTab.TAB_STATES,
        children: (
            <div className="p-4 bg-gray-800 h-full overflow-auto flex flex-col">
                <ChatterinoTabPreview />
            </div>
        ),
    },
    {
        label: "User card",
        key: PreviewTab.USER_CARD,
        children: (
            <div className="p-4 bg-gray-800 h-full overflow-auto flex flex-col">
                <UserCard />
            </div>
        ),
    },
    {
        label: "Thread popup",
        key: PreviewTab.THREAD_POPUP,
        children: (
            <div className="p-4 bg-gray-800 h-full overflow-auto flex flex-col">
                <ThreadPopup />
            </div>
        ),
    },
    {
        label: "Find popup",
        key: PreviewTab.FIND_POPUP,
        children: (
            <div className="p-4 bg-gray-800 h-full overflow-auto flex flex-col">
                <FindPopup />
            </div>
        ),
    },
];
