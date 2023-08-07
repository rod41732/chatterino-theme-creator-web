import { ThemeData } from "@/app/edit/ThemeContextProvider";

export const CHATTERINO_DARK_THEME: ThemeData = {
    metadata: {
        iconTheme: "light",
    },
    colors: {
        accent: "#00aeef",
        messages: {
            backgrounds: {
                alternate: "#222222",
                regular: "#191919",
            },
            disabled: "#19191999",
            highlightAnimationEnd: "#e6e6e600",
            highlightAnimationStart: "#e6e6e66e",
            selection: "#ffffff40",
            textColors: {
                caret: "#ffffff",
                chatPlaceholder: "#5d5555",
                link: "#4286f4",
                regular: "#ffffff",
                system: "#8c7f7f",
            },
        },
        scrollbars: {
            background: "#00000000",
            thumb: "#575757",
            thumbSelected: "#616161",
        },
        splits: {
            background: "#191919",
            dropPreview: "#0094ff30",
            dropPreviewBorder: "#0094ff",
            dropTargetRect: "#0094ff00",
            dropTargetRectBorder: "#0094ff00",
            header: {
                background: "#2e2e2e",
                border: "#383838",
                focusedBackground: "#444444",
                focusedBorder: "#464646",
                focusedText: "#84c1ff",
                text: "#ffffff",
            },
            input: {
                background: "#242424",
                text: "#ffffff",
            },
            messageSeperator: "#3c3c3c",
            resizeHandle: "#0094ff70",
            resizeHandleBackground: "#0094ff20",
        },
        tabs: {
            dividerLine: "#555555",
            highlighted: {
                backgrounds: {
                    hover: "#252525",
                    regular: "#252525",
                    unfocused: "#252525",
                },
                line: {
                    hover: "#ee6166",
                    regular: "#ee6166",
                    unfocused: "#ee6166",
                },
                text: "#eeeeee",
            },
            newMessage: {
                backgrounds: {
                    hover: "#252525",
                    regular: "#252525",
                    unfocused: "#252525",
                },
                line: {
                    hover: "#888888",
                    regular: "#888888",
                    unfocused: "#888888",
                },
                text: "#eeeeee",
            },
            regular: {
                backgrounds: {
                    hover: "#252525",
                    regular: "#252525",
                    unfocused: "#252525",
                },
                line: {
                    hover: "#444444",
                    regular: "#444444",
                    unfocused: "#444444",
                },
                text: "#aaaaaa",
            },
            selected: {
                backgrounds: {
                    hover: "#555555",
                    regular: "#555555",
                    unfocused: "#555555",
                },
                line: {
                    hover: "#00aeef",
                    regular: "#00aeef",
                    unfocused: "#00aeef",
                },
                text: "#ffffff",
            },
        },
        window: {
            background: "#111111",
            text: "#eeeeee",
        },
    },
    ctcMeta: {
        checkeredRow: true,
        createdAt: "1970-01-01T00:00:00Z",
        messageSeparator: false,
        modifiedAt: "1970-01-01T00:00:00Z",
        name: "Dark",
    },
};
