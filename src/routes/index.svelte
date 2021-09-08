<script context='module'>
	export const ssr = false
</script>

<script lang='ts'>
	import { goto } from '$app/navigation';
	import { StarfieldBackground, Microphone, CategoryPreviews, Camera, VizzTitle } from '$lib/components';
	import { takePicture } from '$lib/cross-platform';
	import { getCategoryPreviews } from '$lib/state';
	import { setAnimationContext } from '$lib/utils';
	import { Spacer } from '@ollopa/cedar';
	import { onDestroy } from 'svelte';

	const animationId = setAnimationContext()
	const categories = getCategoryPreviews()

	onDestroy(() => {
		cancelAnimationFrame($animationId)
	})

	const handleQuestion = async ({ detail: { question } }) => {
		console.log('TODO: Send to API...', question)
	}

	const onCameraClick = async () => {
		const image = await takePicture()
	}

	const onCategoryClick = ({ detail: { id } }) => {
		goto(`/categories/${id}`)
	}
</script>

<StarfieldBackground />

<route-main>
	<VizzTitle />

	<!-- Make room for Camera and Microphone -->
	<Spacer s={48} />

	{#if $categories.state === 'loading'}
		<!-- Space for a ghost component / some indicator -->
	{:else if $categories.state === 'ready'}
		<CategoryPreviews categories={$categories.data} on:pointerup={onCategoryClick} />
	{/if}

	<Microphone on:question={handleQuestion } />

	<Camera 
		--size={'150px'}
		--z-index={100}
		on:pointerup={onCameraClick} 
	/>
</route-main>