<script lang='ts'>
	import { onMount } from 'svelte';
	import type { SvelteComponent } from 'svelte'

	export let props: any
	export let component: SvelteComponentConstructor<SvelteComponent, any>

	let container: HTMLElement
	let animationFinished = false

	onMount(() => {
		// @ts-ignore
		let folded = new OriDomi(container,  {
			vPanels:          5,    // number of panels when folding left or right (vertically oriented)
			speed:            1200, // folding duration in ms
			shadingIntensity: 3,    // lessen the shading effect
			maxAngle:         40,   // keep the user's folds within a range of -40 to 40 degrees
			touchEnabled: false,
		});

		// container.childNodes.forEach(node => {
		// 	node.eve
		// })

		folded.reveal(100)
			.wait(1000)
			.reveal(0)

		setTimeout(() => {
			folded.destroy(() => {
				console.log('aesjasjfaskdfj;laskd')
				animationFinished = true
				folded = null
			})
		}, 1000)
	})
</script>

<!-- Rerender after animation finishes so that event listeners are re initialized -->
{#if animationFinished == false}
	<div class='container' bind:this={container}>
		<svelte:component this={component} {...props} />
	</div>
{:else}
	<div class='container' bind:this={container}>
		<svelte:component
		on:click={e => console.log(e)} 
		this={component} {...props} />
	</div>
{/if}

<style>
	.container {
		margin: var(--margin);
	}
</style>