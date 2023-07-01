import { ColorPickerWrapper } from "@/app/settings/messageSettings";
import { ThemeData, useConfigContext } from "@/app/color-context-provider";
import { useCallback, useRef, useState } from "react";
import { produce } from "immer";
import { Radio } from "antd";
import clsx from "clsx";
import {
    CHATTERINO_BLACK_THEME,
    CHATTERINO_DARK_THEME,
    CHATTERINO_LIGHT_THEME,
    CHATTERINO_WHITE_THEME,
} from "@/resources";
import { css2qt, qt2css } from "@/utils";

function downloadFile(text: string, fileName: string) {
    const a = document.createElement("a");
    a.href = "data:text/plan;charset=utf-8," + encodeURIComponent(text);
    a.download = fileName;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.removeChild(a);
}

export function OverviewSettings() {
    const { data, setData } = useConfigContext();
    const iconTheme = data.metadata.iconTheme;
    const setIconTheme = useCallback(
        (color: "light" | "dark") => {
            setData((cur) =>
                produce(cur, (draft) => {
                    draft.metadata.iconTheme = color;
                })
            );
        },
        [setData]
    );
    const [selectedPreset, setSelectedPreset] = useState("dark");
    const fileInputRef = useRef<HTMLInputElement>();

    return (
        <div className="">
            <h1 className="col-span-2"> start here </h1>
            {/*<div className="flex items-center space-x-2">*/}
            <div className="flex space-x-2">
                {["light", "dark", "white", "black"].map((it) => (
                    <button
                        key={it}
                        className={clsx(
                            "w-[80px] py-4 rounded-md border font-mono",
                            selectedPreset == it
                                ? "bg-gray-700 text-gray-100 border-gray-100 "
                                : "bg-gray-100 text-gray-700 border-gray-700 "
                        )}
                        onClick={() => setSelectedPreset(it)}
                    >
                        {it.toUpperCase()}
                    </button>
                ))}
                <button
                    className={clsx(
                        "w-[80px] py-4 rounded-md border font-mono",
                        selectedPreset == "custom"
                            ? "bg-gray-700 text-gray-100 border-gray-100 "
                            : "bg-gray-100 text-gray-700 border-gray-700 "
                    )}
                    onClick={() => {
                        setSelectedPreset("custom");
                        fileInputRef.current?.click();
                    }}
                >
                    CUSTOM
                </button>
                <input type="file" ref={(it) => (fileInputRef.current = it!)} />
            </div>

            <button
                className="font-mono my-2 px-2 py-1 border rounded-md"
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
                            const selectedFile =
                                fileInputRef.current?.files?.[0];
                            if (!selectedFile) {
                                alert("No file selected!");
                                return;
                            }
                            selectedFile
                                .text()
                                .then((res) => {
                                    // TODO: extra no validation
                                    const theme = JSON.parse(res) as ThemeData;
                                    setData(qt2css(theme));
                                    alert("applied: " + selectedFile.name);
                                })
                                .catch((err) => {
                                    console.error("Error reading file", err);
                                    alert("Error reading file: " + err.message);
                                });
                    }
                }}
            >
                Apply &gt;
            </button>
            {/*</div>*/}

            <button
                className="font-mono my-2 px-2 py-1 border rounded-md"
                onClick={() => {
                    downloadFile(JSON.stringify(css2qt(data)), "theme.json");
                }}
            >
                Export
            </button>

            <hr className="col-span-2" />

            <div className="text-lg font-bold col-span-2">Icon theme</div>
            <Radio.Group
                value={iconTheme}
                onChange={(e) => {
                    setIconTheme(e.target.value);
                }}
                buttonStyle="solid"
            >
                <Radio.Button value="light">Light</Radio.Button>
                <Radio.Button value="dark">Dark</Radio.Button>u
            </Radio.Group>

            <div className="text-lg font-bold col-span-2">Accent color</div>
            <ColorPickerWrapper
                mutateColor={(data, newColor) => {
                    data.colors.accent = newColor;
                }}
                getColor={(data) => data.colors.accent}
            />
            <p className="text-gray-500 col-span-2 -mt-3 mb-1">
                Used in some part
            </p>
        </div>
    );
}
