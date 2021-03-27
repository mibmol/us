import { ALPHANUMERIC } from './constants';

/**
 * Create an array with chunks of the given array or string with equal chunkSize
 * ex: createChunks([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3)
 * 	return [[1,2,3], [4,5,6], [7,8,9], [10,11]]
 *
 * 	createChunks('abcdefghijk', 3)
 * 	return ['abc', 'def', 'ghi', 'jk']
 */
export function createChunks(array: any[] | string, chunkSize: number): any[] {
	let chunks: any[] = [];
	let n = array.length;
	let i = 0;

	while (i < n) {
		chunks.push(array.slice(i, (i += chunkSize)));
	}
	return chunks;
}

export function randomInt(opt: { min?: number; max?: number }): number {
	let { min, max } = opt;

	if (!min || min < 0) {
		min = 0;
	}
	if (min > max) {
		let temp = min;
		min = max;
		max = temp;
	}
	if (!max || max > Number.MAX_SAFE_INTEGER) {
		max = Number.MAX_SAFE_INTEGER;
	}

	return min + Math.floor(Math.random() * (max - min));
}

export function randomString(length: number = 6): string {
	let count = Math.floor(length);
	if (count <= 0) return '';
	let result = '';
	while (count-- > 0) {
		let index = randomInt({ max: ALPHANUMERIC.length });
		result += ALPHANUMERIC.charAt(index);
	}
	return result;
}

export function sleep(ms: number = 100): Promise<any> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * wrap the try catch from async-await
 */
export async function to<T>(promise: Promise<T>): Promise<[T, Error]> {
	try {
		const result = await promise;
		return [result, null];
	} catch (error) {
		return [null, error];
	}
}

export function nowSeconds(): number {
	return Math.floor(Date.now() / 1000);
}
