<script lang='ts'>
	import { fly } from 'svelte/transition';
	import MicrophonePhysicsBody from './PhysicsBody.svelte';
	import { COLORS } from '$lib/constants';

	let transcription = ''
	let transcribing = false

	const SpeechRecognition: typeof window.SpeechRecognition = window.SpeechRecognition 
		// @ts-ignore
		|| window.webkitSpeechRecognition
	const recognition = new SpeechRecognition()
	recognition.interimResults = true

	recognition.onaudiostart = (e) => {
		transcribing = true
		transcription = ''
	}

	recognition.onspeechend = (e) => {
		transcribing = false

		// NOTE: where `dispatch('question', { transcription })` would be called

		setTimeout(() => transcription = '', 2000)
	}

	recognition.onresult = (e) => {
		const { confidence, transcript } = e.results[e.resultIndex][0]
		console.log('transcriptin confidence', confidence)
		transcription = transcript
		
		if (e.results[e.resultIndex].isFinal)
			transcription += '?'
	}

	const onDown = () => {
		recognition.start()
	}

	const onUp = () => {
		recognition.stop()
	}
</script>

{#if transcription}
	<div class='transcription'>
		{#each transcription.split(' ') as word, i}
			<div transition:fly={{ y: -20, x: 5, delay: i * 50 }}>
				{word}
			</div>
		{/each}
	</div>
{/if}

<MicrophonePhysicsBody 
	linkSize={40}
	numberOfLinks={4}
	linkColor={transcribing ? COLORS.white : COLORS.black}
	on:pointerup={onUp} 
	on:pointerdown={onDown} 
/>

<style>
	.transcription {
		position: absolute;
		width: 100%;
		top: 0;
		display: flex;
		justify-content: center;
		font-weight: var(--weightBolder);
		font-size: var(--h1);
		color: var(--white);
	}
	.transcription div {
		margin: 0 var(--s-1);
	}
</style>