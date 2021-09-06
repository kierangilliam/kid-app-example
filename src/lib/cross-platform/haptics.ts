import type { } from '@capacitor/haptics';
import { Haptics as CapacitorHaptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { isNative } from './state';

if (isNative) {
    CapacitorHaptics.selectionStart()
}

function notify(type: NotificationType) {
    if (!isNative) {
        console.debug(`Buzz! [${type}]`)
        return
    }

    CapacitorHaptics.notification({ type })
}

function vibrate(style: ImpactStyle) {
    if (!isNative) {
        console.debug(`Buzz! [${style}]`)
        return
    }

    CapacitorHaptics.impact({ style })
    CapacitorHaptics.vibrate()
}

export const Haptics = {
    success: () => {
        notify(NotificationType.Success)
    },

    error: () => {
        notify(NotificationType.Error)
    },

    warning: () => {
        notify(NotificationType.Warning)
    },

    select: () => {
        if (!isNative) {
            console.debug('Buzz! [select]')
            return
        }
        CapacitorHaptics.selectionChanged()
    },

    heavy: () => {
        vibrate(ImpactStyle.Heavy)
    },

    medium: () => {
        vibrate(ImpactStyle.Medium)
    },

    light: () => {
        vibrate(ImpactStyle.Light)
    },
}