import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import styles from "@/app/fake-uis/chatlist.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { getThemeKey } from "@/lib/create-theme";
import { BiSolidDuplicate } from "react-icons/bi";
import { ThemeData } from "@/app/edit/ThemeContextProvider";
import { IconButton } from "@/app/components/IconButton";
import { MdCloudUpload, MdEdit } from "react-icons/md";
import { produce } from "immer";

export interface ThemeEntry {
    id: string;
    data: ThemeData;
}

/** entry of theme, with small preview */
export function ThemePreview({
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

    const [editMode, setEditMode] = useState(false);
    const [localName, setLocalName] = useState("");
    useEffect(() => {
        setLocalName(theme.data.ctcMeta.name);
    }, [theme]);

    const [newName, setNewName] = useState("");
    useEffect(() => {
        if (editMode) {
            setNewName(localName);
        }
    }, [editMode]);

    const renameTheme = useCallback(
        (newName: string) => {
            const updatedTheme = produce(theme.data, (draft) => {
                draft.ctcMeta.name = newName;
            });
            localStorage.setItem(
                getThemeKey(theme.id),
                JSON.stringify(updatedTheme),
            );
            if (theme.id.startsWith("remote-")) {
                const remoteThemeId = theme.id.substring("remote-".length);

                fetch("/api/themes/update-by-id", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: remoteThemeId,
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
        },
        [theme],
    );

    return (
        <div
            className={"border border-gray-400 rounded-md m-2"}
            style={customVars}
        >
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
                                                ? styles.chatEven
                                                : styles.chatOdd,
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
                            <IconButton
                                className="text-white"
                                onClick={onUpload}
                            >
                                <MdCloudUpload />
                            </IconButton>
                        </div>
                    </div>
                </div>

                {/*nav*/}
                {editMode ? (
                    <input
                        className="my-1 border border-gray-400 rounded-md outline-none"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        autoFocus
                        onBlur={() => {
                            setLocalName(newName);
                            renameTheme(newName);
                            setEditMode(false);
                        }}
                        onKeyDown={(e) => {
                            if (e.key == "Escape") {
                                setEditMode(false);
                            }
                            if (e.key == "Enter") {
                                setLocalName(newName);
                                renameTheme(newName);
                                setEditMode(false);
                            }
                        }}
                    />
                ) : (
                    <div
                        // href={"/edit/" + theme.id}
                        className="text-lg font-semibold group flex items-center"
                        onClick={() => setEditMode(true)}
                    >
                        <p>{localName}</p>
                        <MdEdit className="text-gray-400 hidden group-hover:block" />
                    </div>
                )}
                <p className="text-gray-500"> {theme.id}</p>
            </div>
        </div>
    );
}
