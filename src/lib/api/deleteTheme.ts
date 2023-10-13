export async function deleteTheme(themeId: number): Promise<void> {
    await fetch("/api/themes/delete", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ id: themeId }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
            console.error(`Failed to delete theme: ${res.status}`, data);
            throw new Error(`Failed to delete theme: ${res.status}`);
        }
        return;
    });
}
