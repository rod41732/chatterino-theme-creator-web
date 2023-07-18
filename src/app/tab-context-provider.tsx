import { createContext, PropsWithChildren, useContext, useState } from "react";

interface TabContextData {
    setSettingsTab: (newTab: string) => void;
    settingsTab: string;
    setPreviewTab: (newTab: string) => void;
    previewTab: string;
}

const TabContext = createContext<TabContextData>({
    previewTab: "",
    setPreviewTab(newTab: string): void {},
    setSettingsTab(newTab: string): void {},
    settingsTab: "",
});

export const useTabContext = () => {
    return useContext(TabContext);
};

export function TabContextProvider({ children }: PropsWithChildren<{}>) {
    const [settingsTab, setSettingsTab] = useState("overview");
    const [previewTab, setPreviewTab] = useState("chat");
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
