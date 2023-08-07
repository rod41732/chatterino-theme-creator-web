"use client";
import { useRouter } from "next/navigation";
import { FiGithub } from "react-icons/fi";

export default function HomePage() {
    const router = useRouter();
    return (
        <div className="h-full w-full overflow-hidden flex flex-col">
            <div className="flex-shrink h-2/3  relative flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold justify-self-end">
                    Welcome to Chatterino Theme Creator!
                </h1>
                <div className="space-y-4 mt-16">
                    <button
                        className="px-4 py-2 text-lg rounded-md block border border-gray-500 w-full"
                        onClick={async () => {
                            await router.push("/create");
                        }}
                    >
                        Create theme
                    </button>
                    <button className="px-4 py-2 text-lg rounded-md block border border-gray-500 w-full">
                        Browse theme (Coming soon (TM))
                    </button>
                </div>
            </div>
            <div className="h-1/3"></div>
            <MainFooter />
        </div>
    );
}

function MainFooter() {
    return (
        <div className="w-full text-gray-500 px-4 py-2 mt-2 flex flex-wrap text-sm justify-center gap-4">
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
