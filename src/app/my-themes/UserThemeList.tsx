import { useEffect, useMemo, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { ApiResponse } from "@/lib/type";
import { Theme } from "@/lib/db/theme";
import { ThemeEntry, ThemePreview } from "@/app/my-themes/ThemePreview";
import { produce } from "immer";
import { createAndSaveTheme, getThemeKey } from "@/lib/create-theme";
import { uploadTheme } from "@/lib/api/upload-theme";

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
    const [localThemes, setLocalThemes] = useState<ThemeEntry[]>([]);
    const [remoteThemes, setRemoteThemes] = useState<ThemeEntry[]>([]);

    // trigger to load theme
    const [remoteTrigger, setRemoteTrigger] = useState(0);
    const [localTrigger, setLocalTrigger] = useState(0);

    useEffect(() => {
        setLocalThemes(listThemes());
    }, [localTrigger]);

    useEffect(() => {
        fetch("/api/themes/mine", {
            // credentials: "include",
        }).then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                console.error(`Error getting owned themes`, res.status, data);
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
    const allThemes = useMemo(
        () => uniqueBy([...localThemes, ...remoteThemes], (it) => it.id),
        [localThemes, remoteThemes],
    );

    return (
        <div className="max-h-full overflow-hidden flex flex-col">
            <div className="text-lg font-semibold flex-shrink-0">
                Your themes
            </div>
            <p>
                This list your created themes, you can edit, duplicate or delete
                them.
            </p>
            <div className="flex-1 overflow-auto">
                <div
                    className="grid w-full"
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(300px, 1fr))",
                    }}
                >
                    {allThemes.map((theme) => {
                        return (
                            <ThemePreview
                                theme={theme}
                                key={theme.id}
                                onDelete={() => {
                                    const confirm =
                                        window.confirm("Delete this theme?");
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
                                            draft.ctcMeta.name += " Copy";
                                        },
                                    );
                                    createAndSaveTheme(dataCopy);
                                    setLocalTrigger(Math.random());
                                }}
                            />
                        );
                    })}
                    {allThemes.length == 0 && (
                        <div className="flex flex-col items-center justify-center my-4 text-gray-500 text-lg">
                            <HiXMark className="text-2xl" />
                            <p>No themes created yet, create one!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
