<script>
	import Controls from '#lib/components/Controls.svelte';
	import {
		hasMoves,
		areSameBoard,
		hasWon,
		moveTiles,
		spawnTile,
		scoreTiles,
		tilesToBoard
	} from '@ethanhua/arcade-core';
	import { fade, scale } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { scores } from '#lib/state/scores.svelte.js';

	const SAVE_KEY = '2048-game';
	const BEST_KEY = '2048-best';
	const keys = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' };

	function startingTiles(firstId) {
		const one = spawnTile([], firstId);
		return spawnTile(one, firstId + 1);
	}

    const SWIPE_THRESHOLD = 30;
    let startX = 0;
    let startY = 0;

    function handlePointerDown(event) {
        startX = event.clientX;
        startY = event.clientY;
        event.currentTarget.setPointerCapture(event.pointerId);
    }  

    function handlePointerUp(event) {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_THRESHOLD) {
            return;
        }

        if (Math.abs(dx) > Math.abs(dy)) {
            moveBoard(dx > 0 ? 'right' : 'left');
        } else {
            moveBoard(dy > 0 ? 'down' : 'up');
        }
    }

	function loadGame() {
		try {
			const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
			if (saved && Array.isArray(saved.tiles)) {
				const maxId = Math.max(0, ...saved.tiles.map((tile) => tile.id));
				return {
					tiles: saved.tiles,
					nextID: Math.max(Number(saved.nextID) || 0, maxId + 1),
					total: Number(saved.total) || 0
				};
			}
		} catch {
			// Corrupt or unreadable save: fall through to a new game
		}
		return { tiles: startingTiles(1), nextID: 3, total: 0 };
	}

	const saved = loadGame();
    let tiles = $state([{"id":1, "value":1024, "row":1, "col":2}, {"id":2, "value":1024, "row":1, "col":3}]);
	// let tiles = $state(saved.tiles);
	let nextID = $state(saved.nextID);
	let total = $state(saved.total);

	const board = $derived(tilesToBoard(tiles));
	const win = $derived(hasWon(board));
	const gameOver = $derived(!hasMoves(board));

	$effect(() => {
		try {
			localStorage.setItem(SAVE_KEY, JSON.stringify({ tiles, nextID, total }));
		} catch {
			// Storage unavailable: the game still works, it just won't be saved
		}
	});

	$effect(() => {
		try {
			localStorage.setItem(BEST_KEY, String(scores.best));
		} catch {
			// Storage unavailable
		}
	});

	function newGame() {
		tiles = startingTiles(nextID);
		nextID += 2;
		total = 0;
	}

	function moveBoard(direction) {
		const moved = moveTiles(tiles, direction);
		if (areSameBoard(tilesToBoard(moved), board)) {
			return;
		}
		total += scoreTiles(tiles, direction);
		scores.best = Math.max(total, scores.best);
		tiles = spawnTile(moved, nextID);
		nextID++;
	}

	function handleKey(event) {
		if (!(event.key in keys)) {
			return;
		}
		event.preventDefault();
		moveBoard(keys[event.key]);
	}
</script>

<svelte:window onkeydown={handleKey} />

<main class="centered">
	<header class="centered">
		<div class="titles">
			<h1>2048</h1>
		</div>
	</header>

	<div class="status" aria-live="polite">
		{#if gameOver}
			<div
				class="status-gameOver"
				in:scale={{ duration: prefersReducedMotion.current ? 0 : 400, start: 0.5 }}
				out:fade
			>Game Over</div>
		{/if}
		{#if win && !gameOver}
			<div class="status-win" transition:fade>You Win!</div>
		{/if}
	</div>

	<div class="scores">
		<div aria-live="polite">Score: {total}</div>
		<button class="newGame" onclick={newGame}>Restart</button>
		<div aria-live="polite">Best: {scores.best}</div>
	</div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="board" class:win onpointerdown={handlePointerDown} onpointerup={handlePointerUp}>
        {#each Array(16) as _, i (i)}
            <div class="empty"></div>
        {/each}
    
        {#each tiles as tile (tile.id)}
            <div
                class="tile"
                in:scale={{ duration: prefersReducedMotion.current ? 0 : 150, start: 0.5 }}
                style:--row={tile.row}
                style:--col={tile.col}
                style:background-color={`var(--tile-${tile.value}, var(--tile-2048))`}
                style:color={`var(--tile-${tile.value}-txt, var(--tile-2048-txt))`}
            >{tile.value}</div>
        {/each}
    </div>

	<Controls onmove={moveBoard} />
</main>

<footer>
	<p>&copy; 2026 Chang Chi (Ethan) Hua</p>
</footer>

<style>
	.board {
        touch-action: none;
        --gap: 8px;
        --pad: 10px;
        position: relative;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--gap);
        padding: var(--pad);
		width: min(80vw, 500px);
		margin: 10px;
		border-radius: 15px;
		background-color: var(--color-bg-2048);
		border: 4px solid var(--color-title-2048);
	}
	.board.win {
		border-color: rgb(236, 0, 0);
		background-color: gold;
		background-image: url('/images/yujiro.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
	.tile {
        position: absolute;
        top: var(--pad);
        left: var(--pad);
        width: calc((100% - 2 * var(--pad) - 3 * var(--gap)) / 4);
        aspect-ratio: 1;
        transform: translate(
            calc(var(--col) * (100% + var(--gap))),
            calc(var(--row) * (100% + var(--gap)))
        );
	    transition: transform 120ms ease-in-out;
		font-size: clamp(16px, 6vw, 30px);
		font-weight: bold;
		aspect-ratio: 1;
		display: grid;
		place-items: center;
		border-radius: min(15px, 2vw);
		border: 1px solid var(--color-title-2048);
	}

    @media (prefers-reduced-motion: reduce) {
	.tile {
		transition: none;
	}
}
	.empty {
		aspect-ratio: 1;
		display: grid;
		place-items: center;
		border-radius: min(15px, 2vw);
        background-color: rgba(255, 255, 255, 0.26);
	}
	h1 {
		margin: 0;
		margin-top: 5px;
		font-size: clamp(3rem, 20vw, 70px);
		font-weight: bold;
		-webkit-text-stroke: 3px var(--color-bg-2048);
		text-shadow: 5px 5px 0 rgb(0, 0, 0);
		font-family: var(--font-2048);
		color: var(--color-title-2048);
	}
	.scores {
		display: flex;
		color: var(--color-title-2048);
		font-weight: bold;
		font-size: clamp(1.1rem, 5vw, 20px);
		width: 90%;
		align-items: center;
		justify-content: space-around;
	}
	.status {
		display: grid;
		min-height: 5rem;
	}
	.status > * {
		grid-area: 1 / 1;
	}
	.status-gameOver {
		margin: 0;
		font-family: var(--font-2048);
		font-size: clamp(40px, 5vw, 70px);
		font-weight: bold;
		text-shadow: 5px 5px 0 rgb(0, 0, 0);
		color: rgb(174, 1, 1);
		padding: 10px;
	}
	.status-win {
		margin: 0;
		font-weight: bold;
		font-size: clamp(40px, 5vw, 70px);
		font-family: var(--font-2048);
		text-shadow: 5px 5px 0 rgb(0, 0, 0);
		-webkit-text-stroke: 2px rgb(255, 0, 0);
		color: rgb(255, 230, 0);
		padding: 10px;
	}
	.newGame {
		color: var(--color-title-2048);
		font-weight: bold;
		font-size: clamp(1.1rem, 5vw, 20px);
		margin: 0;
		padding: 5px;
		border-radius: 15px;
		background-color: white;
	}
	.titles {
		display: flex;
		width: min(80vw, 500px);
		flex-direction: column;
		align-items: center;
		margin: 5px;
		padding: 5px;
	}
</style>