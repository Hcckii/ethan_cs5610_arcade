<script>
    import { scale } from 'svelte/transition';
    import { prefersReducedMotion } from 'svelte/motion';
	import { enhance } from '$app/forms';
	import { refreshAll } from '$app/navigation';
	import { navigating } from '$app/state';
	import { battleship } from '@ethanhua/arcade-core';
	import Board from '#lib/components/Board.svelte';

	let { data, form } = $props();

	let shooting = $state(false);
	let refreshing = $state(false);
	let challenging = $state(false);

	const ROWS = 'ABCDEFGHIJ';

	const game = $derived(data.game);
	const isPlayer = $derived(game !== null && game.you !== null);
	const enemy = $derived(isPlayer ? (game.you === 'p1' ? 'p2' : 'p1') : null);
	const isMyTurn = $derived(isPlayer && game.status === 'playing' && game.turn === game.you);
	const iLost = $derived(isPlayer && battleship.isGameComplete(game.myBoard));

	function list(names) {
		return names.length === 0 ? 'none' : names.join(', ');
	}

	async function refresh() {
		refreshing = true;
		try {
			await refreshAll();
		} finally {
			refreshing = false;
		}
	}

	function squareName(x, y) {
		return `${ROWS[y]}${x + 1}`;
	}

	function challenge() {
		challenging = true;
		return async ({ update }) => {
			await update();
			challenging = false;
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
        <pre class="ship" aria-hidden="true">            
            |>
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
            {:else if game.status === 'playing'}
                <p>
                    {isMyTurn
                        ? 'Your turn: choose a square on the enemy board.'
                        : `Waiting for ${game.players[enemy]} to fire.`}
                </p>
            {:else if isPlayer}
                {#if iLost}
                    <div class="status-gameOver" in:scale={{ duration: prefersReducedMotion.current ? 0 : 400, start: 0.5 }}>
                        You Lost
                    </div>
                {:else}
                    <div class="status-win" in:scale={{ duration: prefersReducedMotion.current ? 0 : 400, start: 0.5 }}>
                        You Win
                    </div>
                {/if}
            {:else}
                <p class="result">{game.players[game.winner]} won this game.</p>
            {/if}
            <div>
                <p>Click refresh to update result from the enemy</p>
            </div>
            {#if game.status !== 'finished'}
                <button type="button" class="refresh" onclick={refresh} disabled={refreshing}>
                    {refreshing ? 'Refreshing...' : 'Refresh'}
                </button>
            {/if}
        </section>
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
		font-size: clamp(3rem, 20vw, 70px);
		font-family: var(--font-bs);
		color: var(--color-font-bs);
	}

    h2{
        font-family: var(--font-bs);
        color: var(--color-font-bs);
    }

    p{
        font-size:   clamp(1.1rem, 1.1vw, 18px);
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
    p a{
        color:white;
    }
    button{
        color: var(--color-bg-bs);
        font-weight: bold;
        background-color: var(--color-font-bs);
        font-family: var(--font-bs);
    }
    footer{
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

	button.refresh:focus-visible,
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
	@media (min-width: 760px) {
		.boards {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>