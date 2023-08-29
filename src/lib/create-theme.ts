import { ThemeData } from "@/app/edit/ThemeContextProvider";
import { getLocalStorage } from "@/lib/local-storage";
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
