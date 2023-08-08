import clsx from "clsx";
import {
    CHATTERINO_BLACK_THEME,
    CHATTERINO_DARK_THEME,
    CHATTERINO_LIGHT_THEME,
    CHATTERINO_WHITE_THEME,
} from "@/resources";
import { ThemeData } from "@/app/edit/ThemeContextProvider";
import { qt2css } from "@/utils";
import { ElementRef, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { EditorFooter } from "@/app/create/EdtiorFooter";
import { createAndSaveTheme } from "@/lib/create-theme";
import Link from "next/link";
import styles from "../fake-uis/chatlist.module.css";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiSolidDuplicate } from "react-icons/bi";

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

export function Splash() {
    const router = useRouter();

    const [selectedPreset, setSelectedPreset] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>();

    const [themes, setThemes] = useState<ThemeEntry[]>([]);
    useEffect(() => {
        setThemes(listThemes());
    }, []);

    return (
        <>
            <div className="px-4 border-b border-b-gray-200 flex-shrink-0 flex items-center space-x-2">
                <div className="text-2xl font-bold py-2">
                    Chatterino Theme Creator
                </div>
                {/*<ThemeButtons />*/}
            </div>
            <div className="flex-1 overflow-hidden">
                <div className="flex  items-center gap-x-8 h-full w-full px-8">
                    <div className="mt-6 flex-[1_0_0]">
                        <h1 className="text-2xl font-bold">
                            Create New Chatterino Theme
                        </h1>

                        <hr className="my-4" />
                        {/*<div className="flex items-center space-x-2">*/}
                        <h2 className="col-span-2 text-base font-semibold my-4">
                            Based on Chatterino Default themes ...
                        </h2>
                        <div className="flex flex-wrap">
                            {["light", "dark", "white", "black"].map((it) => (
                                <div key={it} className="w-1/4 p-2">
                                    <button
                                        className={clsx(
                                            "w-full py-2 rounded-md border font-mono",
                                            selectedPreset == it
                                                ? "bg-gray-700 text-gray-100 border-gray-100 "
                                                : "bg-gray-100 text-gray-700 border-gray-700 ",
                                        )}
                                        onClick={() => setSelectedPreset(it)}
                                    >
                                        {it.toUpperCase()}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <h2 className="col-span-2 text-base font-semibold my-4">
                            ... Or Upload theme file to edit
                        </h2>
                        <div className="space-y-2">
                            <button
                                className={clsx(
                                    "w-full py-2 rounded-md border font-mono",
                                    selectedPreset == "custom"
                                        ? "bg-gray-700 text-gray-100 border-gray-100 "
                                        : "bg-gray-100 text-gray-700 border-gray-700 ",
                                )}
                                onClick={() => {
                                    setSelectedPreset("custom");
                                    fileInputRef.current?.click();
                                }}
                            >
                                Choose file
                            </button>
                            {selectedPreset == "custom" &&
                                selectedFile == null && (
                                    <p className="my-1 text-red-500">
                                        {" "}
                                        Please select a file{" "}
                                    </p>
                                )}
                            {selectedPreset == "custom" && selectedFile && (
                                <p>
                                    <strong>{selectedFile.name}</strong>{" "}
                                    selected
                                </p>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                ref={(it) => (fileInputRef.current = it!)}
                                onChange={(e) => {
                                    const file = e.target?.files?.[0];
                                    if (!file) {
                                        setSelectedFile(null);
                                    } else {
                                        setSelectedFile(file);
                                    }
                                }}
                            />
                        </div>

                        <button
                            className={clsx(
                                "w-full py-2 rounded-md border font-mono my-2",
                                "hover:bg-blue-500 hover:text-blue-100 hover:border-blue-100 ",
                                "bg-blue-700 text-blue-100 border-blue-100",
                                "disabled:bg-blue-100 disabled:text-blue-700 disabled:border-blue-700",
                            )}
                            disabled={
                                !selectedPreset ||
                                (selectedPreset == "custom" &&
                                    selectedFile == null)
                            }
                            onClick={() => {
                                switch (selectedPreset) {
                                    case "light": {
                                        const themeId = createAndSaveTheme(
                                            CHATTERINO_LIGHT_THEME,
                                        );
                                        router.push("edit/" + themeId);
                                        break;
                                    }
                                    case "dark": {
                                        const themeId = createAndSaveTheme(
                                            CHATTERINO_DARK_THEME,
                                        );
                                        router.push("edit/" + themeId);
                                        break;
                                    }
                                    case "white": {
                                        const themeId = createAndSaveTheme(
                                            CHATTERINO_WHITE_THEME,
                                        );
                                        router.push("edit/" + themeId);
                                        break;
                                    }
                                    case "black": {
                                        const themeId = createAndSaveTheme(
                                            CHATTERINO_BLACK_THEME,
                                        );
                                        router.push("edit/" + themeId);
                                        break;
                                    }
                                    case "custom": {
                                        if (!selectedFile) {
                                            alert("No file selected!");
                                            return;
                                        }
                                        selectedFile
                                            .text()
                                            .then((res) => {
                                                // TODO: extra no validation
                                                const theme = JSON.parse(
                                                    res,
                                                ) as ThemeData;

                                                const themeId =
                                                    createAndSaveTheme(
                                                        qt2css(theme),
                                                    );
                                                router.push("edit/" + themeId);
                                            })
                                            .catch((err) => {
                                                console.error(
                                                    "Error reading file",
                                                    err,
                                                );
                                                alert(
                                                    "Error reading file: " +
                                                        err.message,
                                                );
                                            });
                                        break;
                                    }
                                }
                            }}
                        >
                            Create new theme
                        </button>
                    </div>

                    <div className="flex-[2_0_0]">
                        <h2 className="text-xl font-bold mb-2">
                            ... Or Edit your existing themes
                        </h2>
                        <div className="overflow-auto  p-2 ">
                            {themes.map((theme) => {
                                const messageCol = theme.data.colors.messages;
                                return (
                                    <ThemePreview
                                        theme={theme}
                                        key={theme.id}
                                        onDelete={() => {
                                            localStorage.removeItem(
                                                "theme-" + theme.id,
                                            );
                                            setThemes(listThemes());
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <EditorFooter />
        </>
    );
}

function ThemePreview({
    theme,
    onDelete,
}: {
    theme: ThemeEntry;
    onDelete: () => void;
}) {
    const router = useRouter();

    const messageCol = theme.data.colors.messages;
    const scrollbarsCol = theme.data.colors.scrollbars;
    const customVars = useMemo(
        () =>
            ({
                "--scrollbars-background": scrollbarsCol.background,
                "--scrollbars-thumb": scrollbarsCol.thumb,
                "--scrollbars-thumbSelected": scrollbarsCol.thumbSelected,
                "--splits-background": theme.data.colors.splits.background,
            }) as any,
        [theme],
    );
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
                                style={{
                                    background:
                                        idx % 2 == 0
                                            ? messageCol.backgrounds.regular
                                            : messageCol.backgrounds.alternate,
                                    color: messageCol.textColors.regular,
                                }}
                                className="relative"
                            >
                                <div>
                                    <span
                                        style={{
                                            color: messageCol.textColors.system,
                                        }}
                                    >
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
