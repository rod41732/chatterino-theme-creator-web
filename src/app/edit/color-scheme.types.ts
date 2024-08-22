import { z } from "zod";

type ColorNoAlpha = string;
type ColorWithAlpha = string;

const ColorNoAlphaSchema = z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Expected Color Without Alpha");

const ColorWithAlphaSchema = z
    .string()
    .regex(/^#[0-9a-fA-F]{6,8}$/, "Expected Color With optional Alpha");

const ColorSchemeSchema = z.object({
    accent: ColorNoAlphaSchema,
    messages: z.object({
        backgrounds: z.object({
            alternate: ColorNoAlphaSchema,
            regular: ColorNoAlphaSchema,
        }),
        disabled: ColorWithAlphaSchema,
        highlightAnimationEnd: ColorWithAlphaSchema,
        highlightAnimationStart: ColorWithAlphaSchema,
        selection: ColorWithAlphaSchema,
        textColors: z.object({
            caret: ColorNoAlphaSchema,
            chatPlaceholder: ColorNoAlphaSchema,
            link: ColorNoAlphaSchema,
            regular: ColorNoAlphaSchema,
            system: ColorNoAlphaSchema,
        }),
    }),
    scrollbars: z.object({
        background: ColorWithAlphaSchema,
        thumb: ColorNoAlphaSchema,
        thumbSelected: ColorNoAlphaSchema,
    }),
    splits: z.object({
        background: ColorNoAlphaSchema,
        dropPreview: ColorWithAlphaSchema,
        dropPreviewBorder: ColorNoAlphaSchema,
        dropTargetRect: ColorWithAlphaSchema,
        dropTargetRectBorder: ColorWithAlphaSchema,
        header: z.object({
            background: ColorNoAlphaSchema,
            border: ColorNoAlphaSchema,
            focusedBackground: ColorNoAlphaSchema,
            focusedBorder: ColorNoAlphaSchema,
            focusedText: ColorNoAlphaSchema,
            text: ColorNoAlphaSchema,
        }),
        input: z.object({
            background: ColorNoAlphaSchema,
            text: ColorNoAlphaSchema,
        }),
        messageSeperator: ColorNoAlphaSchema,
        resizeHandle: ColorWithAlphaSchema,
        resizeHandleBackground: ColorWithAlphaSchema,
    }),
    tabs: z.object({
        // have default to facilitate old theme users
        liveIndicator: ColorNoAlphaSchema.default("#ff0000"),
        rerunIndicator: ColorNoAlphaSchema.default("#c7c715"),
        dividerLine: ColorNoAlphaSchema,
        highlighted: z.object({
            backgrounds: z.object({
                hover: ColorNoAlphaSchema,
                regular: ColorNoAlphaSchema,
                unfocused: ColorNoAlphaSchema,
            }),
            line: z.object({
                hover: ColorNoAlphaSchema,
                regular: ColorNoAlphaSchema,
                unfocused: ColorNoAlphaSchema,
            }),
            text: ColorNoAlphaSchema,
        }),
        newMessage: z.object({
            backgrounds: z.object({
                hover: ColorNoAlphaSchema,
                regular: ColorNoAlphaSchema,
                unfocused: ColorNoAlphaSchema,
            }),
            line: z.object({
                hover: ColorNoAlphaSchema,
                regular: ColorNoAlphaSchema,
                unfocused: ColorNoAlphaSchema,
            }),
            text: ColorNoAlphaSchema,
        }),
        regular: z.object({
            backgrounds: z.object({
                hover: ColorNoAlphaSchema,
                regular: ColorNoAlphaSchema,
                unfocused: ColorNoAlphaSchema,
            }),
            line: z.object({
                hover: ColorNoAlphaSchema,
                regular: ColorNoAlphaSchema,
                unfocused: ColorNoAlphaSchema,
            }),
            text: ColorNoAlphaSchema,
        }),
        selected: z.object({
            backgrounds: z.object({
                hover: ColorNoAlphaSchema,
                regular: ColorNoAlphaSchema,
                unfocused: ColorNoAlphaSchema,
            }),
            line: z.object({
                hover: ColorNoAlphaSchema,
                regular: ColorNoAlphaSchema,
                unfocused: ColorNoAlphaSchema,
            }),
            text: ColorNoAlphaSchema,
        }),
    }),
    window: z.object({
        background: ColorNoAlphaSchema,
        text: ColorNoAlphaSchema,
    }),
});
export interface ColorScheme {
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
        liveIndicator: ColorNoAlpha;
        rerunIndicator: ColorNoAlpha;
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

export const ThemeMetaDataSchema = z.object({
    iconTheme: z.enum(["light", "dark"]),
});

export interface ThemeMetadata {
    // swap color for some icons, also affect some border
    iconTheme: "light" | "dark";
}

const ChatterinoThemeCreatorMetadataSchema = z
    .object({
        name: z.string().default("unnamed"),
        createdAt: z.string().default(() => new Date().toJSON()),
        modifiedAt: z.string().default(() => new Date().toJSON()),

        simpleTabSettings: z.boolean().default(false),

        checkeredRow: z.boolean().default(true),
        messageSeparator: z.boolean().default(false),
    })
    .default(() => ({
        name: "unnamed",
        createdAt: new Date().toJSON(),
        modifiedAt: new Date().toJSON(),
        simpleTabSettings: false,
        checkeredRow: true,
        messageSeparator: false,
    }));

interface ChatterinoThemeCreatorMetadata {
    name: string;
    createdAt: string;
    modifiedAt: string;

    simpleTabSettings: boolean;

    checkeredRow: boolean;
    messageSeparator: boolean;
}

// used for generating theme
export const ThemeDataSchema = z.object({
    colors: ColorSchemeSchema,
    metadata: ThemeMetaDataSchema,
    ctcMeta: ChatterinoThemeCreatorMetadataSchema,
});
export interface ThemeData {
    colors: ColorScheme;
    metadata: ThemeMetadata;
    ctcMeta: ChatterinoThemeCreatorMetadata;
}
