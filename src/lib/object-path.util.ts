function setPathRecursive(o: any, path: string[], value: any) {
    if (path.length == 0) throw new Error("Invalid path: must not be empty");
    if (path.length > 1) {
        return setPathRecursive(o[path[0]], path.slice(1), value);
    }
    o[path[0]] = value;
}

function getPathRecursive(o: any, path: string[]): any {
    if (path.length == 0) throw new Error("Invalid path: must not be empty");
    if (path.length > 1) {
        return getPathRecursive(o[path[0]], path.slice(1));
    }
    return o[path[0]];
}

export function setPath(o: any, dottedPath: string, value: any) {
    setPathRecursive(o, dottedPath.split("."), value);
}

export function getPath(o: any, dottedPath: string): any {
    return getPathRecursive(o, dottedPath.split("."));
}
