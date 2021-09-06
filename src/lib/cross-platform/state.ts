
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { readable } from 'svelte/store';


type Platforms = 'android' | 'unknown' | 'ios' | 'electron' | 'web'

export const isNative = Capacitor.isNativePlatform()

export const isDesktop = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) == false

export const platform = readable<Platforms>('unknown', function start(set) {
    (async () => {
        const { platform } = await Device.getInfo()

        set(platform)
    })()
})
