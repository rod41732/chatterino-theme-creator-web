import { useEffect, useMemo, useState } from "react";
import { ApiResponse, ThemeEntry } from "@/lib/type";
import { Theme } from "@/lib/db/theme";
import { UserThemePreview } from "@/app/my-themes/UserThemePreview";
import { produce } from "immer";
import { createAndSaveTheme, getThemeKey } from "@/lib/create-theme";
import { uploadTheme } from "@/lib/api/upload-theme";
import { Button } from "antd";
import { useRouter } from "next/navigation";

function localStorageKeys(): string[] {
    return Array(localStorage.length)
        .fill(0)
        .map((_, idx) => localStorage.key(idx)!);
}

function listThemes() {
    return localStorageKeys()
        .filter((it) => it.startsWith("theme-"))
        .map((it): ThemeEntry | null => {
            try {
                return {
                    id: it.slice("theme-".length),
                    data: JSON.parse(localStorage.getItem(it)!),
                };
            } catch (err) {
                console.warn("Error parsing theme from key", it, err);
                return null;
            }
        })
        .filter((it): it is ThemeEntry => it != null);
}

function uniqueBy<T>(items: T[], keyFunc: (v: T) => string): T[] {
    const keys = new Set<string>();
    const uniqueArray: T[] = [];
    items.forEach((it) => {
        const key = keyFunc(it);
        if (keys.has(key)) return;
        keys.add(key);
        uniqueArray.push(it);
    });
    return uniqueArray;
}

export function UserThemeList() {
    const router = useRouter();

    const [localThemes, setLocalThemes] = useState<ThemeEntry[] | null>(null);
    const [remoteThemes, setRemoteThemes] = useState<ThemeEntry[] | null>(null);

    // trigger to load theme
    const [remoteTrigger, setRemoteTrigger] = useState(0);
    const [localTrigger, setLocalTrigger] = useState(0);

    useEffect(() => {
        setLocalThemes(listThemes());
    }, [localTrigger]);

    useEffect(() => {
        fetch("/api/themes/mine", {
            credentials: "include",
        }).then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                console.error(`Error getting owned themes`, res.status, data);
                setRemoteThemes([]);
                return;
            }
            const themes = (data as ApiResponse<Theme[]>).data.map(
                (it): ThemeEntry => {
                    return {
                        id: "remote-" + it.id,
                        data: it.data,
                    };
                },
            );
            console.log("Got", themes.length, "remote themes");
            setRemoteThemes(themes);
        });
    }, [remoteTrigger]);
    const allThemes: ThemeEntry[] | null = useMemo(
        () =>
            localThemes && remoteThemes
                ? uniqueBy([...localThemes, ...remoteThemes], (it) => it.id)
                : null,
        [localThemes, remoteThemes],
    );

    return (
        <div className="h-full overflow-hidden flex flex-col px-4 py-2">
            <p>
                This list your created themes, you can edit, duplicate or delete
                them.
            </p>
            {allThemes ? (
                <div className="flex-1 overflow-auto">
                    {allThemes.length > 0 ? (
                        <div
                            className="grid w-full"
                            style={{
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(300px, 1fr))",
                            }}
                        >
                            {allThemes.map((theme) => {
                                return (
                                    <UserThemePreview
                                        theme={theme}
                                        key={theme.id}
                                        onDelete={() => {
                                            const confirm =
                                                window.confirm(
                                                    "Delete this theme?",
                                                );
                                            if (confirm) {
                                                localStorage.removeItem(
                                                    "theme-" + theme.id,
                                                );
                                                setLocalThemes(listThemes());
                                            }
                                        }}
                                        onUpload={async () => {
                                            await uploadTheme(theme.data);
                                            // remove local version once theme is uploaded
                                            localStorage.removeItem(
                                                getThemeKey(theme.id),
                                            );

                                            setLocalTrigger(Math.random());
                                            setRemoteTrigger(Math.random());
                                        }}
                                        onDuplicate={() => {
                                            const dataCopy = produce(
                                                theme.data,
                                                (draft) => {
                                                    draft.ctcMeta.name +=
                                                        " Copy";
                                                },
                                            );
                                            createAndSaveTheme(dataCopy);
                                            setLocalTrigger(Math.random());
                                        }}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col h-full items-center justify-center text-gray-500 text-lg">
                            <p className="mb-4">No themes created yet. </p>
                            <Button
                                onClick={async () => {
                                    await router.push("/create");
                                }}
                            >
                                {" "}
                                Create Theme{" "}
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex-1 overflow-hidden flex flex-col items-center justify-center">
                    <img src="/dankCircle.webp" width="64" height="64" />
                    <p> Loading ... </p>
                </div>
            )}
        </div>
    );
}
