"use client";
import { ConfigContextProvider } from "@/app/editor/color-context-provider";
import { ColorApp } from "@/app/editor/ColorApp";
import { ThemeButtons } from "@/app/editor/Home.widgets";
import { TabContextProvider } from "@/app/editor/tab-context-provider";
import { FiGithub } from "react-icons/fi";

export default function Home() {
    return (
        <ConfigContextProvider>
            <TabContextProvider>
                <div className="h-full flex flex-col">
                    <div className="px-4 border-b border-b-gray-200 flex-shrink-0 flex items-center space-x-2">
                        <div className="text-2xl font-bold py-2">
                            Chatterino Theme Creator
                        </div>
                        <ThemeButtons />
                    </div>
                    <div className="overflow-hidden flex-1">
                        <ColorApp />
                    </div>
                    <EditorFooter />
                </div>
            </TabContextProvider>
        </ConfigContextProvider>
    );
}

function EditorFooter() {
    return (
        <div className="w-full bg-neutral-800 text-gray-400 px-4 py-2 mt-2 flex flex-wrap text-sm just">
            <div>
                Chatterino Theme Creator is made by{" "}
                <a
                    href="https://github.com/rod41732"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                >
                    @rod41732
                </a>
            </div>
            <div className="flex-grow"></div>
            <div className="flex items-center">
                <a
                    href="https://github.com/rod41732/chatterino-theme-creator-web"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FiGithub className="inline-block mr-2 text-xl" />
                    GitHub Repository
                </a>
            </div>
        </div>
    );
}
