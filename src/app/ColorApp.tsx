import { useRef, useState } from "react";
import { ThemeData, useConfigContext } from "@/app/color-context-provider";
import clsx from "clsx";
import {
    CHATTERINO_BLACK_THEME,
    CHATTERINO_DARK_THEME,
    CHATTERINO_LIGHT_THEME,
    CHATTERINO_WHITE_THEME,
} from "@/resources";
import { qt2css } from "@/utils";
import { PREVIEW_TABS, TABS } from "@/app/ColorApp.constants";

export function ColorApp() {
    const [activeTab, setActiveTab] = useState("overview");
    const [activePreviewTab, setActivePreviewTab] = useState("chat");
    const { data, setData } = useConfigContext();

    // modal
    const [selectedPreset, setSelectedPreset] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>();

    return data ? (
        <div className="h-full overflow-hidden flex">
            {/*left col*/}
            <div className="flex-1 flex-shrink overflow-hidden">
                {/*tab bar*/}
                <div className="flex items-center overflow-x-auto border-b border-gray-200 mb-4">
                    {TABS.map((it) => (
                        <button
                            className={clsx(
                                "mx-3 py-3   min-w-[80px]",
                                "hover:text-sky-500",
                                it.key == activeTab && "text-sky-500"
                            )}
                            key={it.key}
                            onClick={() => setActiveTab(it.key)}
                        >
                            {it.label}
                        </button>
                    ))}
                </div>
                <div className="overflow-auto max-h-full">
                    {TABS.find((it) => it.key == activeTab)?.children}
                </div>
            </div>

            {/*right col*/}
            <div className="flex-1 flex-shrink overflow-hidden flex flex-col">
                {/*tab bar*/}
                <div className="flex items-center overflow-x-auto">
                    {PREVIEW_TABS.map((it) => (
                        <button
                            className={clsx(
                                "mx-3 py-3   min-w-[80px]",
                                "hover:text-sky-500",
                                it.key == activePreviewTab && "text-sky-500"
                            )}
                            key={it.key}
                            onClick={() => setActivePreviewTab(it.key)}
                        >
                            {it.label}
                        </button>
                    ))}
                </div>
                <div className="overflow-hidden relative flex-1">
                    {
                        PREVIEW_TABS.find((it) => it.key == activePreviewTab)
                            ?.children
                    }
                </div>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center h-full w-full">
            <div className="w-full max-w-[480px]">
                <h1 className="col-span-2 text-xl font-bold">
                    Create Your first Chatterino Theme
                </h1>
                <hr className="my-4" />
                {/*<div className="flex items-center space-x-2">*/}
                <h2 className="col-span-2 text-base font-semibold my-4">
                    From Chatterino Theme ...
                </h2>
                <div className="space-y-2">
                    {["light", "dark", "white", "black"].map((it) => (
                        <button
                            key={it}
                            className={clsx(
                                "w-full py-4 rounded-md border font-mono",
                                selectedPreset == it
                                    ? "bg-gray-700 text-gray-100 border-gray-100 "
                                    : "bg-gray-100 text-gray-700 border-gray-700 "
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
                                : "bg-gray-100 text-gray-700 border-gray-700 "
                        )}
                        onClick={() => {
                            setSelectedPreset("custom");
                            fileInputRef.current?.click();
                        }}
                    >
                        Choose file
                    </button>
                    {selectedPreset == "custom" && selectedFile == null && (
                        <p className="my-1 text-red-500">
                            {" "}
                            Please select a file{" "}
                        </p>
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
                        "w-full py-4 rounded-md border font-mono my-8",
                        "hover:bg-blue-500 hover:text-blue-100 hover:border-blue-100 ",
                        "bg-blue-700 text-blue-100 border-blue-100",
                        "disabled:bg-blue-100 disabled:text-blue-700 disabled:border-blue-700"
                    )}
                    disabled={
                        !selectedPreset ||
                        (selectedPreset == "custom" && selectedFile == null)
                    }
                    onClick={() => {
                        switch (selectedPreset) {
                            case "light":
                                setData(CHATTERINO_LIGHT_THEME);
                                break;
                            case "dark":
                                setData(CHATTERINO_DARK_THEME);
                                break;
                            case "white":
                                setData(CHATTERINO_WHITE_THEME);
                                break;
                            case "black":
                                setData(CHATTERINO_BLACK_THEME);
                                break;
                            case "custom":
                                if (!selectedFile) {
                                    alert("No file selected!");
                                    return;
                                }
                                selectedFile
                                    .text()
                                    .then((res) => {
                                        // TODO: extra no validation
                                        const theme = JSON.parse(
                                            res
                                        ) as ThemeData;
                                        setData(qt2css(theme));
                                    })
                                    .catch((err) => {
                                        console.error(
                                            "Error reading file",
                                            err
                                        );
                                        alert(
                                            "Error reading file: " + err.message
                                        );
                                    });
                        }
                    }}
                >
                    Create theme
                </button>
            </div>
        </div>
    );
}
