export const wait = async (ms: number): Promise<number> => {
	new Promise((resolve, _reject) => {
		setTimeout(resolve, ms)
	})
}