import { error, fail, redirect } from '@sveltejs/kit';
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

	// Extra credit: confirm my own fleet (or the random one)
	place: async ({ request, params, locals }) => {
		if (!locals.token) {
			return fail(401, { error: 'Log in to place your ships' });
		}
		const form = await request.formData();
		let ships;
		try {
			ships = JSON.parse(String(form.get('ships') ?? ''));
		} catch {
			return fail(400, { error: 'The fleet could not be read' });
		}
		const res = await api(`/games/${encodeURIComponent(params.id)}/ships`, {
			method: 'POST',
			token: locals.token,
			body: { ships }
		});
		if (!res.ok) {
			return fail(res.status, { error: res.data?.error ?? 'Could not place your ships' });
		}
		return { placedShips: true };
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
	},

	// Surrender a game in progress, or cancel a game that is still waiting for a second player
	surrender: async ({ params, locals }) => {
		if (!locals.token) {
			return fail(401, { error: 'Log in to leave a game' });
		}
		const res = await api(`/games/${encodeURIComponent(params.id)}/players/me`, {
			method: 'DELETE',
			token: locals.token
		});
		if (!res.ok) {
			return fail(res.status, { error: res.data?.error ?? 'Could not leave the game' });
		}
		// A cancelled waiting game no longer exists, so go back to the list.
		// After a surrender the game is finished, so stay here and show the result.
		if (res.data.deleted) {
			redirect(303, '/games/battleship');
		}
		return { surrendered: true };
	}
};