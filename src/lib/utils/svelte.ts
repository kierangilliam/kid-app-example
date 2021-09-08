import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const persistent = <T>(key: string, initValue: T): Writable<T> => {
    const storedValueStr = localStorage.getItem(key);
    const storedValue: T | null = JSON.parse(storedValueStr);

    const store = writable(storedValue ?? initValue);
    store.subscribe((val) => {
        localStorage.setItem(key, JSON.stringify(val));
    })
    return store;
}

export const getAnimationContext = (): { register: (name: string, fn: (time: DOMHighResTimeStamp) => void) => void } => {
    return getContext('animation')
}

export const setAnimationContext = () => {
    const context = createAnimationContext()

    setContext('animation', context)

    return context.animationId
}

const createAnimationContext = () => {
    const animationCallbacks: Record<string, (time?: DOMHighResTimeStamp) => void> = {}
    const animationId = writable(null)

    const renderAnimations = (time: DOMHighResTimeStamp) => {
        Object.values(animationCallbacks).forEach(fn => {
            fn(time)
        })

        animationId.set(requestAnimationFrame(renderAnimations))
    }

    animationId.set(requestAnimationFrame(renderAnimations))

    return {
        animationId,
        register: (name: string, fn: (time?: DOMHighResTimeStamp) => void) => {
            animationCallbacks[name] = fn
        },
    }
}
