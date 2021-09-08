import type { Gesture, GestureConfig, GestureDetail } from '@ionic/core'
import { createGesture } from '@ionic/core'

export type GestureCallback = (detail: GestureDetail) => boolean | void

/// Svelte action
/// <div use:gesture={{ onMove: onMoveHandler }} />
export const gesture = (node: HTMLElement, config: Omit<GestureConfig, 'gestureName' | 'el'>) => {
	const gesture: Gesture = createGesture({
		el: node,
		gestureName: 'gesture',
		...config,
	})

	gesture.enable(true)

	return {
		destroy() {
			gesture.destroy()
		}
	}
}