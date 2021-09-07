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
	<div class='image'>
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

	h2 {
		text-align: center;
		padding: var(--s-2);
		background-color: var(--white);
	}
</style>