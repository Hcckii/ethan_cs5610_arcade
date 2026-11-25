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
  
      const signup = await api("/auth/signup", { method: "POST", body: { email, password } });
      if (!signup.ok) {
        return fail(signup.status, { email, error: signup.data?.error ?? "Registration failed" });
      }
  
      const login = await api("/auth/login", { method: "POST", body: { email, password } });
      if (!login.ok) {
        return fail(login.status, { email, error: login.data?.error ?? "Login failed" });
      }
  
      cookies.set("session", login.data.token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: !dev,
        expires: new Date(login.data.expiresAt),
      });
      redirect(303, "/games/battleship");
    },
  };