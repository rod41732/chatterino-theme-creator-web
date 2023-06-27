type ColorNoAlpha = string;
type ColorWithAlpha = string;

export interface Color {
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
            caret: ColorNoAlpha; // NO idea where it is used
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

// NOTE: QT color is argb, but web color is rgba
export const COLOR: Color = {
    accent: "#00aeff",
    messages: {
        backgrounds: {
            alternate: "#222222",
            regular: "#191912",
        },
        // timeout
        disabled: "#19191999",
        highlightAnimationEnd: "#e6e6e600",
        highlightAnimationStart: "#e6e6e66e",
        // text highligh xd
        selection: "#00ffff40",
        textColors: {
            caret: "#ffffff",
            // chatbox
            chatPlaceholder: "#5d5555",
            link: "#4286f4",
            regular: "#ffffff",
            // also timestapm
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
            background: "#000000",
            text: "#00ff00",
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
};
export const DARK_COLOR: Color = {
    accent: "#00aeff",
    messages: {
        backgrounds: {
            alternate: "#222222",
            regular: "#191912",
        },
        // timeout
        disabled: "#19191999",
        highlightAnimationEnd: "#e6e6e600",
        highlightAnimationStart: "#e6e6e66e",
        selection: "#ffffff40",
        textColors: {
            caret: "#ffffff",
            // chatbox
            chatPlaceholder: "#5d5555",
            link: "#4286f4",
            regular: "#ffffff",
            // also timestapm
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
            background: "#000000",
            text: "#00ff00",
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
};

/*
function flattenKV(prefix, obj) {
    let out = [];
    for (const [k, v] of Object.entries(obj)) {
        if (typeof v == "object") {
            out.push(...flattenKV(prefix + k + "-", v));
        } else {
            out.push([prefix + k, v]);
        }
    }
    return out as any;
}
function flattenJSON(data) {
    const res = {};
    flattenKV("", data).forEach(([k, v]) => {
        res[k] = v;
    });
    return res;
}
*/
