<script lang='ts'>
	import { fly, fade } from 'svelte/transition'

	export let refresh = ''
</script>
  
{#key refresh}
	<div 
		in:fade={{  duration: 500, }}
		out:fade={{ duration: 500, }}
	>
		<slot />
	</div>
{/key}