import { useEffect, useMemo, useState } from "react";
import { ThemeData } from "@/app/edit/ThemeContextProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { createAndSaveTheme } from "@/lib/create-theme";
import { BiSolidDuplicate } from "react-icons/bi";
import clsx from "clsx";
import styles from "@/app/fake-uis/chatlist.module.css";
import { HiXMark } from "react-icons/hi2";
import { ApiResponse } from "@/lib/type";
import { Theme } from "@/lib/db/theme";
function localStorageKeys(): string[] {
    return Array(localStorage.length)
        .fill(0)
        .map((_, idx) => localStorage.key(idx)!);
}

interface ThemeEntry {
    id: string;
    data: ThemeData;
}
function listThemes() {
    return localStorageKeys()
        .filter((it) => it.startsWith("theme-"))
        .map((it): ThemeEntry | null => {
            try {
                return {
                    id: it.slice("theme-".length),
                    data: JSON.parse(localStorage.getItem(it)!),
                };
            } catch (err) {
                console.warn("Error parsing theme from key", it, err);
                return null;
            }
        })
        .filter((it): it is ThemeEntry => it != null);
}

export function UserThemeList() {
    const [localThemes, setLocalThemes] = useState<ThemeEntry[]>([]);
    const [remoteThemes, setRemoteThemes] = useState<ThemeEntry[]>([]);
    useEffect(() => {
        setLocalThemes(listThemes());
    }, []);
    useEffect(() => {
        fetch("/api/themes/mine", {
            // credentials: "include",
        }).then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                console.error(`Error getting owned themes`, res.status, data);
                return;
            }
            const themes = (data as ApiResponse<Theme[]>).data.map(
                (it): ThemeEntry => {
                    return {
                        id: "remote-" + it.id,
                        data: it.data,
                    };
                },
            );
            console.log("Got", themes.length, "remote themes");
            setRemoteThemes(themes);
        });
    }, []);
    const allThemes = useMemo(
        () => [...localThemes, ...remoteThemes],
        [localThemes, remoteThemes],
    );

    return (
        <div className="max-h-full overflow-hidden flex flex-col">
            <div className="text-lg font-semibold flex-shrink-0">
                Your themes
            </div>
            <p>
                This list your created themes, you can edit, duplicate or delete
                them.
            </p>
            <div className="flex-1 overflow-auto">
                {allThemes.map((theme) => {
                    return (
                        <ThemePreview
                            theme={theme}
                            key={theme.id}
                            onDelete={() => {
                                localStorage.removeItem("theme-" + theme.id);
                                setLocalThemes(listThemes());
                            }}
                        />
                    );
                })}
                {allThemes.length == 0 && (
                    <div className="flex flex-col items-center justify-center my-4 text-gray-500 text-lg">
                        <HiXMark className="text-2xl" />
                        <p>No themes created yet, create one!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

/** entry of theme, with small preview */
function ThemePreview({
    theme,
    onDelete,
}: {
    theme: ThemeEntry;
    onDelete: () => void;
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
    return (
        <div
            className={"flex border border-gray-400 rounded-md m-2"}
            style={customVars}
        >
            <div className="block mr-2 flex-grow p-2">
                <Link
                    href={"/edit/" + theme.id}
                    className="block text-lg font-semibold"
                >
                    {/*{theme.id}:*/}
                    {theme.data.ctcMeta.name}
                </Link>
                <p className="text-gray-500"> {theme.id}</p>
                <div className="flex items-center space-x-2">
                    <button
                        className="p-2 hover:bg-gray-200 cursor-pointer rounded-full"
                        onClick={() => {
                            router.push("/edit/" + theme.id);
                        }}
                    >
                        <AiFillEdit />
                    </button>
                    <button
                        className="p-2 hover:bg-gray-200 cursor-pointer rounded-full"
                        onClick={() => {
                            const themeId = createAndSaveTheme(theme.data);
                            router.push("/edit/" + themeId);
                        }}
                    >
                        <BiSolidDuplicate />
                    </button>
                    <button
                        className="p-2 hover:bg-gray-200 cursor-pointer rounded-full"
                        onClick={onDelete}
                    >
                        <AiFillDelete />
                    </button>
                </div>
            </div>
            <div className={clsx(styles.split)}>
                <div
                    className={clsx(
                        "overflow-y-auto w-[300px] max-h-24",
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
        </div>
    );
}
