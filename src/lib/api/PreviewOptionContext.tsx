import { createContext, useContext } from "react";

interface PreviewOption {
    editable: boolean;
}

const PreviewOptionContext = createContext<PreviewOption>({ editable: false });

export const PreviewOptionContextProvider = PreviewOptionContext.Provider;
export function usePreviewOptionContext() {
    return useContext(PreviewOptionContext);
}
