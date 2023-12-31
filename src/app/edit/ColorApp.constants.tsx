import {
    fakeChatListLarge,
    fakeChatListSmall,
    fakeChatListVerySmall,
} from "@/data/fake-chat";
import { PreviewTab } from "@/app/edit/editor-tab.types";
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
import clsx from "clsx";
import { ReactNode } from "react";
import { PreviewOptionContextProvider } from "@/lib/api/PreviewOptionContext";
import { ChatterinoOverview } from "@/app/settings/InspectSettings";
import { ThemeAwareBackground } from "@/app/components/ThemeAwareBackground";

interface Tab {
    label: string;
    key: string;
    children: ReactNode;
}

export const PREVIEW_TABS: Tab[] = [
    {
        label: "Editor",
        key: PreviewTab.EDITOR,
        children: (
            <ThemeAwareBackground className="h-full">
                <PreviewOptionContextProvider value={{ editable: true }}>
                    <ChatterinoOverview />
                </PreviewOptionContextProvider>
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Chat",
        key: PreviewTab.CHAT,
        children: (
            <ThemeAwareBackground className="p-4 h-full overflow-hidden flex flex-col">
                <ChatterinoSplitVertical
                    chatMessages={fakeChatListLarge}
                    extraClasses={clsx("h-[1000px]")}
                />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Split Drop Preivew",
        key: PreviewTab.SPILT_DROP_PREVIEW,
        children: (
            <ThemeAwareBackground className="p-4 h-full overflow-hidden">
                <div>
                    Hover mouse around split & drop target to simulate dragging
                    split
                </div>
                <ChatterinoDragSplitPreview chatMessages={fakeChatListSmall} />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Split Drop Target",
        key: PreviewTab.SPILT_DROP_TARGET,
        children: (
            <ThemeAwareBackground className="p-4 h-full overflow-hidden flex flex-col">
                <div>
                    Hover mouse around split & drop target to simulate dragging
                    split
                </div>
                <ChatterinoSplitAdvanced chatMessages={fakeChatListVerySmall} />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Split Resize",
        key: PreviewTab.SPILT_RESIZE,
        children: (
            <ThemeAwareBackground className="p-4 h-full overflow-hidden flex flex-col">
                <ChatterinoSplitResize chatMessages={fakeChatListVerySmall} />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Empty Split",
        key: PreviewTab.EMPTY_SPLIT,
        children: (
            <ThemeAwareBackground className="p-4 h-full overflow-hidden flex flex-col">
                <ChatterinoEmptySplit />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "New Split Menu",
        key: PreviewTab.NEW_SPLIT_MENU,
        children: (
            <ThemeAwareBackground className="p-4 h-full overflow-hidden flex flex-col">
                <NewSplitMenu />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Emote Menu",
        key: PreviewTab.EMOTE_MENU,
        children: (
            <ThemeAwareBackground className="p-4 h-full overflow-hidden flex flex-col">
                <EmoteMenu />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Tab States",
        key: PreviewTab.TAB_STATES,
        children: (
            <ThemeAwareBackground className="p-4 bg-gray-800 h-full overflow-auto flex flex-col">
                <ChatterinoTabPreview />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "User card",
        key: PreviewTab.USER_CARD,
        children: (
            <ThemeAwareBackground className="p-4 bg-gray-800 h-full overflow-auto flex flex-col">
                <UserCard />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Thread popup",
        key: PreviewTab.THREAD_POPUP,
        children: (
            <ThemeAwareBackground className="p-4 bg-gray-800 h-full overflow-auto flex flex-col">
                <ThreadPopup />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Find popup",
        key: PreviewTab.FIND_POPUP,
        children: (
            <ThemeAwareBackground className="p-4 bg-gray-800 h-full overflow-auto flex flex-col">
                <FindPopup />
            </ThemeAwareBackground>
        ),
    },
];
