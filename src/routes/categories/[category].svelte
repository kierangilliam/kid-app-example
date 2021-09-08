<script lang='ts'>
	import { fade, fly } from 'svelte/transition'
	import { page } from '$app/stores'
	import { getCategory } from '$lib/state'
	import BackButton from '$lib/components/BackButton.svelte'
	import TopicsArea from './_components/TopicsArea.svelte'
	import { cubicOut } from 'svelte/easing'

	$: id = $page.params.category
	$: category = getCategory(id)
</script>

<route-main>
	{#if $category.state === 'loading'}
		<!-- TODO Ghost elements -->
		...
	{:else if $category.state === 'error'}
		{$category.error}
	{:else if $category.state === 'ready'}
		<div class='gutter'>
			<BackButton back={'/'} />
		</div>

		<div class='content'>
			<div class='title' in:fade>
				<img src={$category.data?.imageUrl} alt=''>

				<h1>{$category.data?.name}</h1>
			</div>

			<div class='topics-area'>
				<TopicsArea topics={$category.data.topics} />
			</div>
		</div>

		<div class='video' in:fly={{ x: 1000, duration: 1000, easing: cubicOut }}>
			<!-- svelte-ignore a11y-media-has-caption -->
			<video muted autoplay={true}>
				<source src='/felines/lions.mp4' type='video/mp4' />
			</video>
		</div>
	{/if}
</route-main>

<style>
	route-main {
		display: grid; 
		grid-template-columns: .1fr 1.6fr; 
		grid-template-areas: 'gutter content';
		width: 100%; 
		height: 100%; 
		overflow: hidden;
		/* Overwrite view padding safe inset */
		padding-bottom: 0;
	}

	.gutter {
		grid-area: gutter;
		display: flex;
		justify-content: center;
	}

	.content {
		grid-area: content; 
		display: grid; 
		grid-template-columns: 1fr; 
		grid-template-rows: 0.2fr 1.8fr; 
		row-gap: var(--s-8);
		grid-template-areas: '.' '.'; 
		overflow-y: scroll;
	}

	.title {
		display: flex;
		align-content: center;
	}
	.title h1 {
		color: var(--white);
	}
	.title img {
		max-height: 50px;
		margin-left: var(--s-4);
		margin-right: var(--s-4);
	}

	.video {
		position: absolute;
		right: 0;
		display: flex;
		justify-content: flex-end;
		height: 100vh;
		width: 40vw;
		box-shadow: var(--shadow-3);
		background: var(--darkGray);
	}
	.video video {
		object-fit: cover;
		height: 100%;
		width: 100%;
	}
</style>