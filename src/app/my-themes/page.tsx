"use client";
import { EditorFooter } from "@/app/create/EdtiorFooter";
import { UserThemeList } from "@/app/my-themes/UserThemeList";
import { UserBadge } from "@/app/components/UserBadge";

export default function MyThemesPage() {
    return (
        <div className="h-full flex flex-col">
            <div className="px-4 border-b border-b-gray-200 flex-shrink-0 flex items-center space-x-2">
                <div className="text-2xl font-bold py-2">
                    Chatterino Theme Creator
                </div>
                <div> My themes </div>
                <div className="flex-1"> </div>
                <UserBadge />
            </div>
            <div className="flex-1 overflow-hidden h-full">
                <UserThemeList />
            </div>
            <EditorFooter />
        </div>
    );
}
