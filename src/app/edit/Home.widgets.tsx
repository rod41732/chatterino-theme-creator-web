import { ThemeData, useConfigContext } from "@/app/edit/color-context-provider";
import { Button, Checkbox, Modal } from "antd";
import { css2qt, qt2css } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
    CHATTERINO_BLACK_THEME,
    CHATTERINO_DARK_THEME,
    CHATTERINO_LIGHT_THEME,
    CHATTERINO_WHITE_THEME,
} from "@/resources";
import { produce } from "immer";
import { createAndSaveTheme, saveTheme } from "@/lib/create-theme";
import { useRouter } from "next/navigation";
import { useThemeCreatorState } from "@/app/edit/settings-context-provider";

/** create theme modal */
export function ThemeModal({
    isOpen,
    setOpen,
}: {
    isOpen: boolean;
    setOpen: (v: boolean) => void;
}) {
    const router = useRouter();
    const [selectedPreset, setSelectedPreset] = useState("dark");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>();
    return (
        <Modal
            open={isOpen}
            afterOpenChange={(v) => setOpen(v)}
            okButtonProps={{
                type: "default",
            }}
            onOk={() => {
                switch (selectedPreset) {
                    case "light": {
                        const themeId = createAndSaveTheme(
                            CHATTERINO_LIGHT_THEME,
                        );
                        router.push("/edit/" + themeId);
                        break;
                    }
                    case "dark": {
                        const themeId = createAndSaveTheme(
                            CHATTERINO_DARK_THEME,
                        );
                        router.push("/edit/" + themeId);
                        break;
                    }
                    case "white": {
                        const themeId = createAndSaveTheme(
                            CHATTERINO_WHITE_THEME,
                        );
                        router.push("/edit/" + themeId);
                        break;
                    }
                    case "black": {
                        const themeId = createAndSaveTheme(
                            CHATTERINO_BLACK_THEME,
                        );
                        router.push("/edit/" + themeId);
                        break;
                    }
                    case "custom":
                        if (!selectedFile) {
                            alert("No file selected!");
                            return;
                        }
                        selectedFile
                            .text()
                            .then((res) => {
                                // TODO: extra no validation
                                const theme = JSON.parse(res) as ThemeData;
                                const convertedTheme = qt2css(theme);
                                const themeId =
                                    createAndSaveTheme(convertedTheme);
                                router.push("/edit/" + themeId);
                            })
                            .catch((err) => {
                                console.error("Error reading file", err);
                                alert("Error reading file: " + err.message);
                            });
                }
                setOpen(false);
            }}
            onCancel={() => setOpen(false)}
        >
            <h1 className="col-span-2 text-xl font-bold"> New Theme </h1>
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
        </Modal>
    );
}

const listener: (e: BeforeUnloadEvent) => void = (e) => {
    e.preventDefault();
    e.returnValue = "";
};
export function ThemeButtons({ themeId }: { themeId: string }) {
    const { state, setState } = useThemeCreatorState();

    const { data } = useConfigContext();
    const [isOpen, setOpen] = useState(false);
    const [saved, setSaved] = useState(false);

    const setWarnUnsavedChanges = useCallback(
        (newValue: boolean) => {
            setState((old) => {
                return produce(old, (draft) => {
                    draft.warnUnsavedChanges = newValue;
                });
            });
        },
        [setState],
    );
    const lastData = useRef<ThemeData | null>(null);
    useEffect(() => {
        if (lastData.current == null) {
            lastData.current = data;
            return;
        }
        if (lastData.current != data) {
            setState((old) => ({ ...old, hasChange: true }));
        }
    }, [data, setState]);

    // not sure if this is the best place to put
    useEffect(() => {
        if (state.hasChange && state.warnUnsavedChanges) {
            window.addEventListener("beforeunload", listener, {
                capture: true,
            });
        } else {
            window.removeEventListener("beforeunload", listener, {
                capture: true,
            });
        }
    }, [state]);

    return (
        data && (
            <>
                <div className="flex-grow"></div>
                <p className="text-sm text-gray-500">
                    {state.hasChange ? "Unsaved changes" : "No changes"}
                </p>
                <Button
                    type="primary"
                    className="border-gray-200 text-gray-800 font-bold"
                    onClick={() => setOpen(true)}
                >
                    New
                </Button>
                <label className="flex items-center space-x-2 text-sm text-gray-700">
                    <Checkbox
                        checked={state.warnUnsavedChanges}
                        onChange={(e) =>
                            setWarnUnsavedChanges(e.target.checked)
                        }
                    />
                    <p> Confirm Before Leave </p>
                </label>
                <Button
                    type="primary"
                    className={clsx(
                        "font-bold",
                        "hover:border-gray-800 hover:bg-gray-800 hover:text-gray-200",
                        saved
                            ? "border-gray-800 bg-gray-800 text-gray-200"
                            : "border-gray-200 text-gray-800 bg-white",
                    )}
                    onClick={() => {
                        setSaved(true);
                        setState((cur) => ({ ...cur, hasChange: false }));
                        setTimeout(() => {
                            setSaved(false);
                        }, 500);
                        saveTheme(themeId, data);
                    }}
                >
                    {saved ? "Saved!" : "Save"}
                </Button>
                <ExportButton />
                <ThemeModal isOpen={isOpen} setOpen={setOpen} />
            </>
        )
    );
}

function downloadFile(text: string, fileName: string) {
    const a = document.createElement("a");
    a.href = "data:text/plan;charset=utf-8," + encodeURIComponent(text);
    a.download = fileName;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function ExportButton() {
    const { data } = useConfigContext();
    return (
        <Button
            className="border-gray-200 text-gray-800 bg"
            onClick={() => {
                if (!data) {
                    alert("No theme data!");
                    return;
                }
                downloadFile(JSON.stringify(css2qt(data)), "theme.json");
            }}
        >
            {" "}
            Export{" "}
        </Button>
    );
}
