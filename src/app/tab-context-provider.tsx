import { createContext, PropsWithChildren, useContext, useState } from "react";
import { PreviewTab, SettingsTab } from "@/app/tab.types";

interface TabContextData {
    setSettingsTab: (newTab: SettingsTab) => void;
    settingsTab: SettingsTab;
    setPreviewTab: (newTab: PreviewTab) => void;
    previewTab: PreviewTab;
}

const TabContext = createContext<TabContextData>({
    previewTab: PreviewTab.CHAT,
    setPreviewTab(newTab: PreviewTab): void {},
    setSettingsTab(newTab: SettingsTab): void {},
    settingsTab: SettingsTab.OVERVIEW,
});

export const useTabContext = () => {
    return useContext(TabContext);
};

export function TabContextProvider({ children }: PropsWithChildren<{}>) {
    const [settingsTab, setSettingsTab] = useState(SettingsTab.OVERVIEW);
    const [previewTab, setPreviewTab] = useState(PreviewTab.CHAT);
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
