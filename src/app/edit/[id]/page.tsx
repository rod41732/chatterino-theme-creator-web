"use client";
import { TabContextProvider } from "@/app/edit/TabContextProvider";
import { ThemeContextProvider } from "@/app/edit/ThemeContextProvider";
import { ColorApp } from "@/app/edit/ColorApp";
import { ThemeEditorButton } from "@/app/edit/ThemeEditorButtons";
import { EditorFooter } from "@/app/create/EdtiorFooter";
import { EditorStateContextProvider } from "@/app/edit/EditorStateContextProvider";

interface RouteParams {
    params: {
        id: string;
    };
}
export default function EditThemePage({ params: { id } }: RouteParams) {
    return id ? (
        <ThemeContextProvider key={id} themeId={id}>
            <EditorStateContextProvider>
                <TabContextProvider>
                    <div className="h-full flex flex-col">
                        <div className="px-4 border-b border-b-gray-200 flex-shrink-0 flex items-center space-x-2">
                            <div className="text-2xl font-bold py-2">
                                Chatterino Theme Creator
                            </div>
                            <ThemeEditorButton themeId={id} />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <ColorApp />
                        </div>
                        <EditorFooter />
                    </div>
                </TabContextProvider>
            </EditorStateContextProvider>
        </ThemeContextProvider>
    ) : (
        <div> no theme id</div>
    );
}
