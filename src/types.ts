export type Optional<T> = T | undefined;
export type Value = Optional<string | boolean>;

export type FormData = {
    [name: string]: Optional<Value>
};
