export type Safe<T> =
	| {
			error: false;
			data: T;
	  }
	| {
			error: true;
			msg: string;
	  };
export function safe<T>(promise: Promise<T>): Promise<Safe<T>>;
export function safe<T>(func: () => T): Safe<T>;

/**
 * Safely execute a promise or function
 * @param {Promise<T> | (() => T)} promiseOrFunc - The promise or function to execute
 * @returns {Promise<Safe<T>> | Safe<T>} - The result of the promise or function
 * @template T
 */
export function safe<T>(promiseOrFunc: Promise<T> | (() => T)): Promise<Safe<T>> | Safe<T> {
	if (promiseOrFunc instanceof Promise) {
		return safeAsync(promiseOrFunc);
	}
	return safeSync(promiseOrFunc);
}

/**
 * Safely execute an async function
 * @param {Promise<T>} promise - The promise to execute
 * @returns {Promise<Safe<T>>} - The result of the promise
 * @template T
 * @private
 */
async function safeAsync<T>(promise: Promise<T>): Promise<Safe<T>> {
	try {
		const data = await promise;
		return { data, error: false };
	} catch (e) {
		console.error(e);
		if (e instanceof Error) {
			return { error: true, msg: e.message };
		}
		return { error: true, msg: 'Something went wrong' };
	}
}

/**
 * Safely execute a sync function
 * @param {() => T} func - The function to execute
 * @returns {Safe<T>} - The result of the function
 * @template T
 * @private
 */
function safeSync<T>(func: () => T): Safe<T> {
	try {
		const data = func();
		return { error: false, data };
	} catch (e) {
		console.error(e);
		if (e instanceof Error) {
			return { error: true, msg: e.message };
		}
		return { error: true, msg: 'Something went wrong' };
	}
}
