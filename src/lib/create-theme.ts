import { getLocalStorage } from "@/lib/local-storage";
import { ThemeData } from "@/app/edit/color-scheme.types";
export function getThemeKey(themeId: string): string {
    return "theme-" + themeId;
}

export function createAndSaveTheme(theme: ThemeData): string {
    const themeId = "local-" + btoa(Math.random().toString()).slice(5, 12);
    saveTheme(themeId, theme);
    return themeId;
}

export function saveTheme(themeId: string, theme: ThemeData) {
    getLocalStorage().setItem(getThemeKey(themeId), JSON.stringify(theme));
}
