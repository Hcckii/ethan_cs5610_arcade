<script>
	import { scale } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { enhance } from '$app/forms';
	import { refreshAll } from '$app/navigation';
	import { navigating } from '$app/state';
	import { battleship } from '@ethanhua/arcade-core';
	import Board from '#lib/components/Board.svelte';
	import Placement from '#lib/components/Placement.svelte';

	let { data, form } = $props();

	let shooting = $state(false);
	let refreshing = $state(false);
	let challenging = $state(false);
	let surrendering = $state(false);

	const ROWS = 'ABCDEFGHIJ';

	const game = $derived(data.game);
	const isPlayer = $derived(game !== null && game.you !== null);
	const enemy = $derived(isPlayer ? (game.you === 'p1' ? 'p2' : 'p1') : null);
	const isMyTurn = $derived(isPlayer && game.status === 'playing' && game.turn === game.you);

	// Show the placement screen until this player has confirmed their fleet
	const placing = $derived(
		isPlayer && (game.status === 'waiting' || game.status === 'placing') && !game.ready.you
	);

	// The server decides who won. isGameComplete on my own (always complete) board
	// tells me whether I lost because my whole fleet was sunk.
	const iWon = $derived(isPlayer && game.winner === game.you);
	const fleetSunk = $derived(isPlayer && battleship.isGameComplete(game.myBoard));

	const winAnimation = $derived({ duration: prefersReducedMotion.current ? 0 : 400, start: 0.5 });

	function list(names) {
		return names.length === 0 ? 'none' : names.join(', ');
	}

	function squareName(x, y) {
		return `${ROWS[y]}${x + 1}`;
	}

	async function refresh() {
		refreshing = true;
		try {
			await refreshAll();
		} finally {
			refreshing = false;
		}
	}

	function challenge() {
		challenging = true;
		return async ({ update }) => {
			await update();
			challenging = false;
		};
	}

	// Ask before leaving: surrendering ends the game and the opponent wins
	function surrender({ cancel }) {
		const message =
			game.status === 'waiting'
				? 'Cancel this game? It will be deleted.'
				: 'Surrender this game? Your opponent will win.';
		if (!confirm(message)) {
			cancel();
			return;
		}
		surrendering = true;
		return async ({ update }) => {
			await update();
			surrendering = false;
		};
	}

	function shoot() {
		shooting = true;
		return async ({ update }) => {
			await update();
			shooting = false;
		};
	}
</script>

<svelte:head>
	<title>Battleship | Ethan Hua</title>
</svelte:head>

<div class="page centered">
	<main class="game">
		<div class="titles">
			<h1>BATTLESHIP</h1>
<pre class="ship" aria-hidden="true">            |>
           _|_
     __ __|___|__ __
  __|__|_________|__|__
  \   ===  ===  ===   /
~~~\_________________/~~~</pre>
		</div>

		<div class="centered">
			<p><a href="/games/battleship">Back to all games</a></p>
		</div>

		{#if navigating.to || refreshing}
			<p role="status">Loading...</p>
		{/if}

		{#if data.problem}
			<p role="alert">{data.problem.message}</p>
			{#if data.problem.status === 401}
				<p>
					<a href="/login">Log in</a> to view this game. Finished games can be viewed by anyone.
				</p>
			{/if}
		{:else}
			<section class="status centered" aria-live="polite">
				{#if game.status === 'waiting'}
					<p>Waiting for a second player to join.</p>
					{#if game.you === 'p1'}
						<form method="POST" action="?/challengeAi" use:enhance={challenge}>
							<button type="submit" disabled={challenging}>
								{challenging ? 'Starting...' : 'Challenge AI'}
							</button>
						</form>
					{/if}
				{:else if game.status === 'placing'}
					<p>
						{game.ready.you
							? `Waiting for ${game.players[enemy]} to place their ships.`
							: 'Place your ships, then press Ready.'}
					</p>
				{:else if game.status === 'playing'}
					<p>
						{isMyTurn
							? 'Your turn: choose a square on the enemy board.'
							: `Waiting for ${game.players[enemy]} to fire.`}
					</p>
				{:else if isPlayer}
					{#if iWon}
						<div class="status-win" in:scale={winAnimation}>You Win</div>
						{#if game.forfeitedBy}
							<p>{game.players[enemy]} surrendered.</p>
						{/if}
					{:else}
						<div class="status-gameOver" in:scale={winAnimation}>You Lost</div>
						{#if game.forfeitedBy === game.you}
							<p>You surrendered.</p>
						{:else if fleetSunk}
							<p>Your whole fleet was sunk.</p>
						{/if}
					{/if}
				{:else}
					<p class="result">
						{game.players[game.winner]} won this game{game.forfeitedBy
							? ` after ${game.players[game.forfeitedBy]} surrendered`
							: ''}.
					</p>
				{/if}

				{#if game.status !== 'finished'}
					<p>Click Refresh to see your opponent's latest move.</p>
					<button type="button" class="refresh" onclick={refresh} disabled={refreshing}>
						{refreshing ? 'Refreshing...' : 'Refresh'}
					</button>
				{/if}

				{#if isPlayer && game.status !== 'finished'}
					<form method="POST" action="?/surrender" use:enhance={surrender}>
						<button type="submit" class="surrender" disabled={surrendering}>
							{#if surrendering}
								Leaving...
							{:else if game.status === 'waiting'}
								Cancel game
							{:else}
								Surrender
							{/if}
						</button>
					</form>
				{/if}
			</section>

			<!-- Result of the last action (fire, place, challenge). Independent of the boards below. -->
			{#if form?.error}
				<p role="alert">{form.error}</p>
			{:else if form && form.hit !== undefined}
				<p role="status">
					{form.sunk ? `Hit! You sank their ${form.sunk}.` : form.hit ? 'Hit!' : 'Miss.'}
					{#if form.aiShot}
						The AI fired at {squareName(form.aiShot.x, form.aiShot.y)}:
						{form.aiShot.sunk
							? `it sank your ${form.aiShot.sunk}.`
							: form.aiShot.hit
								? 'hit.'
								: 'miss.'}
					{/if}
				</p>
			{/if}

			{#if placing}
				<Placement fleet={game.myFleet} />
			{:else}
				<div class="boards">
					{#if isPlayer}
						<section>
							<h2>Enemy waters</h2>
							<form method="POST" action="?/shoot" use:enhance={shoot}>
								<Board
									board={game.opponentBoard}
									sunk={game.opponentSunk}
									interactive={isMyTurn}
									pending={shooting}
									label={isMyTurn ? 'Enemy waters, choose a square to fire at' : 'Enemy waters'}
								/>
							</form>
							<p>Enemy ships sunk: {list(game.opponentSunk)}</p>
						</section>

						<section>
							<h2>Your fleet</h2>
							<Board board={game.myBoard} sunk={game.mySunk} label="Your fleet" />
							<p>Your ships sunk: {list(game.mySunk)}</p>
						</section>
					{:else}
						{#each ['p1', 'p2'] as player (player)}
							<section>
								<h2>{game.players[player]}'s fleet</h2>
								<Board
									board={game.boards[player]}
									sunk={game.sunk[player]}
									label={`${game.players[player]}'s fleet`}
								/>
								<p>Ships sunk: {list(game.sunk[player])}</p>
							</section>
						{/each}
					{/if}
				</div>
			{/if}

			<section class="legend">
				<h2>Legend</h2>
				<ul>
					<li>Dot: miss</li>
					<li>X: hit</li>
					<li>Boxed X on a colored square: sunk ship</li>
					<li>Purple: carrier (5)</li>
					<li>Navy: battleship (4)</li>
					<li>Green: cruiser (3)</li>
					<li>Brown: submarine (3)</li>
					<li>Crimson: destroyer (2)</li>
				</ul>
			</section>
		{/if}
	</main>

	<footer>
		<p>&copy; 2026 Chang Chi (Ethan) Hua</p>
	</footer>
</div>

<style>
	h1 {
		margin: 0;
		margin-top: 5px;
		/* Small enough that BATTLESHIP fits on a 320px screen */
		font-size: clamp(1.75rem, 9vw, 70px);
		font-family: var(--font-bs);
		color: var(--color-font-bs);
	}

	h2 {
		font-family: var(--font-bs);
		color: var(--color-font-bs);
	}

	p {
		font-size: 1.1rem;
	}

	.page {
		font-family: var(--font-bs);
		background-color: var(--color-bg-bs);
		color: var(--color-font-bs);
		width: 100%;
		min-height: 100dvh;
		align-self: stretch;
		box-sizing: border-box;
	}

	p a {
		color: white;
	}

	button {
		color: var(--color-bg-bs);
		font-weight: bold;
		background-color: var(--color-font-bs);
		font-family: var(--font-bs);
	}

	footer {
		color: var(--color-font-bs);
	}

	.game {
		max-width: 960px;
		margin: 0 auto;
		padding: 1rem;
		display: grid;
		gap: 1rem;
	}

	.titles {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin: 5px;
		padding: 5px;
	}

	.ship {
		margin: 0;
		font-family: monospace;
		font-size: clamp(0.55rem, 1.6vw, 0.9rem);
		line-height: 1.1;
		color: var(--color-font-bs);
	}

	.status {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
	}

	.status p {
		margin: 0;
	}

	.result {
		font-weight: bold;
		font-size: 1.25rem;
	}

	.boards {
		display: grid;
		gap: 2rem;
	}

	.boards section {
		display: grid;
		gap: 0.5rem;
		min-width: 0;
		align-content: start;
	}

	.boards h2,
	.legend h2 {
		margin: 0;
		font-size: 1.1rem;
	}

	.boards form {
		width: 100%;
		margin: 0;
	}

	.legend ul {
		margin: 0.5rem 0 0;
		padding-left: 1.25rem;
	}

	.surrender {
		background-color: rgb(255, 77, 77);
		color: #000000;
	}

	.status form {
		margin: 0;
	}

	button.refresh:focus-visible,
	button.surrender:focus-visible,
	a:focus-visible {
		outline: 3px solid currentColor;
		outline-offset: 2px;
	}

	.status-gameOver {
		margin: 0;
		font-family: var(--font-2048);
		font-size: clamp(40px, 5vw, 70px);
		font-weight: bold;
		text-shadow: 5px 5px 0 rgb(0, 0, 0);
		/* Bright enough for at least 4.5:1 contrast on a black background */
		color: rgb(255, 77, 77);
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

	@media (min-width: 760px) {
		.boards {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>