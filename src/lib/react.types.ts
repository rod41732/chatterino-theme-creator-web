export type ValueOrFactory<T> = T | ((old: T) => T);
