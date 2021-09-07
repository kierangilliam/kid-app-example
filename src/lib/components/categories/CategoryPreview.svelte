<script lang='ts'>
	import { receive, send } from '$lib/animations/crossfade';
	import type { CollectionPreview } from '$lib/state'
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	export let collection: CollectionPreview
	export let transitionDelay: number

	$: ({ id, name, imageUrl } = collection)

	const dispatch = createEventDispatcher()


	const onClick = () => {
		dispatch('click', { id: collection.id })
	}
</script>

<div 
	class='container' 
	on:click={onClick}
	in:fly={{ x: 100, delay: transitionDelay }}
>
	<div class='wrapper'>
		<img 
			in:send={{ key: `collection-image-${id}` }}
			out:send={{ key: `collection-image-${id}` }}
			src={imageUrl} 
			alt={name}
		>
	</div>

	<div class='title wrapper'>
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

	.wrapper {
		display: flex;
		justify-content: center;
	}

	.title {
		margin: var(--s-4) 0;
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
		--stroke-pos: 3px;
		--stroke-neg: -3px;
		--stroke-color: var(--white);
		filter: drop-shadow(var(--stroke-pos) 0 0 var(--stroke-color)) 
			drop-shadow(var(--stroke-neg) 0 var(--stroke-color))
			drop-shadow(0 var(--stroke-pos) 0 var(--stroke-color))
			drop-shadow(0 var(--stroke-neg) 0 var(--stroke-color))
			drop-shadow(var(--stroke-pos) var(--stroke-pos) 0 var(--stroke-color)) 
			drop-shadow(var(--stroke-pos) var(--stroke-neg) 0 var(--stroke-color))
			drop-shadow(var(--stroke-neg) var(--stroke-pos) 0 var(--stroke-color))
			drop-shadow(var(--stroke-neg) var(--stroke-neg) 0 var(--stroke-color)); 
	}
</style>