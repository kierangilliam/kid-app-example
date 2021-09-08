<script lang='ts'>
	import { onMount } from 'svelte'

	let container: HTMLElement

	onMount(() => {
		// @ts-ignore
		let folded = new OriDomi(container,  {
			vPanels:          5,  
			speed:            1200,
			shadingIntensity: 3.5,    
			maxAngle:         80, 
		})

		folded
			.reveal(900)
			.wait(700)
			.reveal(20)
	})
</script>

<div class='wrapper' >
	<div class='title' bind:this={container}>
		VIZZ
	</div>
</div>

<style>
	.wrapper {
		position: absolute;
		width: 100%;
		top: var(--s-12);
		display: flex;
		justify-content: center;
		pointer-events: none;

		--easingFunction: cubic-bezier(0.855, 0.285, 0.390, 0.790);
		animation: twist 3s normal forwards var(--easingFunction);
		animation-iteration-count: 1;
	}

	.title {
		text-align: center;
		background: var(--yellow);
		color: var(--white);
		padding: var(--s-1) var(--s-6);
		font-size: 5rem;
		font-weight: bolder;
		pointer-events: all;
	}

	@keyframes twist {
		0% {
			transform: rotate(10deg) scale(.2);
		}
		50% {
			transform: rotate(-18deg) scale(.7);
		}
		100% {
			transform: rotate(5deg) scale(1);
		}
	}
</style>