import { ThemeData } from "@/app/edit/color-context-provider";
export function getThemeKey(themeId: string): string {
    return "theme-" + themeId;
}

export function createAndSaveTheme(theme: ThemeData): string {
    const themeId = "local-" + btoa(Math.random().toString()).slice(5, 12);
    saveTheme(themeId, theme);
    return themeId;
}

export function saveTheme(themeId: string, theme: ThemeData) {
    localStorage.setItem(getThemeKey(themeId), JSON.stringify(theme));
}
