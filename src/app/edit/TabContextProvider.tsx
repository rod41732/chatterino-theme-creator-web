import { createContext, PropsWithChildren, useContext, useState } from "react";
import { PreviewTab, SettingsTab } from "@/app/edit/editor-tab.types";

interface TabContextData {
    setSettingsTab: (newTab: SettingsTab) => void;
    settingsTab: SettingsTab;
    setPreviewTab: (newTab: PreviewTab) => void;
    previewTab: PreviewTab;
}

const TabContext = createContext<TabContextData>({
    previewTab: PreviewTab.CHAT,
    setPreviewTab(_newTab: PreviewTab): void {},
    setSettingsTab(_newTab: SettingsTab): void {},
    settingsTab: SettingsTab.OVERVIEW,
});

export const useTabContext = () => {
    return useContext(TabContext);
};

/** TabContext handle context for switching tabs in app (Editor, chat, ...) */
export function TabContextProvider({ children }: PropsWithChildren<{}>) {
    const [settingsTab, setSettingsTab] = useState(SettingsTab.INSEPCTOR);
    const [previewTab, setPreviewTab] = useState(PreviewTab.EDITOR);
    return (
        <TabContext.Provider
            value={{
                previewTab,
                setPreviewTab,
                setSettingsTab,
                settingsTab,
            }}
        >
            {children}
        </TabContext.Provider>
    );
}
