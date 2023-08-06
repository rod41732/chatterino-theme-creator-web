import clsx from "clsx";
import {
    CHATTERINO_BLACK_THEME,
    CHATTERINO_DARK_THEME,
    CHATTERINO_LIGHT_THEME,
    CHATTERINO_WHITE_THEME,
} from "@/resources";
import { ThemeData } from "@/app/edit/color-context-provider";
import { qt2css } from "@/utils";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { EditorFooter } from "@/app/create/EdtiorFooter";
import { createAndSaveTheme } from "@/lib/create-theme";

export function Splash() {
    const router = useRouter();

    const [selectedPreset, setSelectedPreset] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>();

    return (
        <>
            <div className="px-4 border-b border-b-gray-200 flex-shrink-0 flex items-center space-x-2">
                <div className="text-2xl font-bold py-2">
                    Chatterino Theme Creator
                </div>
                {/*<ThemeButtons />*/}
            </div>
            <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-center h-full w-full">
                    <div className="w-full max-w-xl">
                        <h1 className="col-span-2 text-3xl font-bold">
                            Create Your first Chatterino Theme
                        </h1>
                        <hr className="my-4" />
                        {/*<div className="flex items-center space-x-2">*/}
                        <h2 className="col-span-2 text-base font-semibold my-4">
                            Based on Chatterino Theme ...
                        </h2>
                        <div className="space-y-2">
                            {["light", "dark", "white", "black"].map((it) => (
                                <button
                                    key={it}
                                    className={clsx(
                                        "w-full py-4 rounded-md border font-mono",
                                        selectedPreset == it
                                            ? "bg-gray-700 text-gray-100 border-gray-100 "
                                            : "bg-gray-100 text-gray-700 border-gray-700 ",
                                    )}
                                    onClick={() => setSelectedPreset(it)}
                                >
                                    {it.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        <h2 className="col-span-2 text-base font-semibold my-4">
                            Import from your existing theme
                        </h2>
                        <div className="space-y-2">
                            <button
                                className={clsx(
                                    "w-full py-4 rounded-md border font-mono",
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
                                "w-full py-4 rounded-md border font-mono my-8",
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
                            Create theme
                        </button>
                    </div>
                </div>
            </div>
            <EditorFooter />
        </>
    );
}
