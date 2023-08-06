import { ThemeData } from "@/app/edit/color-context-provider";

export const CHATTERINO_BLACK_THEME: ThemeData = {
    metadata: {
        iconTheme: "light",
    },
    colors: {
        accent: "#00aeef",
        messages: {
            backgrounds: {
                alternate: "#0a0a0a",
                regular: "#000000",
            },
            disabled: "#00000099",
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
            thumb: "#4d4d4d",
            thumbSelected: "#595959",
        },
        splits: {
            background: "#000000",
            dropPreview: "#0094ff30",
            dropPreviewBorder: "#0094ff",
            dropTargetRect: "#0094ff00",
            dropTargetRectBorder: "#0094ff00",
            header: {
                background: "#050505",
                border: "#121212",
                focusedBackground: "#1a1a1a",
                focusedBorder: "#1c1c1c",
                focusedText: "#84c1ff",
                text: "#ffffff",
            },
            input: {
                background: "#080808",
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
                    hover: "#0b0b0b",
                    regular: "#0b0b0b",
                    unfocused: "#0b0b0b",
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
                    hover: "#0b0b0b",
                    regular: "#0b0b0b",
                    unfocused: "#0b0b0b",
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
                    hover: "#0b0b0b",
                    regular: "#0b0b0b",
                    unfocused: "#0b0b0b",
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
                    hover: "#333333",
                    regular: "#333333",
                    unfocused: "#333333",
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
            background: "#040404",
            text: "#eeeeee",
        },
    },
    ctcMeta: {
        checkeredRow: true,
        createdAt: "1970-01-01T00:00:00Z",
        messageSeparator: false,
        modifiedAt: "1970-01-01T00:00:00Z",
        name: "Black",
    },
};
