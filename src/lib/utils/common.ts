
export const wait = async (ms: number): Promise<void> => 
	new Promise(resolve => {
		setTimeout(resolve, ms)
	})

export const dedupe = <T>(array: T[]): T[] => {
	return [...new Set(array)]
}

export const lowToHigh = <T, Key extends keyof T>(key: Key | ((t: T) => number)) => (a: T, b: T): number => {
	const getSort = typeof key === 'function'
		? key
		: (x: T) => x[key]
	return (+getSort(a)) - (+getSort(b))
}

export const highToLow = <T, Key extends keyof T>(key: Key | ((t: T) => number)) => (a: T, b: T): number => {
	const getSort = typeof key === 'function'
		? key
		: (x: T) => x[key]
	return (+getSort(b)) - (+getSort(a))
}

export const choice = <T>(array: T[]): T => 
	array[Math.floor(Math.random() * array.length)]

export const last = <T>(x: T[] = []): T => x[x?.length - 1]

// modified to where stop is exclusive: https://stackoverflow.com/a/55800893/5770245
export const range = (stop: number, start=0, step=1): number[] => 
	Array.from({ length: (stop - start) / step }, (_, i) => start + (i * step));

// https://stackoverflow.com/a/64489535/5770245
export const groupBy = <X, Key extends string | symbol | number>(x: X[], f: (x: X) => Key): Record<Key, X[]> => 
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	x.reduce(
		(acc, b: X) => {
			const key = f(b)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			acc[key] = (acc[key] ?? [])
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			acc[key].push(b)
			return acc
		}, 
		{}
	)

export function debounce(func: (..._) => void, timeout = 300): (..._) => void {
	let timer
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => { func.apply(this, args); }, timeout);
	}
}

// https://github.com/d3/d3-array/blob/main/src/sum.js
export const sum = <T extends number>(values: T[], valueof: (x: T) => T): number => {
	let sum = 0;
	if (valueof === undefined) {
		for (let value of values) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			// eslint-disable-next-line no-cond-assign
			if (value = +value) {
				sum += value;
			}
		}
	} else {
		let index = -1;
		for (let value of values) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			// eslint-disable-next-line no-cond-assign
			if (value = +valueof(value, ++index, values)) {
				sum += value;
			}
		}
	}
	return sum;
}