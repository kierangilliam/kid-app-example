<script lang='ts'>
	import { receive, send } from '$lib/animations/crossfade';
	import type { CollectionPreview } from '$lib/state'
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let collection: CollectionPreview
	export let transitionDelay: number

	let container 

	$: ({ id, name, imageUrl } = collection)

	const dispatch = createEventDispatcher()

	onMount(() => {
		// @ts-ignore
		var folded = new OriDomi(container,  {
			vPanels:          5,    // number of panels when folding left or right (vertically oriented)
			speed:            1200, // folding duration in ms
			shadingIntensity: 3,    // lessen the shading effect
			maxAngle:         40,   // keep the user's folds within a range of -40 to 40 degrees
		});

		folded.reveal(100);
		
		setTimeout(() => {
			folded.reveal(10)
		}, (700 * Math.random()) + 1200)

		console.log({ folded })

	})

	const onClick = () => {
		dispatch('click', { id: collection.id })
	}
</script>

<div 
	class='container' 
	on:click={onClick}
	in:fly={{ x: 100, delay: transitionDelay }}
>
	<div
		class='image'
		bind:this={container}
	>
		<img 
			in:send={{ key: `collection-image-${id}` }}
			out:send={{ key: `collection-image-${id}` }}
			src={imageUrl} 
			alt={name}
		>
	</div>

	<div class='title'>
		<h2
			in:receive={{ key: `collection-title-${id}`}}
			out:send={{ key: `collection-title-${id}`}}
		>
			{name}
		</h2>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-self: center;
	}

	.image, .title {
		display: flex;
		justify-content: center;
	}

	.title {
		margin-top: var(--s-4);
	}

	.image {
		background-color: var(--white);
	}

	h2 {
		text-align: center;
		display: inline-block;
		padding: 0 var(--s-3);
		background: var(--yellow);
		color: var(--white);
	}

	img {
		max-height: 200px;
	}
</style>