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

export interface Collection {
	title: string
	imageUrl: string
}

export const collections: Readable<ResourceState<Collection[], string>> = (() => {
	const { subscribe, set } = writable<ResourceState<Collection[], string>>({ state: 'loading' })

	const fetchData = async () => {
		// perform some network request..
		await wait(300)
	}

	fetchData().then(_ => {
		const collections: Collection[] = [
			{
				title: 'felines',
				imageUrl: 'felines.png',
			},
			{
				title: 'firetrucks',
				imageUrl: 'firetrucks.png',
			},
		]

		set({ state: 'ready', data: collections })
	})

	return { subscribe }
})()