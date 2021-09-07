<script lang='ts'>
	import { Render, Composites, World, Composite, Constraint, MouseConstraint, Engine, Runner, Body, Mouse, Bodies,  } from 'matter-js'
	import { onDestroy, onMount } from 'svelte';
	import { range } from './utils';

	export let width: number
	export let height: number

	let container: HTMLDivElement
	let stop: () => void

	const numberOfLinks = 3

	onMount(() => {
		// stop = chains(container).stop

		const links = range(numberOfLinks).map(_ => {
			const link = document.createElement('div')
			link.classList.add('link-physics-body')
			container.appendChild(link)
			return link
		})

		createLinks(links)
	})

	onDestroy(() => {
		if (stop) stop()	
	})

	const createLinks = (links: HTMLElement[]) => {
		const engine = Engine.create();  
		const box = {
			body: Bodies.rectangle(150, 0, 40, 40),
			elem: links[0],
			render() {
				const {x, y} = this.body.position;
				this.elem.style.top = `${y - 20}px`;
				this.elem.style.left = `${x - 20}px`;
				this.elem.style.transform = `rotate(${this.body.angle}rad)`;
			},
		};

		const ground = Bodies.rectangle(
			200, 200, 400, 120, {isStatic: true},
		);

		const mouse = Mouse.create(container)
		const mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				},
			},
		})

		World.add(
			engine.world, [box.body, ground, mouseConstraint]
		);

		(function rerender() {
			box.render();
			Engine.update(engine);
			requestAnimationFrame(rerender);
		})();
	}

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

<div bind:this={container}>
<div class="ground"></div>
</div>

<style>
	div {
		position: relative;
		height: 100%;
		width: 100%;
		background: white;
		margin: 0;
	}

	:global(.link-physics-body) {
		position: absolute;
		background: #111;
		height: 40px;
		width: 40px;
		cursor: move;
	}
	.ground {
		position: absolute;
		background: #666;
		top: 140px;
		height: 120px;
		width: 400px;
		}
</style>