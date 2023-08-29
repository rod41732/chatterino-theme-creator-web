"use client";
import { EditorFooter } from "@/app/create/EdtiorFooter";
import { UserThemeList } from "@/app/my-themes/UserThemeList";
import { UserBadge } from "@/app/components/UserBadge";
import { Topbar } from "@/app/components/Topbar";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function MyThemesPage() {
    const router = useRouter();
    return (
        <div className="h-full flex flex-col">
            <Topbar
                title="My themes"
                rightComponents={
                    <div className="flex items-center">
                        <Button
                            type="primary"
                            className="text-blue-500"
                            onClick={async () => {
                                await router.push("/create");
                            }}
                        >
                            Create new theme
                        </Button>

                        <UserBadge />
                    </div>
                }
            />
            <div className="flex-1 overflow-hidden h-full">
                <UserThemeList />
            </div>
            <EditorFooter />
        </div>
    );
}
