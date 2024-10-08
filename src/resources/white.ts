import { ThemeData } from "@/app/edit/color-scheme.types";

export const CHATTERINO_WHITE_THEME: ThemeData = {
    metadata: {
        iconTheme: "dark",
    },
    colors: {
        accent: "#00aeef",
        messages: {
            backgrounds: {
                alternate: "#f5f5f5",
                regular: "#ffffff",
            },
            disabled: "#ffffff99",
            highlightAnimationEnd: "#14141400",
            highlightAnimationStart: "#1414146e",
            selection: "#00000040",
            textColors: {
                caret: "#000000",
                chatPlaceholder: "#af9f9f",
                link: "#4286f4",
                regular: "#000000",
                system: "#8c7f7f",
            },
        },
        scrollbars: {
            background: "#00000000",
            thumb: "#b3b3b3",
            thumbSelected: "#a6a6a6",
        },
        splits: {
            background: "#ffffff",
            dropPreview: "#0094ff30",
            dropPreviewBorder: "#0094ff",
            dropTargetRect: "#ffffff00",
            dropTargetRectBorder: "#0094ff00",
            header: {
                background: "#ffffff",
                border: "#ffffff",
                focusedBackground: "#f2f2f2",
                focusedBorder: "#e6e6e6",
                focusedText: "#0051a3",
                text: "#000000",
            },
            input: {
                background: "#f2f2f2",
                text: "#000000",
            },
            messageSeperator: "#7f7f7f",
            resizeHandle: "#0094ff70",
            resizeHandleBackground: "#0094ff50",
        },
        tabs: {
            liveIndicator: "#ff0000",
            rerunIndicator: "#c7c715",
            dividerLine: "#b4d7ff",
            highlighted: {
                backgrounds: {
                    hover: "#eeeeee",
                    regular: "#ffffff",
                    unfocused: "#ffffff",
                },
                line: {
                    hover: "#ff0000",
                    regular: "#ff0000",
                    unfocused: "#ff0000",
                },
                text: "#000000",
            },
            newMessage: {
                backgrounds: {
                    hover: "#eeeeee",
                    regular: "#ffffff",
                    unfocused: "#ffffff",
                },
                line: {
                    hover: "#bbbbbb",
                    regular: "#bbbbbb",
                    unfocused: "#bbbbbb",
                },
                text: "#222222",
            },
            regular: {
                backgrounds: {
                    hover: "#eeeeee",
                    regular: "#ffffff",
                    unfocused: "#ffffff",
                },
                line: {
                    hover: "#ffffff",
                    regular: "#ffffff",
                    unfocused: "#ffffff",
                },
                text: "#444444",
            },
            selected: {
                backgrounds: {
                    hover: "#b4d7ff",
                    regular: "#b4d7ff",
                    unfocused: "#b4d7ff",
                },
                line: {
                    hover: "#00aeef",
                    regular: "#00aeef",
                    unfocused: "#00aeef",
                },
                text: "#000000",
            },
        },
        window: {
            background: "#ffffff",
            text: "#000000",
        },
    },
    ctcMeta: {
        checkeredRow: true,
        createdAt: "1970-01-01T00:00:00Z",
        messageSeparator: false,
        modifiedAt: "1970-01-01T00:00:00Z",
        simpleTabSettings: false,
        name: "White",
    },
};
