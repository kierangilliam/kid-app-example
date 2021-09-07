<script context="module">
	export const ssr = false
</script>

<script lang='ts'>
	import { goto } from '$app/navigation';
	import CollectionPreview from '$lib/components/collections/CollectionPreview.svelte';
	import { Microphone } from '$lib/components';
	import { takePicture } from '$lib/cross-platform';
	import { getCollectionPreviews } from '$lib/state';
	import { Spacer } from '@ollopa/cedar';

	const collections = getCollectionPreviews()

	const onMicrophoneClick = async () => {
		throw new Error('TODO')
	}

	const onCameraClick = async () => {
		const image = await takePicture()
	}

	const onCollectionClick = ({ detail: { id } }) => {
		goto(`/collections/${id}`)
	}
</script>

<route-main>
	<Microphone on:click={onMicrophoneClick} />

	<button on:click={onCameraClick}>camera</button>

	<Spacer s={32} />

	{#if $collections.state === 'loading'}
		...loading
	{:else if $collections.state === 'ready'}
		<section class="collections">
			{#each $collections.data as collection, i}
				<CollectionPreview 
					on:click={onCollectionClick}
					{collection} 
					transitionDelay={i * 250} 
				/>
			{/each}
		</section>
	{/if}
</route-main>

<style>
	section {
		margin: var(--s-8); 
		padding: var(--s-6);
		background: linear-gradient(85deg, 
			rgba(0, 0, 0, 0) 1%, var(--sectionBackgroundColor) 1%,
			var(--sectionBackgroundColor) 99%, rgba(0, 0, 0, 0) 99%
		);
	}

	.collections {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: var(--s-2);
		row-gap: var(--s-2);
	}
</style>