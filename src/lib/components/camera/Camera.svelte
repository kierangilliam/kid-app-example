<script lang='ts'>
	import { createEventDispatcher, onMount } from 'svelte'

	const dispatch = createEventDispatcher()

	let camera: HTMLDivElement
	 
	onMount(() => {
		const magnitude = 15
		const slowdown = 1000

		const animateFigure8 = () => {
			if (!camera) return
			const t = Date.now() / slowdown
			camera.style.left = (Math.cos(t)) * magnitude + 'px'
			camera.style.top = (Math.sin(2 * t) / 2) * magnitude + 'px'
			camera.style.transform = `rotate(${(Math.cos(t)) * (0.5 * magnitude)}deg)`
		}
		
		setInterval(() => {
			requestAnimationFrame(animateFigure8)
		}, 150)
	})
</script>

<div class='wrapper'>
	<div on:click={() => dispatch('click')} bind:this={camera} class='container'>
		<img src='/camera.png' alt='camera'>
	</div>
</div>

<style>
	.wrapper {
		position: absolute;
		top: var(--s-4);
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
		width: 100%;
		height: 100%;
		transform: translate(-15%, -51%);
		/* transition: transform 250ms ease-in-out, left 250ms ease-in, top 250ms ease-out; */
		transition: all 250ms ease-out;
	}
</style>