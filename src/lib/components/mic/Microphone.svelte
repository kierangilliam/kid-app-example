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
		<div transition:fly={{ y: -50 }}>
			{#each transcription.split(' ') as word, i}
				<span transition:fly={{ y: -20, x: 5, delay: i * 50 }}>
					{word}
				</span>
			{/each}
		</div>
	</div>
{/if}

<MicrophonePhysicsBody 
	linkSize={40}
	numberOfLinks={4}
	linkColor={transcribing ? COLORS.yellow : '#DADADA'}
	on:pointerup={onUp} 
	on:pointerdown={onDown} 
/>

<style>
	.transcription {
		position: absolute;
		width: 100%;
		top: var(--viewPaddingTop);
		display: flex;
		justify-content: center;
	}
	.transcription div {
		position: relative;
		display: inline-block;
		background: var(--white);
		font-weight: var(--weightBolder);
		font-size: var(--h1);
		color: var(--black);
		padding: var(--s-3) var(--s-4);
		box-shadow: var(--shadow-3);
	}
</style>