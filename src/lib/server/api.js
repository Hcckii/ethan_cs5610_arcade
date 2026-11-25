import { API_URL } from "$app/env/private";
export async function api(path, { method = "GET", body, token } = {}) {
    const headers = {};
    if (body !== undefined) {
        headers["Content-Type"] = "application/json";
    }
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    let res;
    try {
        res = await fetch(`${API_URL}/api${path}`,{
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        });
        }catch (err) {
            console.error("API request failed:", `${API_URL}/api${path}`, err);
            return { ok: false, status: 503, data: { error: "Cannot reach the game server" } };
        }
//   } catch {
//     return { ok: false, status: 503, data: { error: "Cannot reach the game server" } };
//   }

    let data = null;
    try {
        data = await res.json();
    } catch {
        data = null;
    }
    return { ok: res.ok, status: res.status, data };
}