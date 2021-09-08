<script lang='ts'>
	import { fly } from 'svelte/transition';
	import MicrophonePhysicsBody from './PhysicsBody.svelte';
	import { COLORS } from '$lib/constants';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher()
	const SpeechRecognition: typeof window.SpeechRecognition = window.SpeechRecognition 
		// @ts-ignore
		|| window.webkitSpeechRecognition
	const recognition = new SpeechRecognition()

	let transcription = ''
	let transcribing = false

	recognition.interimResults = true

	recognition.onaudiostart = (e) => {
		transcribing = true
		transcription = ''
	}

	recognition.onspeechend = (e) => {
		transcribing = false

		dispatch('question', { question: transcription })

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
	linkColor={transcribing ? COLORS.white : '#DADADA'}
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