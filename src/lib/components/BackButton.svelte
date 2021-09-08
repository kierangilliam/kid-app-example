<script>
	import { goto } from "$app/navigation";

	export let back = '/'
</script>

<div on:pointerup={() => goto(back)}>
	<img src="/arrow-left.png" alt="back">
</div>

<style>
	img {
		height: 44px;
		filter: invert();
	}
</style>