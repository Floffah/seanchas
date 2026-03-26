import { proxy, subscribe } from "valtio";

export function persistedProxy<T extends object>(key: string, initialState: T) {
    if (typeof window === "undefined") {
        return proxy(initialState);
    }

    const stored = localStorage.getItem(key);
    const parsed = stored ? JSON.parse(stored) : initialState;

    const store = proxy<T>(parsed);

    subscribe(store, () => {
        localStorage.setItem(key, JSON.stringify(store));
    });

    return store;
}
