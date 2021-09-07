<script context="module">
	export const load = async ({ page }) => ({
		props: {
			path: page.path,
		},
	})
</script>

<script>
	import { Theme, RouteTransition } from '$lib/components'

	export let path
</script>

<Theme>
	<RouteTransition refresh={path}>
		<slot />
	</RouteTransition>
</Theme>