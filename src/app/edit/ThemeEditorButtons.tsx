import { ChatterinoAllPreviews } from "@/app/edit/ColorApp.constants";
import { useEditorState } from "@/app/edit/EditorStateContextProvider";
import { ThemeData, useConfigContext } from "@/app/edit/ThemeContextProvider";
import { getThemeKey, saveTheme } from "@/lib/create-theme";
import { css2qt } from "@/utils";
import { Checkbox, Dropdown, MenuProps, Modal } from "antd";
import { produce } from "immer";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    MdAddCircleOutline,
    MdCheck,
    MdCloudUpload,
    MdDownload,
    MdKeyboard,
    MdMoreVert,
    MdSave,
    MdVisibility,
} from "react-icons/md";
import { UserBadge } from "@/app/components/UserBadge";
import { useGlobalState } from "@/app/GlobalContext";
import { IconButton } from "@/app/components/IconButton";
import { uploadTheme } from "@/lib/api/upload-theme";

const confirmBeforeLeaveListener: (e: BeforeUnloadEvent) => void = (e) => {
    e.preventDefault();
    e.returnValue = "";
};

/** buttons that control theme new/edit/export */
export function ThemeEditorButton({ themeId }: { themeId: string }) {
    const pathName = usePathname();
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

    const [shortcutOpen, setShortcutOpen] = useState(false);

    const {
        state: { auth },
    } = useGlobalState();

    return (
        <>
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
            <IconButton
                onClick={() => setShortcutOpen(true)}
                tooltip="Keyboard Shortcuts"
            >
                <MdKeyboard />
            </IconButton>
            <IconButton
                onClick={() => {
                    const ok =
                        state.warnUnsavedChanges && state.hasChange
                            ? window.confirm("Leave with saving?")
                            : true;
                    if (ok) {
                        router.push("/create");
                    }
                }}
                tooltip="Create new theme"
            >
                <MdAddCircleOutline />
            </IconButton>
            <Dropdown
                menu={{
                    items: [
                        {
                            key: "save",
                            label: (
                                <label className="flex items-center space-x-2 text-sm text-gray-700">
                                    <Checkbox
                                        checked={state.warnUnsavedChanges}
                                        onChange={(e) =>
                                            setWarnUnsavedChanges(
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    <p> Confirm Before Leave </p>
                                </label>
                            ),
                        },
                    ] satisfies MenuProps["items"],
                }}
            >
                {/*<IconButton>*/}
                <div
                    className={
                        "border-gray-200 text-gray-800 bg hover:bg-gray-500/20 transition-colors p-2 rounded-full text-xl cursor-pointer"
                    }
                >
                    <MdMoreVert />
                </div>
            </Dropdown>
            <IconButton
                tooltip="Save changes"
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
                            })
                            .catch((err) => {
                                console.error(`Error update theme ${id}`, err);
                                alert("Error!");
                            });
                    }
                }}
                disabled={!state.hasChange}
            >
                {saved ? <MdCheck className="text-green-500" /> : <MdSave />}
            </IconButton>
            {themeId.startsWith("local-") && (
                <IconButton
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
                    tooltip={
                        auth?.authorized
                            ? "Upload to Theme Library."
                            : "Login to Upload to Theme Library."
                    }
                    disabled={!auth?.authorized}
                >
                    <MdCloudUpload />
                </IconButton>
            )}
            <ExportButton />

            <IconButton
                onClick={() => {
                    router.push(pathName + "?preview");
                }}
                tooltip="Preview"
            >
                <MdVisibility />
            </IconButton>
            <UserBadge />
        </>
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
        <IconButton
            tooltip="Download Theme"
            onClick={() => {
                if (!data) {
                    alert("No theme data!");
                    return;
                }
                downloadFile(JSON.stringify(css2qt(data)), "theme.json");
            }}
        >
            <MdDownload />
        </IconButton>
    );
}
