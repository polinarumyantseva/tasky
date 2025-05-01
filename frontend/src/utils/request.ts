export function request(url: string, method?: 'POST' | 'PATCH' | 'PUT' | 'DELETE', data?: object) {
	return fetch(url, {
		headers: {
			'content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
}
