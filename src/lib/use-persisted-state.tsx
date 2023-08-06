import { useEffect, useState } from "react";

export function usePersistedState<T>(
    key: string,
    defaultValue: T,
    serialize: (v: T) => string = JSON.stringify,
    deserialize: (s: string | null, def: T) => T = defaultDeserialize,
) {
    const [state, setState] = useState<T>(() => {
        return deserialize(localStorage.getItem(key), defaultValue);
    });
    useEffect(() => {
        localStorage.setItem(key, serialize(state));
    }, [state, key, serialize]);

    return [state, setState] as const;
}

function defaultDeserialize<T>(s: string | null, defaultValue: T): T {
    if (s == null) return defaultValue;
    try {
        return JSON.parse(s);
    } catch (err) {
        console.error("Error parsing", { s }, err);
    }
    return defaultValue;
}
