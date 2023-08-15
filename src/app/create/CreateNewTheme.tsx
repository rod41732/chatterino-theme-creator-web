import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import clsx from "clsx";
import { createAndSaveTheme } from "@/lib/create-theme";
import {
    CHATTERINO_BLACK_THEME,
    CHATTERINO_DARK_THEME,
    CHATTERINO_LIGHT_THEME,
    CHATTERINO_WHITE_THEME,
} from "@/resources";
import { ThemeData } from "@/app/edit/ThemeContextProvider";
import { qt2css } from "@/utils";

export function CreateNewTheme() {
    const router = useRouter();

    const [selectedPreset, setSelectedPreset] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>();

    return (
        <div className="pt-6 overflow-auto">
            {/*<div className="flex items-center space-x-2">*/}
            <h2 className="col-span-2 text-base font-semibold my-4">
                Use Chatterino Theme as template
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
                ... Or upload theme file to edit
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
                {selectedPreset == "custom" && selectedFile == null && (
                    <p className="my-1 text-red-500"> Please select a file </p>
                )}
                {selectedPreset == "custom" && selectedFile && (
                    <p>
                        <strong>{selectedFile.name}</strong> selected
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
                        case "custom": {
                            if (!selectedFile) {
                                alert("No file selected!");
                                return;
                            }
                            selectedFile
                                .text()
                                .then((res) => {
                                    // TODO: extra no validation
                                    const theme = JSON.parse(res) as ThemeData;

                                    const themeId = createAndSaveTheme(
                                        qt2css(theme),
                                    );
                                    router.push("edit/" + themeId);
                                })
                                .catch((err) => {
                                    console.error("Error reading file", err);
                                    alert("Error reading file: " + err.message);
                                });
                            break;
                        }
                    }
                }}
            >
                Create new theme
            </button>
        </div>
    );
}
