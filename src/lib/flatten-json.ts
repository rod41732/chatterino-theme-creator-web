export interface JSONData {
    // NOT 100 accurate, I'm lazy
    [key: string]: any;
}

/**
 * flatten JSON, return as entries (array of [key, value])
 *
 * example: `flattenKV("--", {a: {b: 1, c: 1}, d: 1, e: 1})`
 *
 * result: `[["--a-b", 1], ["--a-c", 1], ["--d", 1], ["--e", 1]]`
 * @param prefix:
 * @param obj
 * @param sep
 */
export function flattenJSON(
    prefix: string,
    obj: JSONData,
    sep = "-",
): [string, any][] {
    let out: [string, any][] = [];
    for (const [k, v] of Object.entries(obj)) {
        if (typeof v == "object") {
            out.push(...flattenJSON(prefix + k + sep, v, sep));
        } else {
            out.push([prefix + k, v]);
        }
    }
    return out;
}
