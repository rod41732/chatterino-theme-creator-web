import { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { ApiResponse } from "@/lib/type";
import { Theme } from "@/lib/db/theme";
import { GalleryThemePreview } from "@/app/gallery/GalleryThemePreview";
import { ThemeEntryWithOwner } from "@/app/gallery/types";

function localStorageKeys(): string[] {
    return Array(localStorage.length)
        .fill(0)
        .map((_, idx) => localStorage.key(idx)!);
}

export function ThemeGalleryList() {
    const [themes, setThemes] = useState<ThemeEntryWithOwner[]>([]);

    useEffect(() => {
        fetch("/api/themes/all", {
            // credentials: "include",
        }).then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                console.error(`Error getting all themes`, res.status, data);
                return;
            }
            const themes = (data as ApiResponse<Theme[]>).data.map(
                (it): ThemeEntryWithOwner => {
                    return {
                        id: "remote-" + it.id,
                        data: it.data,
                        owner: it.owner!,
                    };
                },
            );
            console.log("Got", themes.length, "remote themes");
            setThemes(themes);
        });
    }, []);

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
                    {themes.map((theme) => {
                        return (
                            <GalleryThemePreview theme={theme} key={theme.id} />
                        );
                    })}
                    {themes.length == 0 && (
                        <div className="flex flex-col items-center justify-center my-4 text-gray-500 text-lg">
                            <HiXMark className="text-2xl" />
                            <p>
                                There is no theme in the gallery, FeelsBadMan.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
