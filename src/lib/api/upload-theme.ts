import { ThemeData } from "@/app/edit/ThemeContextProvider";
import { Theme } from "@/lib/db/theme";
import { ApiResponse } from "@/lib/type";

export async function uploadTheme(theme: ThemeData): Promise<Theme> {
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
