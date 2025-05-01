export function timeToSeconds(time: string): number {
	const parts = time.split(':');

	if (parts.length < 2 || parts.length > 3) {
		throw new Error('Неверный формат времени. Используйте HH:MM или HH:MM:SS');
	}

	const [hours, minutes, seconds = 0] = parts.map(Number);

	if (minutes >= 60 || seconds >= 60) {
		throw new Error('Неверное значение минут или секунд');
	}

	return hours * 3600 + minutes * 60 + seconds;
}

export function formatTime(givenSeconds: number | string, showSeconds = true) {
	if (typeof givenSeconds === 'string') givenSeconds = +givenSeconds;

	const hours = Math.floor(givenSeconds / 3600);
	const minutes = Math.floor((givenSeconds - hours * 3600) / 60);
	const seconds = givenSeconds - hours * 3600 - minutes * 60;

	return showSeconds
		? `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`
		: `${padStart(hours)}:${padStart(minutes)}`;
}

function padStart(value: number) {
	return value < 10 ? `0${value}` : `${value}`;
}
