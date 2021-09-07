<script lang='ts'>
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';

	let visible = false

	const dispatch = createEventDispatcher()

	const onClick = () => {
		dispatch('click')
	}

	onMount(() => {
		visible = true
	})
</script>

{#if visible}
	<div class='container' on:click={onClick} in:fly={{ y: -100, delay: 250, opacity: 1, duration: 1000, easing: bounceOut }}>
		<div class='string'></div>
		<div class='mic'>MIC</div>
	</div>
{/if}

<style>
	.container {
		--size: 125px;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 20vw;
		width: var(--size);
		height: var(--size);
	}

	.mic {
		position: absolute;
		bottom: 0;
		color: var(--white);
		background-color: var(--black);
	}

	.string {
		/* extra length gives the string room to bounce */
		--length: 120%;
		position: absolute;
		height: var(--length);
		top: calc(100% - var(--length));
		width: 2px;
		bottom: 0;
		color: var(--white);
		background-color: var(--black);
	}
</style>