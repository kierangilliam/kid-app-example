<script lang='ts'>
	import { takePicture } from '$lib/cross-platform';



	const onCameraClick = async () => {
		const image = await takePicture()
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href='https://kit.svelte.dev'>kit.svelte.dev</a> to read the documentation</p>
<button on:click={onCameraClick}>camera</button>
