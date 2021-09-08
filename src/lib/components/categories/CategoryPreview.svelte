<script lang='ts'>
	import type { CategoryPreview } from '$lib/state'
	import { createEventDispatcher } from 'svelte'
	import { fly } from 'svelte/transition'

	export let category: CategoryPreview
	export let transitionDelay: number

	$: ({ name, imageUrl } = category)

	const dispatch = createEventDispatcher()

	const onPointerUp = () => {
		dispatch('pointerup', { id: category.id })
	}
</script>

<div 
	class='container' 
	on:pointerup={onPointerUp}
	in:fly={{ x: 150, delay: transitionDelay }}
>
	<div class='image wrapper'>
		<img src={imageUrl} alt={name}>
	</div>

	<div class='name wrapper'>
		<h2>{name}</h2>
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
		cursor: pointer;
	}

	.container:hover .image {
		animation: rotate .5s;
		animation-iteration-count: infinite;
		/* Step-end forces the easing to be discrete instead of linear */
		animation-timing-function: step-end;
		animation-direction: alternate;
	}

	.container:active .image {
		transition: transform 250ms ease-in;
		transform: scale(.9);
	}

	.name {
		margin-top: var(--s-6);
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

		/* Simulate border outline around transparent pn https://stackoverflow.com/a/55012328/5770245 */
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

	@keyframes rotate {
		0% {
			transform: rotate(-8deg);
		}
		50% {
			transform: rotate(8deg);
		}
	}
</style>