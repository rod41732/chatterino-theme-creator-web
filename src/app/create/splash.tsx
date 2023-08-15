import clsx from "clsx";
import { ReactNode, useState } from "react";
import { EditorFooter } from "@/app/create/EdtiorFooter";
import { CreateNewTheme } from "@/app/create/CreateNewTheme";
import { UserThemeList } from "@/app/create/UserThemeList";
import { GiSevenPointedStar } from "react-icons/gi";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";

const TABS: { key: Tab; label: ReactNode; children: ReactNode }[] = [
    {
        key: "new",
        label: (
            <div className="flex items-center justify-center">
                <GiSevenPointedStar className="inline-block mr-2" />
                New Theme
            </div>
        ),
        children: <CreateNewTheme />,
    },
    {
        key: "list",
        label: (
            <div className="flex items-center justify-center">
                <AiOutlineUnorderedList className="inline-block mr-2" />
                Your Themes
            </div>
        ),
        children: <UserThemeList />,
    },
];

type Tab = "new" | "list";
export function Splash() {
    const [tab, setTab] = useState<Tab>("new");
    return (
        <>
            <div className="flex-1 overflow-hidden flex items-center justify-center">
                <div className="flex-shrink overflow-hidden w-full max-h-full max-w-xl mx-8 flex flex-col">
                    {/*tab bar*/}
                    <div className="flex-shrink-0 flex items-center overflow-x-auto border-b border-gray-200 mb-4">
                        {TABS.map((it) => (
                            <button
                                className={clsx(
                                    "mx-3 py-3  flex-1",
                                    "hover:text-sky-500",
                                    it.key == tab && "text-sky-500",
                                )}
                                key={it.key}
                                onClick={() => setTab(it.key)}
                            >
                                {it.label}
                            </button>
                        ))}
                    </div>
                    {TABS.find((it) => it.key == tab)?.children}
                </div>
            </div>
            <EditorFooter />
        </>
    );
}
