export function hoursToSeconds(hours) {
	return Math.round(Number(hours) * 3600);
}

export function formatTime(given_seconds, showSeconds = true) {
	const hours = Math.floor(given_seconds / 3600);
	const minutes = Math.floor((given_seconds - hours * 3600) / 60);
	const seconds = given_seconds - hours * 3600 - minutes * 60;

	return showSeconds
		? `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`
		: `${padStart(hours)}:${padStart(minutes)}`;
}

function padStart(value) {
	return value < 10 ? `0${value}` : `${value}`;
}
