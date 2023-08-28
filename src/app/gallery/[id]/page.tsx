"use client";
import { TabContextProvider } from "@/app/edit/TabContextProvider";
import { useConfigContext } from "@/app/edit/ThemeContextProvider";
import { EditorFooter } from "@/app/create/EdtiorFooter";
import { EditorStateContextProvider } from "@/app/edit/EditorStateContextProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserBadge } from "@/app/components/UserBadge";
import { ChatterinoAllPreviews } from "@/app/edit/ColorApp.constants";
import { IconButton } from "@/app/components/IconButton";
import { BiSolidDuplicate } from "react-icons/bi";
import { MdContentCopy, MdDownload } from "react-icons/md";
import { createAndSaveTheme } from "@/lib/create-theme";
import { produce } from "immer";
import { copyToClipboard, downloadFile } from "@/lib/export-theme";
import { css2qt } from "@/utils";
import useNotification from "antd/es/notification/useNotification";
import { ColorProvider } from "@/lib/ColorProvider";

interface RouteParams {
    params: {
        id: string;
    };
}
export default function ViewThemePage({ params: { id } }: RouteParams) {
    const { data } = useConfigContext();

    return id ? (
        <EditorStateContextProvider>
            <TabContextProvider>
                <div className="h-full flex flex-col">
                    <div className="px-4 border-b border-b-gray-200 flex-shrink-0 flex items-center space-x-2">
                        <div className="text-2xl font-bold py-2">
                            Chatterino Theme Creator
                        </div>
                        <div className="flex-1"></div>
                        <UserBadge />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <ColorProvider
                            className="h-full w-full flex flex-col overflow-hidden"
                            theme={data}
                        >
                            <ChatterinoAllPreviews />
                            <div className="flex-shrink-0 p-2">
                                <ThemeDetails themeId={id} />
                            </div>
                        </ColorProvider>
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
    const idWithoutPrefix = themeId.split("-")[1];

    const [notification, contentHolder] = useNotification();

    return (
        <div>
            {contentHolder}
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
                        tooltip="Download theme"
                        onClick={() => {
                            downloadFile(
                                JSON.stringify(css2qt(data), null, 2),
                                idWithoutPrefix +
                                    "-" +
                                    data.ctcMeta.name +
                                    ".json",
                            );
                        }}
                    >
                        <MdDownload />
                    </IconButton>
                    <IconButton
                        tooltip="Copy theme to clipboard"
                        onClick={async () => {
                            const themeJSON = JSON.stringify(data, null, 2);
                            await copyToClipboard(themeJSON);
                            notification.success({
                                message: "Copied theme to clipboard",
                            });
                        }}
                    >
                        <MdContentCopy />
                    </IconButton>
                    <IconButton
                        tooltip="Create your copy of theme"
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