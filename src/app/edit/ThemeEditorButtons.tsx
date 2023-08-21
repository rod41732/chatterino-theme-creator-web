import { ChatterinoAllPreviews } from "@/app/edit/ColorApp.constants";
import { useEditorState } from "@/app/edit/EditorStateContextProvider";
import { ThemeData, useConfigContext } from "@/app/edit/ThemeContextProvider";
import { Theme } from "@/db/theme";
import { getThemeKey, saveTheme } from "@/lib/create-theme";
import { ApiResponse } from "@/lib/type";
import { css2qt } from "@/utils";
import { Button, Checkbox, Modal } from "antd";
import clsx from "clsx";
import { produce } from "immer";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const confirmBeforeLeaveListener: (e: BeforeUnloadEvent) => void = (e) => {
    e.preventDefault();
    e.returnValue = "";
};

/** buttons that control theme new/edit/export */
export function ThemeEditorButton({ themeId }: { themeId: string }) {
    const router = useRouter();
    const { state, setState } = useEditorState();

    const { data } = useConfigContext();
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
            window.addEventListener(
                "beforeunload",
                confirmBeforeLeaveListener,
                {
                    capture: true,
                },
            );
        } else {
            window.removeEventListener(
                "beforeunload",
                confirmBeforeLeaveListener,
                {
                    capture: true,
                },
            );
        }
    }, [state]);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [shortcutOpen, setShortcutOpen] = useState(false);

    return (
        <>
            <Modal
                width="80%"
                wrapClassName="p-4"
                open={previewOpen}
                onCancel={() => setPreviewOpen(false)}
                footer={null}
            >
                <div
                    style={{
                        // antd built-in padding top of 107px
                        height: "calc(100vh - 214px)",
                    }}
                >
                    <ChatterinoAllPreviews />
                </div>
            </Modal>
            <Modal
                title="Keyboard Shortcuts"
                open={shortcutOpen}
                onCancel={() => setShortcutOpen(false)}
                footer={null}
            >
                <h2 className="font-semibold mb-2">
                    {" "}
                    While hovering over color picker:{" "}
                </h2>
                <div
                    className="grid gap-y-2"
                    style={{
                        gridTemplateColumns: "auto 1fr",
                    }}
                >
                    <kbd className="font-mono px-1 border-gray-300 border rounded-sm mr-2">
                        {" "}
                        c{" "}
                    </kbd>
                    <p> Copy picker&#39;s color to clipboard</p>

                    <kbd className="font-mono px-1 border-gray-300 border rounded-sm mr-2">
                        {" "}
                        v{" "}
                    </kbd>
                    <p> Paste clipboard&#39;s color into picker</p>

                    <kbd className="font-mono px-1 border-gray-300 border rounded-sm mr-2">
                        {" "}
                        z{" "}
                    </kbd>
                    <p> &quot;Undo&quot; picker&#39;s color change </p>
                </div>
            </Modal>
            <div className="flex-grow"></div>
            <Button
                type="primary"
                className="border-gray-200 text-gray-800 bg"
                onClick={() => setShortcutOpen(true)}
            >
                Keyboard Shortcuts
            </Button>
            <Button
                type="primary"
                className="border-gray-200 text-gray-800 bg"
                onClick={() => setPreviewOpen(true)}
            >
                Preview all
            </Button>
            <p className="text-sm text-gray-500">
                {state.hasChange ? "Unsaved changes" : "No changes"}
            </p>
            <Button
                type="primary"
                className="border-gray-200 text-gray-800 font-bold"
                onClick={() => {
                    const ok =
                        state.warnUnsavedChanges && state.hasChange
                            ? window.confirm("Leave with saving?")
                            : true;
                    if (ok) {
                        router.push("/create");
                    }
                }}
            >
                New
            </Button>
            <label className="flex items-center space-x-2 text-sm text-gray-700">
                <Checkbox
                    checked={state.warnUnsavedChanges}
                    onChange={(e) => setWarnUnsavedChanges(e.target.checked)}
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
                    if (themeId.startsWith("remote-")) {
                        const id = +themeId.slice("remote-".length);
                        fetch("/api/themes/update-by-id", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ id: id, data: data }),
                            credentials: "include",
                        })
                            .then(() => {
                                console.log("saved ");
                                alert("Saved API");
                            })
                            .catch((err) => {
                                console.error(`Error update theme ${id}`, err);
                                alert("Error!");
                            });
                    }
                }}
            >
                {saved ? "Saved!" : "Save"}
            </Button>
            {themeId.startsWith("local-") && (
                <Button
                    onClick={() => {
                        uploadTheme(data).then((createdTheme) => {
                            localStorage.removeItem(getThemeKey(themeId));
                            saveTheme(
                                "remote-" + createdTheme.id,
                                createdTheme.data,
                            );
                            router.push(`/edit/remote-${createdTheme.id}`);
                        });
                    }}
                >
                    Upload
                </Button>
            )}
            <ExportButton />
        </>
    );
}

async function uploadTheme(theme: ThemeData): Promise<Theme> {
    console.log("xd", JSON.stringify(theme));
    const res = await fetch("/api/themes/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(theme),
    }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
            console.error("Failed to upload theme", res.status, data);
            throw new Error(`Failed to upload theme (${res.status})`);
        }
        return data as ApiResponse<Theme>;
    });
    return res.data;
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
