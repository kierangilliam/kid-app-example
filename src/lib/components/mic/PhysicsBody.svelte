<svelte:window bind:innerWidth={windowWidth} />

<script lang='ts'>
	import { Composites, World, Composite, Constraint, MouseConstraint, Engine, Mouse, Bodies, Body } from 'matter-js'
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { getAnimationContext, range } from '$lib/utils';

	export let numberOfLinks: number
	export let linkSize: number
	export let linkColor: string

	const dispatch = createEventDispatcher()
	const { register } = getAnimationContext()

	let container: HTMLElement
	let links: HTMLElement[]
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

				const imageWrapper = document.createElement('div')
				imageWrapper.style.width = `${linkSize}px`
				imageWrapper.style.height = `${linkSize}px`

				imageWrapper.append(img)
				link.appendChild(imageWrapper)

				link.addEventListener('pointerup', () => {
					dispatch('pointerup')
				})

				link.addEventListener('pointerdown', () => {
					console.log('down')
					dispatch('pointerdown')
				})
			}

			return link
		})

		updateLinkColors(linkColor)

		const engine = Engine.create()
		const renderLinks = initializeLinks(engine, links)

		initializeMouse(engine)

		register('mic physics body', () => {
			renderLinks()
			Engine.update(engine)
		})
	})

	onDestroy(() => {
		links.forEach(link => container.removeChild(link))
	})

	const updateLinkColors = (linkColor: string) => {
		if (!links) return

		links.forEach((link, i) => {
			if (i != numberOfLinks - 1) {
				link.style.background = linkColor
			}
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
			mouse: Mouse.create(document.body),
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

<div class="container" bind:this={container}></div>

<style>
	:global(.link-physics-body) {
		position: absolute;
		cursor: move;
		pointer-events: all;
	}

	:global(.link-physics-body:last-of-type) {
		background: transparent;
	}
</style>