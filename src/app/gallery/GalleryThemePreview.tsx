import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import styles from "@/app/fake-uis/chatlist.module.css";
import { IconButton } from "@/app/components/IconButton";
import { MdContentCopy, MdDownload, MdVisibility } from "react-icons/md";
import { copyToClipboard, downloadFile } from "@/lib/export-theme";
import { css2qt } from "@/utils";
import useNotification from "antd/es/notification/useNotification";
import { ThemeEntryWithOwner } from "@/app/gallery/types";
import { Modal } from "antd";
import { ReadonlyThemeContextProvider } from "@/app/edit/ThemeContextProvider";
import { ColorProvider } from "@/lib/ColorProvider";
import { ComponentsOverview } from "@/app/fake-uis/ComponentsOverview";

/** entry of theme, with small preview */
export function GalleryThemePreview({ theme }: { theme: ThemeEntryWithOwner }) {
    const router = useRouter();
    const [notification, contextHolder] = useNotification();
    const idWithoutPrefix = theme.id.split("-")[1];
    const [showPreview, setShowPreview] = useState(false);

    return (
        <ColorProvider
            className={"border border-gray-400 rounded-md m-2"}
            theme={theme.data}
        >
            {contextHolder}
            <Modal
                open={showPreview}
                title={<div className="text-2xl font-bold">Theme Preview</div>}
                onCancel={() => setShowPreview(false)}
                width="80%"
                wrapClassName="p-4"
                footer={null}
            >
                <div
                    style={{
                        // antd built-in padding top of 107px
                        height: "calc(100vh - 314px)",
                    }}
                >
                    {/*due to some depedency of preview component, context is required*/}
                    <ReadonlyThemeContextProvider theme={theme.data}>
                        {/*this actually provides styles*/}
                        <ColorProvider theme={theme.data} className="h-full">
                            <ComponentsOverview />
                        </ColorProvider>
                    </ReadonlyThemeContextProvider>
                </div>
            </Modal>
            <div
                className="block mr-2 flex-grow p-2 group"
                role="button"
                onClick={() => {
                    router.push("/gallery/" + theme.id);
                }}
            >
                {/*mini chat & overlay */}
                <div className="relative">
                    <div className={clsx(styles.split)}>
                        <div
                            className={clsx(
                                "overflow-y-auto w-full max-h-36",
                                styles.list,
                            )}
                        >
                            {Array(10)
                                .fill(0)
                                .map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={clsx(
                                            idx % 2 == 0
                                                ? styles.chatBackgroundRegular
                                                : styles.chatBackgroundAlternate,
                                            styles.normalText,
                                        )}
                                    >
                                        <div>
                                            <span className={styles.systemText}>
                                                {" "}
                                                13:37{" "}
                                            </span>
                                            <span className="text-red-500 font-bold">
                                                {" "}
                                                doge:{" "}
                                            </span>
                                            <span>This is message</span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div
                        className={
                            "absolute inset-0 right-5 bg-gray-950/50 group-hover:flex hidden items-center justify-center"
                        }
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={"flex items-center gap-x-2"}>
                            <IconButton
                                className="text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowPreview(true);
                                }}
                            >
                                <MdVisibility />
                            </IconButton>
                        </div>
                    </div>
                </div>

                {/*title*/}
                <div
                    // href={"/edit/" + theme.id}
                    className="group flex items-center"
                >
                    <div>
                        <p className="text-lg font-semibold ">
                            {theme.data.ctcMeta.name}
                        </p>
                        <p className={"text-gray-500"}>
                            {" "}
                            By @{theme.owner.handle}
                        </p>
                    </div>

                    <div className="flex-1"></div>
                    <IconButton
                        tooltip="Download theme"
                        onClick={(e) => {
                            e.stopPropagation();
                            downloadFile(
                                JSON.stringify(css2qt(theme.data), null, 2),
                                idWithoutPrefix +
                                    "-" +
                                    theme.data.ctcMeta.name +
                                    ".json",
                            );
                        }}
                    >
                        <MdDownload />
                    </IconButton>
                    <IconButton
                        tooltip="Copy theme to clipboard"
                        onClick={async (e) => {
                            e.stopPropagation();
                            const themeJSON = JSON.stringify(
                                theme.data,
                                null,
                                2,
                            );
                            await copyToClipboard(themeJSON);
                            notification.success({
                                message: "Copied theme to clipboard",
                            });
                        }}
                    >
                        <MdContentCopy />
                    </IconButton>
                </div>

                <div className="flex items-center gap-x-2 flex-wrap">
                    {
                        // dark theme has light icons and vice-versa, hence the "inverted" logic
                        theme.data.metadata.iconTheme == "light" ? (
                            <p className="px-2 py-1 rounded-md bg-gray-900 text-white border border-white leading-none">
                                Dark
                            </p>
                        ) : (
                            <p className="px-2 py-1 rounded-md bg-white text-gray-900 border border-gray-900 leading-none">
                                Light
                            </p>
                        )
                    }
                    {theme.data.ctcMeta.messageSeparator && (
                        <p className="px-2 py-1 rounded-md bg-white text-blue-500 border border-blue-500 leading-none">
                            Separator
                        </p>
                    )}
                    {theme.data.ctcMeta.checkeredRow && (
                        <p className="px-2 py-1 rounded-md bg-blue-500 text-white border border-white leading-none">
                            Checkered
                        </p>
                    )}
                </div>

                <p className="text-gray-500">
                    {" "}
                    Updated: {theme.data.ctcMeta.modifiedAt}
                </p>
                <p className="text-gray-500">
                    {" "}
                    Created: {theme.data.ctcMeta.createdAt}
                </p>
                <p className="text-gray-500"> {theme.id}</p>
            </div>
        </ColorProvider>
    );
}
