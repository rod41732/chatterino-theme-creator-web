"use client";
import { IconButton } from "@/app/components/IconButton";
import { Topbar } from "@/app/components/Topbar";
import { EditorFooter } from "@/app/create/EdtiorFooter";
import { ThemeNameEditor } from "@/app/edit/[id]/ThemeNameEditor";
import { ThemeData } from "@/app/edit/color-scheme.types";
import { ColorApp } from "@/app/edit/ColorApp";
import {
    EditorStateContextProvider,
    useEditorState,
} from "@/app/edit/EditorStateContextProvider";
import { TabContextProvider } from "@/app/edit/TabContextProvider";
import { useThemeContext } from "@/app/edit/ThemeContextProvider";
import { ThemeEditorButton } from "@/app/edit/ThemeEditorButtons";
import { useGlobalState } from "@/app/GlobalContext";
import { uploadTheme } from "@/lib/api/upload-theme";
import { createAndSaveTheme, getThemeKey, saveTheme } from "@/lib/create-theme";
import { downloadFile } from "@/lib/export-theme";
import { getLocalStorage } from "@/lib/local-storage";
import { css2qt } from "@/utils";
import { produce } from "immer";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiSolidDuplicate } from "react-icons/bi";
import {
    MdAddCircleOutline,
    MdCheck,
    MdCloudUpload,
    MdDownload,
    MdSave,
} from "react-icons/md";

interface RouteParams {
    params: {
        id: string;
    };
}

const confirmBeforeLeaveListener: (e: BeforeUnloadEvent) => void = (e) => {
    e.preventDefault();
    e.returnValue = "";
};
export default function EditThemePage({
    params: { id: themeId },
}: RouteParams) {
    return themeId ? (
        <EditorStateContextProvider>
            <TabContextProvider>
                <ChangeMonitor />
                <div className="h-full flex flex-col">
                    <Topbar
                        title="Theme Editor"
                        leftComponents={
                            <div className="flex items-center self-stretch">
                                <p className="mx-2 text-gray-500 text-xl">
                                    {" "}
                                    /{" "}
                                </p>
                                <ThemeNameEditor themeId={themeId} />
                                <div className="px-2"> </div>

                                <LeftButtons themeId={themeId} />
                            </div>
                        }
                        rightComponents={<ThemeEditorButton />}
                    />
                    <div className="flex-1 overflow-hidden">
                        <ColorApp />
                    </div>
                    <EditorFooter />
                </div>
            </TabContextProvider>
        </EditorStateContextProvider>
    ) : (
        <div> no theme id</div>
    );
}

function LeftButtons({ themeId }: { themeId: string }) {
    const router = useRouter();
    const { state, setState } = useEditorState();
    const [saved, setSaved] = useState(false);
    const { data } = useThemeContext();
    const {
        state: { auth },
    } = useGlobalState();
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

    const isLocal = themeId.startsWith("local-");

    // shitty Nextjs
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, []);

    const onSave = useCallback(() => {
        setSaved(true);
        setState((cur) => ({
            ...cur,
            hasChange: false,
        }));
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
                body: JSON.stringify({
                    id: id,
                    data: data,
                }),
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
    }, [themeId, data]);

    return (
        show && (
            <>
                <IconButton
                    tooltip="Save changes"
                    onClick={onSave}
                    disabled={!state.hasChange}
                >
                    {saved ? (
                        <MdCheck className="text-green-500" />
                    ) : (
                        <MdSave />
                    )}
                    {/*{JSON.stringify(state.hasChange)}*/}
                </IconButton>

                {/*upload*/}
                {isLocal && (
                    <IconButton
                        onClick={() => {
                            uploadTheme(data).then((createdTheme) => {
                                getLocalStorage().removeItem(
                                    getThemeKey(themeId),
                                );
                                saveTheme(
                                    "remote-" + createdTheme.id,
                                    createdTheme.data,
                                );
                                router.push(`/edit/remote-${createdTheme.id}`);
                            });
                        }}
                        tooltip={
                            auth?.authorized
                                ? "Upload to Theme Library"
                                : "Login to Upload to Theme Library."
                        }
                        disabled={!auth?.authorized}
                    >
                        <MdCloudUpload />
                    </IconButton>
                )}
                <IconButton
                    tooltip="Make a copy of this theme"
                    onClick={() => {
                        onSave();
                        const themeCopy = produce(data, (draft) => {
                            draft.ctcMeta.name += " Copy";
                        });
                        const themeId = createAndSaveTheme(themeCopy);
                        router.push("/edit/" + themeId);
                    }}
                >
                    <BiSolidDuplicate />
                </IconButton>

                <ExportButton themeId={themeId} />

                <IconButton
                    onClick={() => {
                        const ok =
                            state.warnUnsavedChanges && state.hasChange
                                ? window.confirm("Leave without saving?")
                                : true;
                        if (ok) {
                            router.push("/create");
                        }
                    }}
                    tooltip="Create new theme"
                >
                    <MdAddCircleOutline />
                </IconButton>
            </>
        )
    );
}

function ExportButton({ themeId }: { themeId: string }) {
    const { data } = useThemeContext();
    const idWithoutPrefix = themeId.split("-")[1];

    return (
        <IconButton
            tooltip="Download Theme"
            onClick={() => {
                downloadFile(
                    JSON.stringify(css2qt(data), null, 2),
                    idWithoutPrefix + "-" + data.ctcMeta.name + ".json",
                );
            }}
        >
            <MdDownload />
        </IconButton>
    );
}

function ChangeMonitor() {
    const { data, setData } = useThemeContext();
    const { setState } = useEditorState();
    const lastData = useRef<ThemeData | null>(null);
    useEffect(() => {
        if (lastData.current == null) {
            lastData.current = data;
            return;
        }
        if (lastData.current != data) {
            setState((old) => ({ ...old, hasChange: true }));
        }
        lastData.current = data;
    }, [data, setState]);
    useEffect(() => {
        if (!data.ctcMeta.simpleTabSettings) return;
        setData(
            produce(data, (draft) => {
                inheritColors(draft.colors.tabs.highlighted.backgrounds);
                inheritColors(draft.colors.tabs.highlighted.line);
                inheritColors(draft.colors.tabs.selected.backgrounds);
                inheritColors(draft.colors.tabs.selected.line);
                inheritColors(draft.colors.tabs.newMessage.backgrounds);
                inheritColors(draft.colors.tabs.newMessage.line);
                inheritColors(draft.colors.tabs.regular.backgrounds);
                inheritColors(draft.colors.tabs.regular.line);
            }),
        );
    }, [data, setData]);
    return <></>;
}

type ColorGroup = {
    hover: string;
    regular: string;
    unfocused: string;
};

function inheritColors(colorGroup: ColorGroup) {
    colorGroup.hover = colorGroup.regular;
    colorGroup.unfocused = colorGroup.regular;
}
