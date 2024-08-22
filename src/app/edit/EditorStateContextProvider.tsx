import { createContext, PropsWithChildren, useContext } from "react";

import { usePersistedState } from "@/lib/use-persisted-state";

interface _EditorState {
    hasChange: boolean;
    warnUnsavedChanges: boolean;
}
const DEFAULT_STATE: _EditorState = {
    hasChange: false,
    warnUnsavedChanges: false,
};

type SetState<T> = (next: T | ((cur: T) => T)) => void;
interface EditorState {
    state: _EditorState;
    setState: SetState<_EditorState>;
}

const EditorStateContext = createContext<EditorState | null>(null);

const SETTINGS_KEY = "ctc-settings";

/** EditorState handle state that are specific to theme editor (not related to business logic).
 * Currently tracks if theme is modified
 */
export function EditorStateContextProvider({
    children,
}: PropsWithChildren<{}>) {
    const [state, setState] = usePersistedState<_EditorState>(
        SETTINGS_KEY,
        DEFAULT_STATE,
    );

    return (
        <EditorStateContext.Provider value={{ state, setState }}>
            {children}
        </EditorStateContext.Provider>
    );
}

export function useEditorState(): EditorState {
    const state = useContext(EditorStateContext);
    if (!state) throw new Error("No EditorStateContextProvider found in tree");
    return state;
}
