export function compareAlphabetically(a: string, b: string) {
    return a.localeCompare(b, undefined, { sensitivity: "base" });
}
