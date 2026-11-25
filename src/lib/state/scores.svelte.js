let key = keyFor(null);

function keyFor(userId) {
	return `2048-best:${userId ?? 'guest'}`;
}

function loadBest(k) {
	if (typeof localStorage === 'undefined') return 0;
	try {
		return Number(localStorage.getItem(k)) || 0;
	} catch {
		return 0;
	}
}

export const scores = $state({ best: 0 });

// Switch to this user's best score. Call it whenever the logged-in user changes.
export function useScoresFor(userId) {
	key = keyFor(userId);
	scores.best = loadBest(key);
}

// Save a new best score for the current user, only if it beats the old one
export function saveBest(value) {
	if (value <= scores.best) return;
	scores.best = value;
	try {
		localStorage.setItem(key, String(value));
	} catch {
		// localStorage can be full or blocked; the score still shows for this visit
	}
}