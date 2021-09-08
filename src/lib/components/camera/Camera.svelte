<script lang='ts'>
	import { getAnimationContext } from '$lib/utils'
	import { createEventDispatcher, onMount } from 'svelte'

	const { register } = getAnimationContext()
	const dispatch = createEventDispatcher()

	let camera: HTMLDivElement
	 
	onMount(() => {
		const magnitude = 15
		const slowdown = 1000

		const animateFigure8 = (time) => {
			const t = time / slowdown
			const cosT = Math.cos(t)
			camera.style.left = cosT * magnitude + 'px'
			camera.style.top = (Math.sin(2 * t) / 2) * magnitude + 'px'
			camera.style.transform = `rotate(${cosT * 0.5 * magnitude}deg)`
		}

		register('camera', time => {
			animateFigure8(time)
		})
	})
</script>

<div class='wrapper'>
	<div on:pointerup={() => dispatch('pointerup')} bind:this={camera} class='container'>
		<img src='/camera.png' alt='camera'>
	</div>
</div>

<style>
	.wrapper {
		position: absolute;
		top: calc(var(--s-4) + var(--viewPaddingTop));
		left: 10vw;
		z-index: var(--z-index);
		width: var(--size);
		height: var(--size);
	}

	.container, img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.container {
		transition: all 250ms ease-out;
		cursor: pointer;
	}
</style>