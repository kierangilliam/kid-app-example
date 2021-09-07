<script lang='ts'>
	import { onMount } from "svelte";

	let container: HTMLElement

	onMount(() => {
		// @ts-ignore
		const folded = new OriDomi(container,  {
			vPanels:          5,    // number of panels when folding left or right (vertically oriented)
			speed:            1200, // folding duration in ms
			shadingIntensity: 3,    // lessen the shading effect
			maxAngle:         40,   // keep the user's folds within a range of -40 to 40 degrees
		});

		folded.reveal(100);
		
		setTimeout(() => {
			folded.reveal(5)
		}, (700 * Math.random()) + 1200)
	})
</script>

<div class="container" bind:this={container}>
	<slot />
</div>

<style>

</style>