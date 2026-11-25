import { fail, redirect } from "@sveltejs/kit";
import { dev } from "$app/env";
import { api } from "#lib/server/api.js";

export function load({ locals }) {
  if (locals.user) {
    redirect(303, "/games/battleship");
  }
}

export const actions = {
    default: async ({ request, cookies }) => {
        const form = await request.formData();
        const email = String(form.get("email") ?? "");
        const password = String(form.get("password") ?? "");

        const { ok, status, data } = await api("/auth/login", { method: "POST", body: { email, password } });
        if (!ok) {
            return fail(status, { email, error: data?.error ?? "Login failed" });
        }

        cookies.set("session", data.token, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: !dev,
            expires: new Date(data.expiresAt),
        });
        console.log("login");
        redirect(303, "/games/battleship");
    },
};