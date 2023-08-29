"use client";
import { CreateNewTheme } from "@/app/create/CreateNewTheme";
import { EditorFooter } from "@/app/create/EdtiorFooter";
import { UserBadge } from "@/app/components/UserBadge";
import Link from "next/link";
import { Topbar } from "@/app/components/Topbar";

export default function Home() {
    return (
        <div className="h-full flex flex-col">
            <Topbar
                title="Chatterino Theme Creator"
                rightComponents={<UserBadge />}
            />
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
