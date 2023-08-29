import { useEditorState } from "@/app/edit/EditorStateContextProvider";
import { ThemeData, useConfigContext } from "@/app/edit/ThemeContextProvider";
import { Checkbox, Dropdown, MenuProps, Modal } from "antd";
import { produce } from "immer";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdKeyboard, MdMoreVert, MdVisibility } from "react-icons/md";
import { UserBadge } from "@/app/components/UserBadge";
import { IconButton } from "@/app/components/IconButton";

/** buttons that control theme new/edit/export */
export function ThemeEditorButton() {
    const pathName = usePathname();
    const router = useRouter();
    const { state, setState } = useEditorState();

    const { data } = useConfigContext();

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

    const [shortcutOpen, setShortcutOpen] = useState(false);

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
                onClick={() => {
                    router.push(pathName + "?preview");
                }}
                tooltip="Preview"
            >
                <MdVisibility />
            </IconButton>
            <IconButton
                onClick={() => setShortcutOpen(true)}
                tooltip="Keyboard Shortcuts"
            >
                <MdKeyboard />
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
            <UserBadge />
        </>
    );
}
