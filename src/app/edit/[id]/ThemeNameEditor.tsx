import { EditableText } from "@/app/components/EditableText";
import { useThemeContext } from "@/app/edit/ThemeContextProvider";
import { getThemeKey } from "@/lib/create-theme";
import { getLocalStorage } from "@/lib/local-storage";
import { produce } from "immer";
import { useCallback, useEffect, useState } from "react";

export function ThemeNameEditor({ themeId }: { themeId: string }) {
    const { data } = useThemeContext();
    const [localName, setLocalName] = useState("");
    useEffect(() => setLocalName(data.ctcMeta.name), [data.ctcMeta]);

    const renameTheme = useCallback(
        async (newName: string) => {
            const updatedTheme = produce(data, (draft) => {
                draft.ctcMeta.name = newName;
            });
            getLocalStorage().setItem(
                getThemeKey(themeId),
                JSON.stringify(updatedTheme),
            );
            if (themeId.startsWith("remote-")) {
                const remoteThemeId = +themeId.substring("remote-".length);

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
