<svelte:window bind:innerWidth={windowWidth} />

<script lang='ts'>
	import { Composites, World, Composite, Constraint, MouseConstraint, Engine, Body, Mouse, Bodies,  } from 'matter-js'
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { range } from '$lib/utils';

	export let numberOfLinks: number
	export let linkSize: number
	export let linkColor: string

	const dispatch = createEventDispatcher()

	let container = document.body
	let links: HTMLElement[]
	let animationFrameId: number
	let windowWidth: number

	$: updateLinkColors(linkColor)

	onMount(() => {
		links = range(numberOfLinks).map((_, i) => {
			const link = document.createElement('div')

			link.style.width = `${linkSize}px`
			link.style.height = `${linkSize / 6}px`
			link.classList.add('link-physics-body')

			container.appendChild(link)
			
			if (i == numberOfLinks - 1) {
				const img = document.createElement('img')
				img.src = 'mic.png'
				img.style.width = `${linkSize}px`
				img.draggable = false
				link.appendChild(img)

				link.addEventListener('pointerup', () => {
					dispatch('pointerup')
				})

				link.addEventListener('pointerdown', () => {
					dispatch('pointerdown')
				})
			}

			updateLinkColors(linkColor)

			return link
		})

		const engine = Engine.create()
		const renderLinks = initializeLinks(engine, links)

		initializeMouse(engine)

		const render = () => {
			renderLinks()
			Engine.update(engine);
			animationFrameId = requestAnimationFrame(render);
		}

		render()
	})

	onDestroy(() => {
		cancelAnimationFrame(animationFrameId)

		links.forEach(link => container.removeChild(link))
	})

	const updateLinkColors = (linkColor: string) => {
		if (!links) return

		links.forEach((link, i) => {
			if (i != numberOfLinks -1)
				link.style.background = linkColor
		})
	}

	const initializeLinks = (engine: Engine, links: HTMLElement[]) => {
		const renderLink = (body: Body, i: number) => {
			const { x, y } = body.position;
			const elem = links[i]

			// TODO get width/height to instead stretch out segments so there is no gap
			elem.style.top = `${y - 50}px`;
			elem.style.left = `${x - 20}px`;
			elem.style.transform = `rotate(${body.angle}rad)`;
		}

		const group = Body.nextGroup(true);

		const linkBodies = []
			
		const rope = Composites.stack(windowWidth * .75, 0, numberOfLinks, 1, 0, 0, (x, y, i) => {
			let chainLink: Body

			if (i == numberOfLinks - 1) {
				chainLink = Bodies.rectangle(x - 20, y, linkSize * 3, linkSize * 5, {
					collisionFilter: { group }, 
					angle: Math.PI / 2,
				});
			} else {
				chainLink = Bodies.rectangle(x - 20, y, linkSize, linkSize, { 
					collisionFilter: { group }, 
				})
			}
			
			linkBodies.push(chainLink)
			return chainLink
		});

		Composites.chain(rope, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2, render: { type: 'line' } });

		Composite.add(rope, Constraint.create({ 
			bodyB: rope.bodies[0],
			pointA: { x: rope.bodies[0].position.x, y: rope.bodies[0].position.y },
			pointB: { x: -20, y: 0 },
			stiffness: 0.5,
		}))
		
		Composite.add(engine.world, [rope])

		return () => {
			linkBodies.map(renderLink)
		}
	}

	const initializeMouse = (engine: Engine) => {
		const mouseConstraint = MouseConstraint.create(engine, {
			mouse: Mouse.create(container),
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				},
			},
		})

		World.add(engine.world, [mouseConstraint])
	}
</script>

<style>
	:global(.link-physics-body) {
		position: absolute;
		background: #111;
		cursor: move;
		pointer-events: all;
	}

	:global(.link-physics-body:last-of-type) {
		background: transparent;
	}
</style>