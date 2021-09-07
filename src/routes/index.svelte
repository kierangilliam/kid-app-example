<script context="module">
	export const ssr = false
</script>

<script lang='ts'>
	import { goto } from '$app/navigation';
	import { Microphone, CategoryPreview, Camera, FoldedPaperEffect } from '$lib/components';
	import { takePicture } from '$lib/cross-platform';
	import { getCategoryPreviews } from '$lib/state';
	import { Spacer } from '@ollopa/cedar';

	const collections = getCategoryPreviews()

	const onMicrophoneClick = async () => {
		throw new Error('TODO')
	}

	const onCameraClick = async () => {
		const image = await takePicture()
	}

	const onCollectionClick = ({ detail: { id } }) => {
		goto(`/categories/${id}`)
	}
</script>

<route-main>
	<!-- Make room for Camera and Microphone -->
	<Spacer s={48} />

	{#if $collections.state === 'loading'}
		...loading
	{:else if $collections.state === 'ready'}
		<FoldedPaperEffect>
			<section class="collections">
				{#each $collections.data as collection, i}
					<CategoryPreview 
						on:click={onCollectionClick}
						{collection} 
						transitionDelay={i * 250} 
					/>
				{/each}
			</section>
		</FoldedPaperEffect>
	{/if}

	<Microphone on:click={onMicrophoneClick} />
	<Camera 
		--size={'150px'}
		--z-index={100}
		on:click={onCameraClick} 
	/>
</route-main>

<style>
	section {
		margin: var(--s-8); 
		padding: var(--s-6);
		background: var(--sectionBackgroundColor);
		transform: skew(1deg);
	}

	.collections {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: var(--s-2);
		row-gap: var(--s-2);
	}
</style>