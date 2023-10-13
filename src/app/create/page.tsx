"use client";
import { CreateNewTheme } from "@/app/create/CreateNewTheme";
import { EditorFooter } from "@/app/create/EdtiorFooter";
import { UserBadge } from "@/app/components/UserBadge";
import { Topbar } from "@/app/components/Topbar";
import { BsChevronRight } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    return (
        <div className="h-full flex flex-col">
            <Topbar
                title="Chatterino Theme Creator"
                rightComponents={<UserBadge />}
            />
            <div className="flex-1 overflow-hidden flex items-center justify-center">
                <div className="flex-shrink overflow-hidden w-full max-h-full max-w-xl mx-8 flex flex-col">
                    <CreateNewTheme />

                    <h2
                        className="col-span-2 text-xl font-semibold my-2 mt-12"
                        role="button"
                        onClick={async () => {
                            await router.push("/my-themes");
                        }}
                    >
                        Your created themes
                        <BsChevronRight className="ml-2 inline-block" />
                    </h2>
                    <p className="text-sm text-gray-500">
                        View your created theme in this app. Your theme are
                        stored privately in your browser&apos;s Local Storage
                        until you decided to share with others.
                    </p>

                    <hr className="w-1/2 my-6 self-center" />

                    <h2 className="col-span-2 text-xl font-semibold mb-2">
                        What is Chatterino theme?
                    </h2>
                    <p className="text-sm text-gray-500">
                        Chatterino theme is a JSON file describing colors of
                        various UI elements. It allow you to customize
                        Chatterino to what you want it to look like. Chatterino
                        Theme Creator provides a convenient way to edit and
                        preview theme in real-time. More information about
                        themes can be found on.{" "}
                        <a
                            href="https://wiki.chatterino.com/Themes/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500"
                        >
                            Chatterino Wiki
                        </a>
                    </p>
                </div>
            </div>
            <EditorFooter />
        </div>
    );
}
