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
	<p style="color: white">{path}</p>
	<RouteTransition refresh={path}>
		<slot />
	</RouteTransition>
</Theme>