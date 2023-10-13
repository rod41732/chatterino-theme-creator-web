import { ChatterinoOverview } from "@/app/settings/InspectSettings";
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
} from "@/data/fake-chat";
import clsx from "clsx";
import { ChatterinoEmptySplit } from "@/app/fake-uis/emptysplit";
import { EmoteMenu, NewSplitMenu } from "@/app/fake-uis/newSplitMenu";
import { ChatterinoTabPreview } from "@/app/fake-uis/chatterinoTabPreview.component";
import { FindPopup, ThreadPopup, UserCard } from "@/app/fake-uis/userInfoCard";
import { ReactNode } from "react";
import { ThemeAwareBackground } from "@/app/components/ThemeAwareBackground";

interface Tab {
    label: string;
    key: string;
    children: ReactNode;
}
export enum GalleryPreviewTab {
    ALL = "all",
    CHAT = "chat",
    SPILT_DROP_PREVIEW = "spilt_drop_preview",
    SPILT_DROP_TARGET = "spilt_drop_target",
    SPILT_RESIZE = "spilt_resize",
    EMPTY_SPLIT = "empty_split",
    NEW_SPLIT_MENU = "new_split_menu",
    EMOTE_MENU = "emote_menu",
    TAB_STATES = "tab_states",
    USER_CARD = "user_card",
    THREAD_POPUP = "thread_popup",
    FIND_POPUP = "find_popup",
}
export const GALLERY_TABS: Tab[] = [
    {
        label: "All",
        key: GalleryPreviewTab.ALL,
        children: (
            <ThemeAwareBackground className="h-full">
                <ChatterinoOverview />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Chat",
        key: GalleryPreviewTab.CHAT,
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
        key: GalleryPreviewTab.SPILT_DROP_PREVIEW,
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
        key: GalleryPreviewTab.SPILT_DROP_TARGET,
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
        key: GalleryPreviewTab.SPILT_RESIZE,
        children: (
            <ThemeAwareBackground className="p-4 h-full overflow-hidden flex flex-col">
                <ChatterinoSplitResize chatMessages={fakeChatListVerySmall} />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Empty Split",
        key: GalleryPreviewTab.EMPTY_SPLIT,
        children: (
            <ThemeAwareBackground className="p-4 h-full overflow-hidden flex flex-col">
                <ChatterinoEmptySplit />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "New Split Menu",
        key: GalleryPreviewTab.NEW_SPLIT_MENU,
        children: (
            <ThemeAwareBackground className="p-4 h-full overflow-hidden flex flex-col">
                <NewSplitMenu />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Emote Menu",
        key: GalleryPreviewTab.EMOTE_MENU,
        children: (
            <ThemeAwareBackground className="p-4 h-full overflow-hidden flex flex-col">
                <EmoteMenu />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Tab States",
        key: GalleryPreviewTab.TAB_STATES,
        children: (
            <ThemeAwareBackground className="p-4 bg-gray-800 h-full overflow-auto flex flex-col">
                <ChatterinoTabPreview />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "User card",
        key: GalleryPreviewTab.USER_CARD,
        children: (
            <ThemeAwareBackground className="p-4 bg-gray-800 h-full overflow-auto flex flex-col">
                <UserCard />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Thread popup",
        key: GalleryPreviewTab.THREAD_POPUP,
        children: (
            <ThemeAwareBackground className="p-4 bg-gray-800 h-full overflow-auto flex flex-col">
                <ThreadPopup />
            </ThemeAwareBackground>
        ),
    },
    {
        label: "Find popup",
        key: GalleryPreviewTab.FIND_POPUP,
        children: (
            <ThemeAwareBackground className="p-4 bg-gray-800 h-full overflow-auto flex flex-col">
                <FindPopup />
            </ThemeAwareBackground>
        ),
    },
];
