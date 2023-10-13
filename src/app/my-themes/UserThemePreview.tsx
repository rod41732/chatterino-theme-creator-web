import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import styles from "@/app/fake-uis/chatlist.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { getThemeKey } from "@/lib/create-theme";
import { BiSolidDuplicate } from "react-icons/bi";
import { IconButton } from "@/app/components/IconButton";
import { MdCloudUpload, MdContentCopy, MdDownload } from "react-icons/md";
import { produce } from "immer";
import { copyToClipboard, downloadFile } from "@/lib/export-theme";
import { css2qt } from "@/utils";
import useNotification from "antd/es/notification/useNotification";
import { ThemeEntry } from "@/lib/type";
import { EditableText } from "@/app/components/EditableText";
import { getLocalStorage } from "@/lib/local-storage";

/** entry of theme, with small preview */
export function UserThemePreview({
    theme,
    onDelete,
    onUpload,
    onDuplicate,
}: {
    theme: ThemeEntry;
    onDelete: () => void;
    onUpload: () => void;
    onDuplicate: () => void;
}) {
    const router = useRouter();

    const customVars = useMemo(() => {
        const messageCol = theme.data.colors.messages;
        const scrollbarsCol = theme.data.colors.scrollbars;
        return {
            "--scrollbars-background": scrollbarsCol.background,
            "--scrollbars-thumb": scrollbarsCol.thumb,
            "--scrollbars-thumbSelected": scrollbarsCol.thumbSelected,
            "--splits-background": theme.data.colors.splits.background,
            "--messages-textColors-regular": messageCol.textColors.regular,
            "--messages-textColors-system": messageCol.textColors.system,
            "--messages-background-regular": messageCol.backgrounds.regular,
            "--messages-backgrounds-alternate":
                messageCol.backgrounds.alternate,
        } as any;
    }, [theme]);

    const [localName, setLocalName] = useState("");
    useEffect(() => {
        setLocalName(theme.data.ctcMeta.name);
    }, [theme.data]);

    const renameTheme = useCallback(
        async (newName: string) => {
            const updatedTheme = produce(theme.data, (draft) => {
                draft.ctcMeta.name = newName;
            });
            getLocalStorage().setItem(
                getThemeKey(theme.id),
                JSON.stringify(updatedTheme),
            );
            if (theme.id.startsWith("remote-")) {
                const remoteThemeId = theme.id.substring("remote-".length);

                await fetch("/api/themes/update-by-id", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: +remoteThemeId,
                        data: updatedTheme,
                    }),
                    credentials: "include",
                })
                    .then(() => {
                        console.log("saved ");
                    })
                    .catch((err) => {
                        console.error(
                            `Error update theme ${remoteThemeId}`,
                            err,
                        );
                        alert("Error!");
                    });
            }
            setLocalName(newName);
        },
        [theme],
    );

    const [notification, contextHolder] = useNotification();
    const idWithoutPrefix = theme.id.split("-")[1];

    return (
        <div
            className={"border border-gray-400 rounded-md m-2"}
            style={customVars}
        >
            {contextHolder}
            <div className="block mr-2 flex-grow p-2 group">
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
                                        {/*<div className="absolute r-0 t-0 w-4 h-4 bg-red-500">*/}
                                        {/*    forsen*/}
                                        {/*</div>*/}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div
                        className={
                            "absolute inset-0 right-5 bg-gray-950/50 group-hover:flex hidden items-center justify-center"
                        }
                    >
                        <div className={"flex items-center gap-x-2"}>
                            <IconButton
                                className="text-white"
                                onClick={() => {
                                    router.push("/edit/" + theme.id);
                                }}
                            >
                                <AiFillEdit />
                            </IconButton>
                            <IconButton
                                className="text-white"
                                onClick={onDuplicate}
                            >
                                <BiSolidDuplicate />
                            </IconButton>
                            <IconButton
                                className="text-white"
                                onClick={onDelete}
                            >
                                <AiFillDelete />
                            </IconButton>

                            {!theme.id.startsWith("remote-") && (
                                <IconButton
                                    className="text-white"
                                    onClick={onUpload}
                                >
                                    <MdCloudUpload />
                                </IconButton>
                            )}
                        </div>
                    </div>
                </div>

                {/*title*/}
                <div className="text-lg font-semibold group flex items-center">
                    <EditableText
                        value={localName}
                        onChangeCommited={async (newName) => {
                            await renameTheme(newName);
                        }}
                    />
                    <div className="flex-1"></div>
                    <IconButton
                        tooltip="Download theme"
                        onClick={() => {
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
                        onClick={async () => {
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
        </div>
    );
}
