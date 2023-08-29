const NULL_STORAGE: Storage = {
    getItem(key: string): string | null {
        return null;
    },
    key(index: number): string | null {
        return null;
    },
    length: 0,
    removeItem(key: string): void {},
    setItem(key: string, value: string): void {},
    clear(): void {},
};
export function getLocalStorage(): Storage {
    if (typeof localStorage != "undefined") return localStorage;
    return NULL_STORAGE;
}
