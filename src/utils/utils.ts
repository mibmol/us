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

export function randomInt(max: number): number {
	let _max = max;
	if (_max > Number.MAX_SAFE_INTEGER) {
		_max = Number.MAX_SAFE_INTEGER;
	}
	return Math.floor(Math.random() * _max);
}

export function randomString(length: number = 6): string {
	let count = Math.floor(length);
	if (count <= 0) return '';
	let result = '';
	while (count-- > 0) {
		let index = randomInt(ALPHANUMERIC.length);
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
