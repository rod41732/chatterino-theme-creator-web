import { produce } from "immer";
import { JSONData } from "@/lib/flatten-json";
import { ThemeData } from "@/app/edit/color-scheme.types";

function qt2cssString(argb: string): string {
    return argb.replace(/#([0-9a-f]{2})([0-9a-f]{6})/, "#$2$1");
}

function css2qtString(argb: string): string {
    return argb.replace(/#([0-9a-f]{6})([0-9a-f]{2})/, "#$2$1");
}

// type ThemeLikeObject = {
//     [key: string]: ThemeLikeObject | string;
// };

/** recursively apply function to string value */
function walk(t: JSONData, apply: (v: string) => string) {
    for (const [k, v] of Object.entries(t)) {
        if (typeof v == "string") {
            t[k] = apply(v);
        } else if (typeof v == "object" && !Array.isArray(v)) {
            walk(v, apply);
        }
    }
}

/** convert QT theme data to CSS (e.g. when importing) */
export function qt2css(theme: ThemeData): ThemeData {
    return produce(theme, (draft) => {
        walk(draft, qt2cssString);
    });
}

/** convert CSS theme data to QT (e.g. when exporting) */
export function css2qt(theme: ThemeData): ThemeData {
    return produce(theme, (draft) => {
        walk(draft, css2qtString);
    });
}
