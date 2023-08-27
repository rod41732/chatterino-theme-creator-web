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
import { MdCloudUpload } from "react-icons/md";
import { uploadTheme } from "@/lib/api/upload-theme";
import { createAndSaveTheme, getThemeKey } from "@/lib/create-theme";
import { produce } from "immer";

interface RouteParams {
    params: {
        id: string;
    };
}
export default function EditThemePage({ params: { id } }: RouteParams) {
    const router = useRouter();
    const query = useSearchParams()!;
    const pathName = usePathname()!;
    const isInfo = query.has("info");
    const isPreview = query.has("preview");

    return id ? (
        <EditorStateContextProvider>
            <TabContextProvider>
                <div className="h-full flex flex-col">
                    <div className="px-4 border-b border-b-gray-200 flex-shrink-0 flex items-center space-x-2">
                        <div className="text-2xl font-bold py-2">
                            Chatterino Theme Creator
                        </div>
                        {isInfo || isPreview ? (
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
                        )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        {isInfo ? (
                            <div className="h-full w-full flex flex-col overflow-hidden">
                                <ChatterinoAllPreviews />
                                <div className="flex-shrink-0">
                                    <ThemeDetails themeId={id} />
                                </div>
                            </div>
                        ) : isPreview ? (
                            <ChatterinoAllPreviews />
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

function ThemeDetails({ themeId }: { themeId: string }) {
    const { data } = useConfigContext();
    const router = useRouter();
    // CV paste from UserThemeList, might need [refactor]

    return (
        <div>
            <div className="flex overflow-hidden">
                <div>
                    <span className="text-2xl font-bold">
                        {data.ctcMeta.name}
                    </span>
                    <span className="text-gray-500"> By @forsen</span>
                </div>
                <div className="flex-1"></div>
                <div className={"flex items-center gap-x-2"}>
                    <IconButton
                        tooltip="Forsen aaaaaaaaaaaaaaaa "
                        onClick={async () => {
                            const dataCopy = produce(data, (draft) => {
                                draft.ctcMeta.name += " Copy";
                            });
                            const themeId = createAndSaveTheme(dataCopy);
                            await router.push(`/edit/${themeId}`);
                        }}
                    >
                        <BiSolidDuplicate />
                    </IconButton>
                </div>
            </div>

            <div className="flex items-center gap-x-2 flex-wrap">
                {
                    // dark theme has light icons and vice-versa, hence the "inverted" logic
                    data.metadata.iconTheme == "light" ? (
                        <p className="px-2 py-1 rounded-md bg-gray-900 text-white border border-white leading-none">
                            Dark
                        </p>
                    ) : (
                        <p className="px-2 py-1 rounded-md bg-white text-gray-900 border border-gray-900 leading-none">
                            Light
                        </p>
                    )
                }
                {data.ctcMeta.messageSeparator && (
                    <p className="px-2 py-1 rounded-md bg-white text-blue-500 border border-blue-500 leading-none">
                        Separator
                    </p>
                )}
                {data.ctcMeta.checkeredRow && (
                    <p className="px-2 py-1 rounded-md bg-blue-500 text-white border border-white leading-none">
                        Checkered
                    </p>
                )}
            </div>

            <p className="text-gray-500"> Updated: {data.ctcMeta.modifiedAt}</p>
            <p className="text-gray-500"> {themeId}</p>
        </div>
    );
}
