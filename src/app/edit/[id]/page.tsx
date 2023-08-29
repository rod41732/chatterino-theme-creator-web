"use client";
import { TabContextProvider } from "@/app/edit/TabContextProvider";
import { useConfigContext } from "@/app/edit/ThemeContextProvider";
import { ColorApp } from "@/app/edit/ColorApp";
import { ThemeEditorButton } from "@/app/edit/ThemeEditorButtons";
import { EditorFooter } from "@/app/create/EdtiorFooter";
import {
    EditorStateContextProvider,
    useEditorState,
} from "@/app/edit/EditorStateContextProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserBadge } from "@/app/components/UserBadge";
import { ChatterinoAllPreviews } from "@/app/edit/ColorApp.constants";
import { IconButton } from "@/app/components/IconButton";
import {
    MdAddCircleOutline,
    MdCheck,
    MdCloudUpload,
    MdDownload,
    MdSave,
} from "react-icons/md";
import { getThemeKey, saveTheme } from "@/lib/create-theme";
import { produce } from "immer";
import { ColorProvider } from "@/lib/ColorProvider";
import { Topbar } from "@/app/components/Topbar";
import { EditableText } from "@/app/components/EditableText";
import { useCallback, useEffect, useState } from "react";
import { downloadFile } from "@/lib/export-theme";
import { css2qt } from "@/utils";
import { uploadTheme } from "@/lib/api/upload-theme";
import { useGlobalState } from "@/app/GlobalContext";

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
    const router = useRouter();
    const query = useSearchParams()!;
    const pathName = usePathname()!;
    const isPreview = query.has("preview");
    const { data } = useConfigContext();

    return themeId ? (
        <EditorStateContextProvider>
            <TabContextProvider>
                <div className="h-full flex flex-col">
                    <Topbar
                        title="Theme Editor"
                        leftComponents={
                            <div className="flex items-center self-stretch">
                                <p className="mx-2 text-gray-500 text-xl">
                                    {" "}
                                    /{" "}
                                </p>
                                <ThemeName themeId={themeId} />
                                <div className="px-2"> </div>

                                <LeftButtons themeId={themeId} />
                            </div>
                        }
                        rightComponents={
                            isPreview ? (
                                <>
                                    <div className="flex-1"></div>
                                    {isPreview && (
                                        <IconButton
                                            onClick={() => {
                                                // clear param
                                                router.push(pathName);
                                            }}
                                        >
                                            <p className="text-base">
                                                Back to edit
                                            </p>
                                        </IconButton>
                                    )}
                                    <UserBadge />
                                </>
                            ) : (
                                <ThemeEditorButton />
                            )
                        }
                    />
                    <div className="flex-1 overflow-hidden">
                        {isPreview ? (
                            <ColorProvider theme={data} className="h-full">
                                <ChatterinoAllPreviews />
                            </ColorProvider>
                        ) : (
                            <ColorApp />
                        )}
                    </div>
                    <EditorFooter />
                </div>
            </TabContextProvider>
        </EditorStateContextProvider>
    ) : (
        <div> no theme id</div>
    );
}

function ThemeName({ themeId }: { themeId: string }) {
    const { data, setData } = useConfigContext();
    const [localName, setLocalName] = useState("");
    useEffect(() => setLocalName(data.ctcMeta.name), [data.ctcMeta]);

    const renameTheme = useCallback(
        async (newName: string) => {
            const updatedTheme = produce(data, (draft) => {
                draft.ctcMeta.name = newName;
            });
            localStorage.setItem(
                getThemeKey(themeId),
                JSON.stringify(updatedTheme),
            );
            if (themeId.startsWith("remote-")) {
                const remoteThemeId = themeId.substring("remote-".length);

                await fetch("/api/themes/update-by-id", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: remoteThemeId,
                        data: updatedTheme,
                    }),
                    credentials: "include",
                })
                    .then(() => {
                        console.log("saved ");
                    })
                    .catch((err) => {
                        console.error(
                            `Error update theme ${remoteThemeId}`,
                            err,
                        );
                        alert("Error!");
                    });
            }
            setLocalName(newName);
        },
        [data, themeId],
    );

    return <EditableText value={localName} onChangeCommited={renameTheme} />;
}

function LeftButtons({ themeId }: { themeId: string }) {
    const router = useRouter();
    const { state, setState } = useEditorState();
    const [saved, setSaved] = useState(false);
    const { data } = useConfigContext();
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

    return (
        <>
            <IconButton
                tooltip="Save changes"
                onClick={() => {
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
                }}
                disabled={!state.hasChange}
            >
                {saved ? <MdCheck className="text-green-500" /> : <MdSave />}
            </IconButton>

            {/*upload*/}
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
    );
}

function ExportButton({ themeId }: { themeId: string }) {
    const { data } = useConfigContext();
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
