export interface Env {
	FOOTBALL_API_KEY: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// поддержка preflight
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, OPTIONS',
					'Access-Control-Allow-Headers': '*',
				},
			});
		}

		const apiUrl = 'https://api.football-data.org/v4' + url.pathname.replace('/api', '') + url.search;

		const response = await fetch(apiUrl, {
			headers: {
				'X-Auth-Token': env.FOOTBALL_API_KEY,
			},
		});

		const data = await response.text();

		return new Response(data, {
			status: response.status,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		});
	},
} satisfies ExportedHandler<Env>;
