<script context="module">
	export const ssr = false
</script>

<script lang='ts'>
	import CollectionPreview from '$lib/components/collections/CollectionPreview.svelte';
	import Microphone from '$lib/components/Microphone.svelte';
	import { takePicture } from '$lib/cross-platform';
	import { collections } from '$lib/state';
	import { Spacer } from '@ollopa/cedar';

	const onMicrophoneClick = async () => {
		throw new Error('TODO')
	}

	const onCameraClick = async () => {
		const image = await takePicture()
	}
</script>

<Microphone on:click={onMicrophoneClick} />

<button on:click={onCameraClick}>camera</button>

<Spacer s={32} />

{#if $collections.state === 'loading'}
	...loading
{:else if $collections.state === 'ready'}
	<section class="collections">
		{#each $collections.data as collection, i}
			<CollectionPreview 
				{collection} 
				transitionDelay={i * 250} 
			/>
		{/each}
	</section>
{/if}

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