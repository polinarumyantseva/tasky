export const debounce = <Args extends unknown[]>(
	fn: (...args: Args) => void,
	delay: number
): ((...args: Args) => void) => {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: Args) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(fn, delay, ...args);
	};
};
