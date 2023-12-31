interface GuardedMap<K, V> extends Map<K, V>
{
    has<S extends K>(key: S): this is {get(key: S) : V}&this;
}

export type {GuardedMap};