import { createContext, PropsWithChildren, useContext } from "react";
import { usePersistedState } from "@/app/edit/color-context-provider";

interface _ThemeCreatorState {
    hasChange: boolean;
    warnUnsavedChanges: boolean;
}
const DEFAULT_STATE: _ThemeCreatorState = {
    hasChange: false,
    warnUnsavedChanges: false,
};

type SetState<T> = (next: T | ((cur: T) => T)) => void;
interface ThemeCreatorState {
    state: _ThemeCreatorState;
    setState: SetState<_ThemeCreatorState>;
}

const ThemeCreatorStateContext = createContext<ThemeCreatorState | null>(null);

const SETTINGS_KEY = "ctc-settings";

export function ThemeCreatorContextProvider({
    children,
}: PropsWithChildren<{}>) {
    const [state, setState] = usePersistedState<_ThemeCreatorState>(
        SETTINGS_KEY,
        DEFAULT_STATE,
    );

    return (
        <ThemeCreatorStateContext.Provider value={{ state, setState }}>
            {children}
        </ThemeCreatorStateContext.Provider>
    );
}

export function useThemeCreatorState(): ThemeCreatorState {
    const state = useContext(ThemeCreatorStateContext);
    if (!state)
        throw new Error("No ThemeCreatorStateContextProvider found in tree");
    return state;
}
