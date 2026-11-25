import { fail, redirect } from "@sveltejs/kit";
import { api } from "#lib/server/api.js";

export async function load({ locals }) {
    if (!locals.user) {
        return { waiting: [], mine: [], error: null };
    }
    const { ok, status, data } = await api("/games", { token: locals.token });
    if (!ok) {
        return { waiting: [], mine: [], error: data?.error ?? `Could not load games (${status})` };
    }
    return { waiting: data.waiting, mine: data.mine, error: null };
}
export const actions = {
    create: async ({ locals }) => {
        if (!locals.token) {
            return fail(401, { error: "Log in to create a game" });
        }
        const { ok, status, data } = await api("/games", { method: "POST", token: locals.token });
        if (!ok) {
            return fail(status, { error: data?.error ?? "Could not create the game" });
        }
        redirect(303, `/games/battleship/${data.id}`);
    },
  
    join: async ({ request, locals }) => {
        if (!locals.token) {
            return fail(401, { error: "Log in to join a game" });
        }
        const form = await request.formData();
        const id = String(form.get("id") ?? "");
        const { ok, status, data } = await api(`/games/${encodeURIComponent(id)}/players`, {
            method: "POST",
            token: locals.token,
        });
        if (!ok) {
            return fail(status, { error: data?.error ?? "Could not join the game" });
        }
        redirect(303, `/games/battleship/${id}`);
    },
};