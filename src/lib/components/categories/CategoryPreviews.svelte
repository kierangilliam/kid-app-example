<script lang='ts'>
	import type { CategoryPreview as ICategoryPreview } from "$lib/state";
	import { createEventDispatcher } from "svelte";
	import CategoryPreview from "./CategoryPreview.svelte";

	export let categories: ICategoryPreview[]

	const dispatch = createEventDispatcher()

	const onCategoryClick = ({ detail: { id } }) => {
		dispatch('pointerup', { id })
	}
</script>

<section class="categories">
	{#each categories as category, i (category.id)}
		<CategoryPreview
			on:pointerup={onCategoryClick}
			{category} 
			transitionDelay={i * 250} 
		/>
	{/each}
</section>

<style>
	section {
		margin: var(--s-8);
		padding: var(--s-6);
		background: rgba(242, 200, 76, 0.2);
		transform: skew(1deg);
		background-blend-mode:multiply;
	}

	.categories {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: var(--s-2);
		row-gap: var(--s-12);
	}
</style>