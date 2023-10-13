import { FiGithub } from "react-icons/fi";

export function EditorFooter() {
    return (
        <div className="w-full bg-neutral-800 text-gray-400 px-4 py-2 flex flex-wrap text-sm just">
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
