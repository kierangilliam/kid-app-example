<script lang='ts'>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';
	import MicrophonePhysicsBody from '$lib/Rope.svelte';

	let visible = false
	let transcription = ''
	let transcribing = false

	// @ts-ignore
	const SpeechRecognition: typeof window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
	const recognition = new SpeechRecognition()
	recognition.interimResults = true

	recognition.onaudiostart = (e) => {
		transcribing = true
		transcription = ''
	}

	recognition.onspeechend = (e) => {
		transcribing = false

		setTimeout(() => {
			transcription = ''
		}, 2000)
	}

	recognition.onresult = (e) => {
		console.log('transcriptin confidence', e.results[e.resultIndex][0].confidence)

		transcription = e.results[e.resultIndex][0].transcript
	}

	const onDown = () => {
		recognition.start()
	}

	onMount(() => {
		visible = true
	})
</script>

{#if transcription}
	<div class="transcription">
		{#each transcription.split(' ') as word, i}
			<div transition:fly={{ y: -20, x: 5, delay: i * 50 }}>
				{word}
			</div>
		{/each}
	</div>
{/if}

{#if visible}
	<div 
		class='container' 
		on:pointerdown={onDown}
		style='width: {800}px; height: {200}px'
	>
		<MicrophonePhysicsBody width={800} height={400} />
	</div>
{/if}

<style>
	.transcription {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: center;
		font-weight: var(--weightBolder);
		font-size: var(--h1);
	}
	.transcription div {
		margin: 0 var(--s-1);
	}

	.container {
		position: fixed;
		--size: 125px;
		width: var(--size);
		height: var(--size);
		top: 0;
		right: 20vw;
	}
</style>