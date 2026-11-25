<script>
	import { battleship } from '@ethanhua/arcade-core';
	let { board, sunk = [], interactive = false, label, pending = false } = $props();

	const ROWS = 'ABCDEFGHIJ';

	function stateOf(cell) {
		if (cell.shot === 'hit') {
			return cell.ship !== null && sunk.includes(cell.ship) ? 'sunk' : 'hit';
		}
		if (cell.shot === 'miss') {
			return 'miss';
		}
		if (cell.ship !== null) {
			return 'ship';
		}
		return 'empty';
	}

	function describe(cell, state, x, y) {
		const square = `${ROWS[y]}${x + 1}`;
		const ship = cell.ship;
		if (state === 'sunk') return `${square}, sunk ${ship}`;
		if (state === 'hit') return ship ? `${square}, hit ${ship}` : `${square}, hit`;
		if (state === 'miss') return `${square}, miss`;
		if (state === 'ship') return `${square}, your ${ship}`;
		return `${square}, not fired at`;
	}

	function classes(cell, state) {
		const shipClasses = cell.ship !== null ? ` has-ship ship-${cell.ship}` : '';
		return `cell ${state}${shipClasses}`;
	}
</script>

{#snippet icon(state)}
	{#if state === 'miss'}
		<svg viewBox="0 0 10 10" aria-hidden="true">
			<circle class="dot" cx="5" cy="5" r="1.8" />
		</svg>
	{:else if state === 'hit'}
		<svg viewBox="0 0 10 10" aria-hidden="true">
			<path d="M2 2 L8 8 M8 2 L2 8" />
		</svg>
	{:else if state === 'sunk'}
		<svg viewBox="0 0 10 10" aria-hidden="true">
			<rect x="1" y="1" width="8" height="8" />
			<path d="M2.5 2.5 L7.5 7.5 M7.5 2.5 L2.5 7.5" />
		</svg>
	{/if}
{/snippet}

<div class="board" role="group" aria-label={label}>
	<span class="corner" aria-hidden="true"></span>
	{#each Array.from({ length: 10 }, (_, i) => i + 1) as col (col)}
		<span class="head" aria-hidden="true">{col}</span>
	{/each}

	{#each board as row, y (y)}
		<span class="head" aria-hidden="true">{ROWS[y]}</span>
		{#each row as cell, x (x)}
			{@const state = stateOf(cell)}
			{#if interactive}
				<button
					type="submit"
					name="cell"
					value={`${x},${y}`}
					class={classes(cell, state)}
					aria-label={describe(cell, state, x, y)}
					disabled={pending || !battleship.isValidShot(board, x, y)}
				>
					{@render icon(state)}
				</button>
			{:else}
				<span class={classes(cell, state)} role="img" aria-label={describe(cell, state, x, y)}>
					{@render icon(state)}
				</span>
			{/if}
		{/each}
	{/each}
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: 1.25rem repeat(10, minmax(0, 1fr));
		gap: 2px;
		width: 100%;
		max-width: 26rem;
	}

	.head,
	.corner {
		font-size: 0.7rem;
		display: grid;
		place-items: center;
		color: inherit;
	}

	.cell {
		aspect-ratio: 1;
		width: 100%;
		display: grid;
		place-items: center;
		padding: 0;
		border: 1px solid #1e3a5f;
		border-radius: 3px;
		background-color: #cfe3f5;
		color: #0b1f33;
		font: inherit;
	}
	.hit {
		color: #8b0000;
	}
	.cell.has-ship {
		color: #ffffff;
		border-color: #000000;
	}
	.cell.ship-carrier {
		background-color: #6a3d9a;
	}
	.cell.ship-battleship {
		background-color: #1f4e79;
	}
	.cell.ship-cruiser {
		background-color: #2e6b30;
	}
	.cell.ship-submarine {
		background-color: #8a4b08;
	}
	.cell.ship-destroyer {
		background-color: #a0204a;
	}

	button.cell:enabled {
		cursor: crosshair;
	}

	button.cell:enabled:hover {
		background-color: #a9cdee;
	}

	button.cell:focus-visible {
		outline: 3px solid #ffd54f;
		outline-offset: 1px;
		position: relative;
		z-index: 1;
	}

	button.cell:disabled {
		cursor: default;
	}

	svg {
		display: block;
		width: 75%;
		height: 75%;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
	}

	.dot {
		fill: currentColor;
		stroke: none;
	}
</style>