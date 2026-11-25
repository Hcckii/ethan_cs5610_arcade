import { redirect } from "@sveltejs/kit";
import { api } from "#lib/server/api.js";

export async function POST({ cookies, locals }) {
  if (locals.token) {
    await api("/auth/logout", { method: "POST", token: locals.token });
  }
  cookies.delete("session", { path: "/" });
  redirect(303, "/");
}