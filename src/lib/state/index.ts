import { wait } from '$lib/utils';
import type { Readable } from "svelte/store";
import { writable } from "svelte/store";

type ResourceState<Data, Error> = {
	state: 'loading' | 'error' | 'ready'
} & ({
	state: 'loading'
} | {
	state: 'ready'
	data: Data
} | {
	state: 'error'
	error: Error
})

export interface Topic {
	id: string
	name: string
	imageUrl: string
	description: string
}

export interface Category {
	id: string
	name: string
	imageUrl: string
	topics: Topic[]
}

export type CategoryPreview = Pick<Category, 'id' | 'imageUrl' | 'name'>

const categoriesMockData: Category[] = [
	{
		id: 'a',
		name: 'felines',
		imageUrl: '/cat.png',
		topics: [
			{
				id: 'a',
				imageUrl: '/felines/lion.jpeg',
				name: 'Big Cats',
				description: 'Meet the kings of the animal kingdom\'s.', 
			},
			{
				id: 'b',
				imageUrl: '/felines/egypt-cat.jpeg',
				name: 'Cats & Egypt',
				description: 'What\'s up with Egyptians and their love of cats?', 
			},
			{
				id: 'c',
				imageUrl: '/felines/snow-cat.jpeg',
				name: 'Cool Cats',
				description: 'Discover cats who like cold climates.', 
			},
		],
	},
	{
		id: 'b',
		name: 'firetrucks',
		imageUrl: '/firetruck.png',
		topics: [],
	},
	{
		id: 'c',
		name: 'technology',
		imageUrl: '/computer.png',
		topics: [],
	},
	{
		id: 'd',
		name: 'dinosaurs',
		imageUrl: '/dinosaur.png',
		topics: [],
	},
	{
		id: 'e',
		name: 'science',
		imageUrl: '/flask.png',
		topics: [],
	},
]

export const getCategoryPreviews = (): Readable<ResourceState<CategoryPreview[], string>> => {
	const { subscribe, set } = writable<ResourceState<CategoryPreview[], string>>({ state: 'loading' })

	const fetchData = async () => {
		// perform some network request..
		await wait(300)
		return categoriesMockData
	}

	fetchData().then(data => {
		set({ state: 'ready', data })
	})

	return { subscribe }
}

export const getCategory = (id: string): Readable<ResourceState<Category, string>> => {
	const { subscribe, set } = writable<ResourceState<Category, string>>({ state: 'loading' })

	const fetchData = async () => {
		// perform some network request..
		await wait(300)

		const category = categoriesMockData.find(c => c.id === id)

		if (!category) {
			throw new Error(`Could not find category ${id}.`)
		}

		return category
	}

	fetchData()
		.then(data => {
			set({ state: 'ready', data })
		})
		.catch((error: Error) => {
			set({ state: 'error', error: error.message })
		})

	return { subscribe }
}