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

interface Topic {
	id: string
	name: string
}

export interface Collection {
	id: string
	name: string
	imageUrl: string
	topics: Topic[]
}

export type CollectionPreview = Pick<Collection, 'id' | 'imageUrl' | 'name'>

const collectionsMockData: Collection[] = [
	{
		id: 'b',
		name: 'felines',
		imageUrl: 'felines.png',
		topics: [],
	},
	{
		id: 'a',
		name: 'firetrucks',
		imageUrl: 'firetrucks.png',
		topics: [],
	},
]

export const getCollectionPreviews = (): Readable<ResourceState<CollectionPreview[], string>> => {
	const { subscribe, set } = writable<ResourceState<CollectionPreview[], string>>({ state: 'loading' })

	const fetchData = async () => {
		// perform some network request..
		await wait(300)
		return collectionsMockData
	}

	fetchData().then(data => {
		set({ state: 'ready', data })
	})

	return { subscribe }
}

export const getCollection = (id: string): Readable<ResourceState<Collection, string>> => {
	const { subscribe, set } = writable<ResourceState<Collection, string>>({ state: 'loading' })

	const fetchData = async () => {
		// perform some network request..
		await wait(300)

		const collection = collectionsMockData.find(c => c.id === id)

		if (!collection) {
			throw new Error(`Could not find collection ${id}.`)
		}

		return collection
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