"use client";
import { CreateNewTheme } from "@/app/create/CreateNewTheme";
import { EditorFooter } from "@/app/create/EdtiorFooter";
import { UserBadge } from "@/app/components/UserBadge";
import Link from "next/link";

export default function Home() {
    return (
        <div className="h-full flex flex-col">
            <div className="px-4 border-b border-b-gray-200 flex-shrink-0 flex items-center space-x-2">
                <div className="text-2xl font-bold py-2">
                    Chatterino Theme Creator
                </div>
                <div> Create Theme </div>
                <div className="flex-1"> </div>
                <UserBadge />
            </div>
            <div className="flex-1 overflow-hidden flex items-center justify-center">
                <div className="flex-shrink overflow-hidden w-full max-h-full max-w-xl mx-8 flex flex-col">
                    <CreateNewTheme />
                    <Link
                        href="/my-themes"
                        className="w-full text-center mt-2 text-blue-500"
                    >
                        View my themes
                    </Link>
                </div>
            </div>
            <EditorFooter />
        </div>
    );
}
