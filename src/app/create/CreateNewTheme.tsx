import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { createAndSaveTheme } from "@/lib/create-theme";
import {
    CHATTERINO_BLACK_THEME,
    CHATTERINO_DARK_THEME,
    CHATTERINO_LIGHT_THEME,
    CHATTERINO_WHITE_THEME,
} from "@/resources";
import { qt2css } from "@/utils";
import { ThemeDataSchema } from "@/app/edit/color-scheme.types";
import { IconButton } from "@/app/components/IconButton";
import { AiFillApple, AiFillWindows } from "react-icons/ai";
import { FaLinux } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import { ZodError } from "zod";
import { getPath } from "@/lib/object-path.util";
import { Modal } from "antd";
import { useAsyncEffect } from "@/lib/hooks/use-async-effect";
import { BsChevronRight } from "react-icons/bs";

export function CreateNewTheme() {
    const router = useRouter();

    const [selectedPreset, setSelectedPreset] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [themeJSON, setThemeJSON] = useState("");
    const fileInputRef = useRef<HTMLInputElement>();
    useAsyncEffect(async () => {
        if (!selectedFile) return;
        setThemeJSON(await selectedFile.text());
    }, [selectedFile]);
    const validateTimeout = useRef<NodeJS.Timeout | null>(null);
    const [validationError, setValidationError] = useState<string[]>([]);
    useEffect(() => {
        if (validateTimeout.current) {
            clearTimeout(validateTimeout.current);
            validateTimeout.current = null;
        }
        validateTimeout.current = setTimeout(() => {
            let raw: any;
            try {
                raw = JSON.parse(themeJSON);
            } catch (err) {
                setValidationError([`Invalid JSON: ${err}`]);
                return;
            }

            try {
                ThemeDataSchema.parse(raw);
                setValidationError([]);
            } catch (err) {
                console.error("Error reading file", err);
                if (err instanceof ZodError) {
                    setValidationError(
                        err.errors.map((it) => {
                            return `${it.path.join(
                                ".",
                            )}: Invalid Value "${getPath(
                                raw,
                                it.path.join("."),
                            )}" - ${it.message} (${(it as any).validation}: ${
                                it.code
                            })`;
                        }),
                    );
                } else {
                    setValidationError([
                        `Something went wrong reading theme file ${err}`,
                    ]);
                }
                return;
            }
        }, 200);
    }, [themeJSON]);

    const [copyWin, setCopyWin] = useState(false);
    const [copyLinux, setCopyLinux] = useState(false);
    const [copyMac, setCopyMac] = useState(false);

    const [editThemeOpen, setEditThemeOpen] = useState(false);

    return (
        <div className="pt-2 overflow-auto">
            {/*<div className="flex items-center space-x-2">*/}
            <h2 className="col-span-2 text-xl font-semibold my-2">
                Use Chatterino Theme as template
            </h2>
            <p className="text-sm text-gray-500 mb-2">
                Get started by creating theme based on Chatterino default
                themes.
            </p>
            <div className="flex flex-wrap space-x-4">
                {["light", "dark", "white", "black"].map((it) => (
                    <div key={it} className="flex-1">
                        <button
                            className={clsx(
                                "w-full py-3 rounded-md border font-mono",
                                "hover:bg-gray-400 hover:text-gray-100 hover:border-gray-100 hover",
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

            {["light", "dark", "white", "black"].includes(selectedPreset) && (
                <button
                    className={clsx(
                        "w-full mt-4 py-3 rounded-md border text-base font-bold",
                        "hover:bg-blue-500 hover:text-blue-100 hover:border-blue-100 ",
                        "bg-blue-700 text-blue-100 border-blue-100",
                        "disabled:bg-blue-100 disabled:text-blue-700 disabled:border-blue-700 disabled:opacity-25",
                    )}
                    disabled={
                        !selectedPreset ||
                        (selectedPreset == "custom" && selectedFile == null)
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
                        }
                    }}
                >
                    Create New Theme!
                </button>
            )}

            <h2
                className="col-span-2 text-xl font-semibold my-2 mt-12"
                role="button"
                onClick={() => {
                    setSelectedPreset("custom");
                    setEditThemeOpen(true);
                }}
            >
                Import Your Theme
                <BsChevronRight className="ml-2 inline-block" />
            </h2>
            <p className="text-sm text-gray-500">
                If you already have theme JSON file, you can import it and edit
                inside the app.
            </p>

            <Modal
                open={editThemeOpen}
                title={<div className="text-xl font-bold">Import Theme</div>}
                width="100%"
                className="max-w-3xl"
                onCancel={() => setEditThemeOpen(false)}
                footer={
                    <div className="w-full flex justify-end">
                        <button
                            className={clsx(
                                "w-full mt-2 py-3 rounded-md border text-lg leading-none font-bold",
                                "hover:bg-blue-500 hover:text-blue-100 hover:border-blue-100 ",
                                "bg-blue-700 text-blue-100 border-blue-100",
                                "disabled:bg-blue-100 disabled:text-blue-700 disabled:border-blue-700 disabled:opacity-25",
                            )}
                            disabled={!themeJSON || validationError.length != 0}
                            onClick={() => {
                                const raw = JSON.parse(themeJSON);
                                const themeId = createAndSaveTheme(
                                    ThemeDataSchema.parse(qt2css(raw)),
                                );
                                router.push("edit/" + themeId);
                            }}
                        >
                            Import
                        </button>
                    </div>
                }
            >
                <div className="font-bold text-base mt-3">
                    Browse for Theme JSON file:
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        className={clsx(
                            "w-full py-2 px-5 rounded-md border font-mono",
                            "hover:bg-gray-400 hover:text-gray-100 hover:border-gray-100 hover",
                            selectedPreset == "custom"
                                ? "bg-gray-700 text-gray-100 border-gray-100 "
                                : "bg-gray-100 text-gray-700 border-gray-700 ",
                        )}
                        onClick={() => {
                            setSelectedPreset("custom");
                            fileInputRef.current?.click();
                        }}
                    >
                        Upload theme JSON file
                    </button>

                    {selectedPreset == "custom" && selectedFile == null && (
                        <p className="my-1 text-red-500 flex-shrink-0">
                            {" "}
                            Please select a file{" "}
                        </p>
                    )}
                    {selectedPreset == "custom" && selectedFile && (
                        <p className="flex-shrink-0">
                            <strong>{selectedFile.name}</strong> selected
                        </p>
                    )}

                    {/*hidden input*/}
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

                <div className="align-middle">
                    <span className="text-gray-500 text-sm pt-2">
                        {" "}
                        Theme files are located in <code>Themes</code> folder
                        inside{" "}
                        <a
                            href="https://wiki.chatterino.com/Settings/#where-is-my-chatterino-folder-located"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500"
                        >
                            {" "}
                            Chatterino folder
                        </a>
                    </span>
                    <IconButton
                        outerClass="inline-block"
                        tooltip="Copy path (windows)"
                        onClick={async () => {
                            setCopyWin(true);
                            setTimeout(() => setCopyWin(false), 500);
                            await navigator.clipboard.writeText(
                                "%APPDATA%/Chatterino2",
                            );
                        }}
                    >
                        {copyWin ? (
                            <MdCheckCircle className="text-green-500" />
                        ) : (
                            <AiFillWindows />
                        )}
                    </IconButton>
                    <IconButton
                        outerClass="inline-block"
                        tooltip="Copy path (Linux)"
                        onClick={async () => {
                            setCopyLinux(true);
                            setTimeout(() => setCopyLinux(false), 500);
                            await navigator.clipboard.writeText(
                                "~/.local/share/chatterino",
                            );
                        }}
                    >
                        {copyLinux ? (
                            <MdCheckCircle className="text-green-500" />
                        ) : (
                            <FaLinux />
                        )}
                    </IconButton>
                    <IconButton
                        outerClass="inline-block"
                        tooltip="Copy path (macOS)"
                        onClick={async () => {
                            setCopyMac(true);
                            setTimeout(() => setCopyMac(false), 500);
                            await navigator.clipboard.writeText(
                                "~/Library/Application Support/chatterino",
                            );
                        }}
                    >
                        {copyMac ? (
                            <MdCheckCircle className="text-green-500" />
                        ) : (
                            <AiFillApple />
                        )}
                    </IconButton>
                </div>
                <div className="font-bold text-sm mt-3">Theme Data</div>
                <p className="text-gray-500">
                    You can directly paste JSON here, or make correction if your
                    file is invalid.
                </p>
                <textarea
                    value={themeJSON}
                    onChange={(e) => setThemeJSON(e.target.value)}
                    className="w-full h-[30vh] p-2 border border-gray-500 rounded-md font-mono"
                />

                {validationError.length != 0 && (
                    <div className="text-red-500">
                        <div className="text-base font-bold">
                            {" "}
                            Invalid theme:{" "}
                        </div>
                        <ul className="text-sm list-disc ">
                            {validationError.map((err, idx) => (
                                <li key={idx}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </Modal>
        </div>
    );
}
