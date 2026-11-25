import { api } from "#lib/server/api.js";

export async function handle({ event, resolve }) {
    const token = event.cookies.get("session");
    event.locals.token = token ?? null;
    event.locals.user = null;

    if (token) {
        const { ok, status, data } = await api("/auth/me", { token });
        if (ok) {
        event.locals.user = data;
        } else if (status === 401) {
        event.cookies.delete("session", { path: "/" });
        event.locals.token = null;
        }
    }
    console.log("hooks user:", event.locals.user);
    return resolve(event);
}