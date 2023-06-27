type ColorNoAlpha = string;
type ColorWithAlpha = string;

interface Color {
    accent: ColorNoAlpha;
    messages: {
        backgrounds: {
            alternate: ColorNoAlpha;
            regular: ColorNoAlpha;
        };
        disabled: ColorWithAlpha;
        highlightAnimationEnd: ColorWithAlpha;
        highlightAnimationStart: ColorWithAlpha;
        selection: ColorWithAlpha;
        textColors: {
            caret: ColorNoAlpha;
            chatPlaceholder: ColorNoAlpha;
            link: ColorNoAlpha;
            regular: ColorNoAlpha;
            system: ColorNoAlpha;
        };
    };
    scrollbars: {
        background: ColorWithAlpha;
        thumb: ColorNoAlpha;
        thumbSelected: ColorNoAlpha;
    };
    splits: {
        background: ColorNoAlpha;
        dropPreview: ColorWithAlpha;
        dropPreviewBorder: ColorNoAlpha;
        dropTargetRect: ColorWithAlpha;
        dropTargetRectBorder: ColorWithAlpha;
        header: {
            background: ColorNoAlpha;
            border: ColorNoAlpha;
            focusedBackground: ColorNoAlpha;
            focusedBorder: ColorNoAlpha;
            focusedText: ColorNoAlpha;
            text: ColorNoAlpha;
        };
        input: {
            background: ColorNoAlpha;
            text: ColorNoAlpha;
        };
        messageSeperator: ColorNoAlpha;
        resizeHandle: ColorWithAlpha;
        resizeHandleBackground: ColorWithAlpha;
    };
    tabs: {
        dividerLine: ColorNoAlpha;
        highlighted: {
            backgrounds: {
                hover: ColorNoAlpha;
                regular: ColorNoAlpha;
                unfocused: ColorNoAlpha;
            };
            line: {
                hover: ColorNoAlpha;
                regular: ColorNoAlpha;
                unfocused: ColorNoAlpha;
            };
            text: ColorNoAlpha;
        };
        newMessage: {
            backgrounds: {
                hover: ColorNoAlpha;
                regular: ColorNoAlpha;
                unfocused: ColorNoAlpha;
            };
            line: {
                hover: ColorNoAlpha;
                regular: ColorNoAlpha;
                unfocused: ColorNoAlpha;
            };
            text: ColorNoAlpha;
        };
        regular: {
            backgrounds: {
                hover: ColorNoAlpha;
                regular: ColorNoAlpha;
                unfocused: ColorNoAlpha;
            };
            line: {
                hover: ColorNoAlpha;
                regular: ColorNoAlpha;
                unfocused: ColorNoAlpha;
            };
            text: ColorNoAlpha;
        };
        selected: {
            backgrounds: {
                hover: ColorNoAlpha;
                regular: ColorNoAlpha;
                unfocused: ColorNoAlpha;
            };
            line: {
                hover: ColorNoAlpha;
                regular: ColorNoAlpha;
                unfocused: ColorNoAlpha;
            };
            text: ColorNoAlpha;
        };
    };
    window: {
        background: ColorNoAlpha;
        text: ColorNoAlpha;
    };
}
