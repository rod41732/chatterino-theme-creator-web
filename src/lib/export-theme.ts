export function downloadFile(text: string, fileName: string) {
    const a = document.createElement("a");
    a.href = "data:text/plan;charset=utf-8," + encodeURIComponent(text);
    a.download = fileName;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export async function copyToClipboard(text: string): Promise<void> {
    await navigator.clipboard.writeText(text);
}
