"use client";
import { TabContextProvider } from "@/app/edit/tab-context-provider";
import { ConfigContextProvider } from "@/app/edit/color-context-provider";
import { ColorApp } from "@/app/edit/ColorApp";
import { ThemeButtons } from "@/app/edit/Home.widgets";
import { EditorFooter } from "@/app/create/EdtiorFooter";

interface RouteParams {
    params: {
        id: string;
    };
}
export default function EditThemePage({ params: { id } }: RouteParams) {
    return id ? (
        <ConfigContextProvider key={id} themeId={id}>
            <TabContextProvider>
                <div className="h-full flex flex-col">
                    <div className="px-4 border-b border-b-gray-200 flex-shrink-0 flex items-center space-x-2">
                        <div className="text-2xl font-bold py-2">
                            Chatterino Theme Creator
                        </div>
                        <ThemeButtons themeId={id} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <ColorApp />
                    </div>
                    <EditorFooter />
                </div>
            </TabContextProvider>
        </ConfigContextProvider>
    ) : (
        <div> no theme id</div>
    );
}
