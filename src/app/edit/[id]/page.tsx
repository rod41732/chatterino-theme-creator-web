"use client";
import { TabContextProvider } from "@/app/edit/TabContextProvider";
import {
    ThemeContextProvider,
    useConfigContext,
} from "@/app/edit/ThemeContextProvider";
import { ColorApp } from "@/app/edit/ColorApp";
import { ThemeEditorButton } from "@/app/edit/ThemeEditorButtons";
import { EditorFooter } from "@/app/create/EdtiorFooter";
import { EditorStateContextProvider } from "@/app/edit/EditorStateContextProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserBadge } from "@/app/components/UserBadge";
import { ChatterinoAllPreviews } from "@/app/edit/ColorApp.constants";
import { IconButton } from "@/app/components/IconButton";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiSolidDuplicate } from "react-icons/bi";
import { MdCloudUpload, MdContentCopy, MdDownload } from "react-icons/md";
import { uploadTheme } from "@/lib/api/upload-theme";
import { createAndSaveTheme, getThemeKey } from "@/lib/create-theme";
import { produce } from "immer";
import { copyToClipboard, downloadFile } from "@/lib/export-theme";
import { css2qt } from "@/utils";
import useNotification from "antd/es/notification/useNotification";
import { ColorProvider } from "@/lib/ColorProvider";
import { Topbar } from "@/app/components/Topbar";

interface RouteParams {
    params: {
        id: string;
    };
}
export default function EditThemePage({ params: { id } }: RouteParams) {
    const router = useRouter();
    const query = useSearchParams()!;
    const pathName = usePathname()!;
    const isPreview = query.has("preview");
    const { data } = useConfigContext();

    return id ? (
        <EditorStateContextProvider>
            <TabContextProvider>
                <div className="h-full flex flex-col">
                    <Topbar
                        title="Theme Editor"
                        leftComponents={<ThemeName />}
                        rightComponents={
                            isPreview ? (
                                <>
                                    <div className="flex-1"></div>
                                    {isPreview && (
                                        <IconButton
                                            onClick={() => {
                                                // clear param
                                                router.push(pathName);
                                            }}
                                        >
                                            <p className="text-base">
                                                Back to edit
                                            </p>
                                        </IconButton>
                                    )}
                                    <UserBadge />
                                </>
                            ) : (
                                <ThemeEditorButton themeId={id} />
                            )
                        }
                    />
                    <div className="flex-1 overflow-hidden">
                        {isPreview ? (
                            <ColorProvider theme={data} className="h-full">
                                <ChatterinoAllPreviews />
                            </ColorProvider>
                        ) : (
                            <ColorApp />
                        )}
                    </div>
                    <EditorFooter />
                </div>
            </TabContextProvider>
        </EditorStateContextProvider>
    ) : (
        <div> no theme id</div>
    );
}

function ThemeName() {
    const { data, setData } = useConfigContext();
    return <div>{data.ctcMeta.name}</div>;
}
