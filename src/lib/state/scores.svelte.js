function loadBest() {
	if (typeof localStorage === 'undefined') return 0;
	try {
		return Number(localStorage.getItem('2048-best')) || 0;
	} catch {
		return 0;
	}
}

export const scores = $state({ best: loadBest() });