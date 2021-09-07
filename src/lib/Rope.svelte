<script lang='ts'>
	import { Render, Composites, Composite, Constraint, MouseConstraint, Engine, Runner, Body, Mouse, Bodies,  } from 'matter-js'
	import { onDestroy, onMount } from 'svelte';

	export let width: number
	export let height: number

	let container: HTMLDivElement
	let stop: () => void

	onMount(() => {
		stop = chains(container).stop
	})

	onDestroy(() => {
		if (stop) stop()	
	})

	const chains = (element: HTMLElement) => {
		// create engine
		const engine = Engine.create()
		const world = engine.world


		// create renderer
		const render = Render.create({
			element,
			engine: engine,
			options: {
				wireframes: false,
				width,
				height,
				// background: 'transparent',	
				background: 'white',	
				wireframeBackground: 'transparent',
			}
		});

		Render.run(render)

		// create runner
		const runner = Runner.create();
		Runner.run(runner, engine);

		// add bodies
		const group = Body.nextGroup(true);

		const numLinks = 5

		let itemWidth = 50
		let itemHeight = 200
		let xOffset = 10
			
		const rope = Composites.stack(height * .45, 0, numLinks, 1, 0, 0, function(x, y, i) {
			if (i == numLinks - 1) {
				return Bodies.rectangle(x - 20, y, itemWidth, itemHeight * 3, {
					collisionFilter: { group }, 
					// frictionAir: .01,
					render: {
						sprite: {
							xScale: 2,
							yScale: 2,
							texture: 'mic.png',
						},
					},
					angle: Math.PI / 2,
				});
			} else {
				return Bodies.rectangle(x - 20, y, itemHeight, itemWidth, { 
					collisionFilter: { group }, 
					// frictionAir: .05,
				})
			}
		});

		console.log({ x: rope.bodies[0].position.x, y: rope.bodies[0].position.y })
		
		Composites.chain(rope, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 })

		const tiedTo = rope.bodies.at(0) 

		Composite.add(rope, Constraint.create({ 
			bodyB: tiedTo,
			pointA: { x: tiedTo.position.x, y: tiedTo.position.y },
			pointB: { x: -20, y: 0 },
			stiffness: 0.5,
		}));
		
		Composite.add(world, [
			rope,
			// Bodies.rectangle(0, 600, 1200, 50.5, { isStatic: true })
		])

		// add mouse control
		const mouse = Mouse.create(render.canvas),
			mouseConstraint = MouseConstraint.create(engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.2,
					render: {
						visible: false
					},
				},
			})
			
		Composite.add(world, mouseConstraint)

		// keep the mouse in sync with rendering
		render.mouse = mouse

		// fit the render viewport to the scene
		Render.lookAt(render, {
			min: { x: 0, y: 0 },
			max: { x: height, y: width }
		})

		return {
			stop: function() {
				Render.stop(render);
				Runner.stop(runner);
			}
		};
	};
</script>

<div bind:this={container}></div>