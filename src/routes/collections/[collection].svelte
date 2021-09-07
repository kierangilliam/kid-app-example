<script>
	import { receive, send } from "$lib/animations/crossfade";
	import { goto } from '$app/navigation';
	import { page } from "$app/stores";
	import { getCollection } from "$lib/state";

	$: id = $page.params.collection
	$: collection = getCollection(id)


</script>

<route-main>
	<button on:click={() => goto('/')}>home</button>

	<img in:receive={{ key: `collection-image-${id}` }} src="abc" alt="">

	{#if $collection.state === 'loading'}
		...
	{:else if $collection.state === 'error'}
		{$collection.error}
	{:else if $collection.state === 'ready'}
		<h2
			in:receive={{ key: `collection-title-${id}` }}
			out:send={{ key: `collection-title-${id}` }}
		>
			{$collection.data.name}
		</h2>
	{/if}
</route-main>

<style>
	h2 {
		color: var(--white);
	}
</style>