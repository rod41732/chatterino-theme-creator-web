"use client";
import { EditorFooter } from "@/app/create/EdtiorFooter";
import { UserThemeList } from "@/app/my-themes/UserThemeList";
import { UserBadge } from "@/app/components/UserBadge";
import { ThemeGalleryList } from "@/app/gallery/ThemeGalleryList";
import { Topbar } from "@/app/components/Topbar";

export default function MyThemesPage() {
    return (
        <div className="h-full flex flex-col">
            <Topbar title="Gallery" rightComponents={<UserBadge />} />

            <div className="flex-1 overflow-hidden h-full">
                <ThemeGalleryList />
            </div>
            <EditorFooter />
        </div>
    );
}
