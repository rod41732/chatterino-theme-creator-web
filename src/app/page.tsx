"use client";
import { ConfigContextProvider } from "@/app/color-context-provider";
import { ColorApp } from "@/app/ColorApp";
import { ThemeButtons } from "@/app/Home.widgets";

export default function Home() {
    return (
        <ConfigContextProvider>
            <div className="h-full flex flex-col">
                <div className="px-4 border-b border-b-gray-200 flex-shrink-0 flex items-center space-x-2">
                    <div className="text-2xl font-bold py-2">
                        Chatterino Theme Creator
                    </div>
                    <ThemeButtons />
                </div>
                {/*overflow-auto somehow force the height to be correct??*/}
                <ColorApp />
            </div>
        </ConfigContextProvider>
    );
}
