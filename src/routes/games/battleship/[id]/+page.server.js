import { error, fail } from '@sveltejs/kit';
import { api } from '#lib/server/api.js';

export async function load({ params, locals }) {
	// locals.token is null for logged-out visitors; the API still lets them view finished games
	const { ok, status, data } = await api(`/games/${encodeURIComponent(params.id)}`, {
		token: locals.token
	});

	if (ok) {
		return { game: data, problem: null };
	}
	if (status === 404) {
		error(404, 'Game not found');
	}
	// 401 (not logged in, game not over) and 403 (not a player) are shown on the page with a message,
	// so the visitor still has the navbar and a way to log in
	return {
		game: null,
		problem: { status, message: data?.error ?? 'Could not load this game' }
	};
}

export const actions = {
	shoot: async ({ request, params, locals }) => {
		if (!locals.token) {
			return fail(401, { error: 'Log in to play' });
		}

		// The clicked square's button sends its value as "x,y"
		const form = await request.formData();
		const [x, y] = String(form.get('cell') ?? '')
			.split(',')
			.map(Number);

		// The API checks that x and y are valid, so bad input comes back as a 400
		const res = await api(`/games/${encodeURIComponent(params.id)}/shots`, {
			method: 'POST',
			token: locals.token,
			body: { x, y }
		});
		if (!res.ok) {
			return fail(res.status, { error: res.data?.error ?? 'Could not fire' });
		}

		// The load function runs again after this, so the page gets the updated boards
		return {
			hit: res.data.hit,
			sunk: res.data.sunk,
			gameOver: res.data.gameOver,
			aiShot: res.data.aiShot
		};
	},

	// Extra credit: make the AI the second player in my own waiting game
	challengeAi: async ({ params, locals }) => {
		if (!locals.token) {
			return fail(401, { error: 'Log in to challenge the AI' });
		}
		const res = await api(`/games/${encodeURIComponent(params.id)}/players`, {
			method: 'POST',
			token: locals.token,
			body: { ai: true }
		});
		if (!res.ok) {
			return fail(res.status, { error: res.data?.error ?? 'Could not challenge the AI' });
		}
		return { challenged: true };
	}
};