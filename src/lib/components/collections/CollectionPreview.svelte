<script lang='ts'>
	import type { Collection } from '$lib/state'
	import { fly } from 'svelte/transition';

	export let collection: Collection
	export let transitionDelay: number
</script>

<div class='container' transition:fly={{ x: 100, delay: transitionDelay }}>
	<div class='image'>
		<img src={collection.imageUrl} alt={collection.title}>
	</div>

	<div class='title'>
		<h2>{collection.title}</h2>
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