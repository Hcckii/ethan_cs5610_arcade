<script>
	import { enhance } from '$app/forms';
	import { battleship } from '@ethanhua/arcade-core';

	// fleet: the random layout the server made, as [{ name, x, y, direction }]
	let { fleet } = $props();

	const ROWS = 'ABCDEFGHIJ';
	const NAMES = battleship.SHIP_NAMES;

	// name -> { name, x, y, direction } while the ship is on the board, or null while it's in the fleet list
	function fromFleet(list) {
		return Object.fromEntries(NAMES.map((name) => [name, list.find((ship) => ship.name === name) ?? null]));
	}

	let placed = $state(fromFleet(fleet));
	let selected = $state(null);
	let direction = $state('horizontal');
	let hover = $state(null);
	let submitting = $state(false);
	let message = $state(
		'Drag a ship onto the board, or select it and choose a square. Press R to rotate, Escape to cancel.'
	);

	// The board built from every placed ship except `skip`, so a ship never collides with itself
	function boardWithout(skip) {
		let board = battleship.createEmptyBoard();
		for (const name of NAMES) {
			const ship = placed[name];
			if (ship !== null && name !== skip) {
				board = battleship.placeShip(board, ship) ?? board;
			}
		}
		return board;
	}

	const board = $derived(boardWithout(null));
	const tray = $derived(NAMES.filter((name) => placed[name] === null));
	const allPlaced = $derived(tray.length === 0);

	// Where the selected ship would go if it were dropped on the square under the pointer or focus
	const preview = $derived.by(() => {
		if (selected === null || hover === null) {
			return null;
		}
		const ship = { name: selected, x: hover[0], y: hover[1], direction };
		return {
			valid: battleship.canPlaceShip(boardWithout(selected), ship),
			cells: new Set(battleship.shipCells(ship).map(([x, y]) => `${x},${y}`))
		};
	});

	function select(name) {
		selected = name;
		if (placed[name] !== null) {
			direction = placed[name].direction;
		}
		message = `${name} selected (${direction}). Choose a square for its first cell.`;
	}

	function rotate() {
		direction = direction === 'horizontal' ? 'vertical' : 'horizontal';
		message = selected ? `${selected} is now ${direction}.` : `New ships will be placed ${direction}.`;
	}

	function placeAt(x, y) {
		// Nothing selected: clicking a ship on the board picks it up
		if (selected === null) {
			const name = board[y][x].ship;
			if (name !== null) {
				select(name);
			}
			return;
		}
		const ship = { name: selected, x, y, direction };
		if (!battleship.canPlaceShip(boardWithout(selected), ship)) {
			message = `The ${selected} doesn't fit at ${ROWS[y]}${x + 1}.`;
			return;
		}
		placed[selected] = ship;
		message = `${selected} placed at ${ROWS[y]}${x + 1}, ${direction}.`;
		selected = null;
		hover = null;
	}

	function removeSelected() {
		if (selected === null) {
			return;
		}
		placed[selected] = null;
		message = `${selected} moved back to your fleet.`;
		selected = null;
	}

	function useRandomLayout() {
		placed = fromFleet(fleet);
		selected = null;
		message = 'Back to the random layout.';
	}

	function clearBoard() {
		placed = fromFleet([]);
		selected = null;
		message = 'All ships moved back to your fleet.';
	}

	function handleKey(event) {
		if (event.target instanceof HTMLInputElement) {
			return;
		}
		if (event.key === 'r' || event.key === 'R') {
			event.preventDefault();
			rotate();
		} else if (event.key === 'Escape' && selected !== null) {
			selected = null;
			hover = null;
			message = 'Selection cancelled.';
		}
	}

	// Mouse drag and drop. On touch screens, tap a ship and then tap a square instead.
	function startDrag(event, name) {
		select(name);
		event.dataTransfer.setData('text/plain', name);
		event.dataTransfer.effectAllowed = 'move';
	}

	function dragOver(event, x, y) {
		event.preventDefault();
		hover = [x, y];
	}

	function dropAt(event, x, y) {
		event.preventDefault();
		placeAt(x, y);
	}

	function cellClass(cell, x, y) {
		let classes = 'cell';
		if (cell.ship !== null) {
			classes += ` has-ship ship-${cell.ship}`;
			if (cell.ship === selected) {
				classes += ' lifted';
			}
		}
		if (preview !== null && preview.cells.has(`${x},${y}`)) {
			classes += preview.valid ? ' preview-ok' : ' preview-bad';
		}
		return classes;
	}

	function submitFleet() {
		submitting = true;
		return async ({ update }) => {
			await update();
			submitting = false;
		};
	}
</script>

<svelte:window onkeydown={handleKey} />

<div class="placement">
	<p class="message" role="status" aria-live="polite">{message}</p>

	<div class="layout">
		<div class="board" role="group" aria-label="Your board. Place your ships here">
			<span class="corner" aria-hidden="true"></span>
			{#each Array.from({ length: 10 }, (_, i) => i + 1) as col (col)}
				<span class="head" aria-hidden="true">{col}</span>
			{/each}

			{#each board as row, y (y)}
				<span class="head" aria-hidden="true">{ROWS[y]}</span>
				{#each row as cell, x (x)}
					<button
						type="button"
						class={cellClass(cell, x, y)}
						aria-label={`${ROWS[y]}${x + 1}${cell.ship ? `, ${cell.ship}` : ', empty'}`}
						draggable={cell.ship !== null ? 'true' : 'false'}
						onclick={() => placeAt(x, y)}
						onmouseenter={() => (hover = [x, y])}
						onfocus={() => (hover = [x, y])}
						ondragstart={(event) => cell.ship !== null && startDrag(event, cell.ship)}
						ondragover={(event) => dragOver(event, x, y)}
						ondrop={(event) => dropAt(event, x, y)}
					></button>
				{/each}
			{/each}
		</div>

		<div class="fleet">
			<h3>Your fleet</h3>
			{#if tray.length === 0}
				<p>All ships are on the board.</p>
			{:else}
				<ul>
					{#each tray as name (name)}
						<li>
							<button
								type="button"
								class="tray-ship ship-{name}"
								class:active={selected === name}
								aria-pressed={selected === name}
								draggable="true"
								onclick={() => select(name)}
								ondragstart={(event) => startDrag(event, name)}
							>
								<span class="blocks" aria-hidden="true">
									{#each Array(battleship.SHIPS[name]) as _, i (i)}
										<span class="block"></span>
									{/each}
								</span>
								{name} ({battleship.SHIPS[name]})
							</button>
						</li>
					{/each}
				</ul>
			{/if}

			<div class="tools">
				<button type="button" onclick={rotate}>Rotate (now {direction})</button>
				<button
					type="button"
					onclick={removeSelected}
					disabled={selected === null || placed[selected] === null}
				>
					Remove selected
				</button>
				<button type="button" onclick={useRandomLayout}>Use random layout</button>
				<button type="button" onclick={clearBoard}>Clear board</button>
			</div>

			<form method="POST" action="?/place" use:enhance={submitFleet}>
				<input type="hidden" name="ships" value={JSON.stringify(NAMES.map((name) => placed[name]))} />
				<button type="submit" class="ready" disabled={!allPlaced || submitting}>
					{submitting ? 'Saving...' : allPlaced ? 'Ready' : 'Place all ships first'}
				</button>
			</form>
		</div>
	</div>
</div>

<style>
	.placement {
		display: grid;
		gap: 1rem;
	}

	.message {
		margin: 0;
		min-height: 3em;
	}

	.layout {
		display: grid;
		gap: 1.5rem;
	}

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
	}

	.cell {
		aspect-ratio: 1;
		width: 100%;
		padding: 0;
		border: 1px solid #1e3a5f;
		border-radius: 3px;
		background-color: #cfe3f5;
		cursor: pointer;
	}

	.cell.has-ship {
		border-color: #000000;
		cursor: grab;
	}
	.ship-carrier {
		--ship: #6a3d9a;
	}
	.ship-battleship {
		--ship: #1f4e79;
	}
	.ship-cruiser {
		--ship: #2e6b30;
	}
	.ship-submarine {
		--ship: #8a4b08;
	}
	.ship-destroyer {
		--ship: #a0204a;
	}
	.cell.has-ship {
		background-color: var(--ship);
	}

	/* The ship being moved is shown faded until it is dropped somewhere */
	.cell.lifted {
		opacity: 0.45;
	}

	/* Preview: solid outline where it fits, dashed outline where it doesn't */
	.cell.preview-ok {
		outline: 3px solid #00e676;
		outline-offset: -3px;
	}
	.cell.preview-bad {
		outline: 3px dashed #ff5252;
		outline-offset: -3px;
	}

	.cell:focus-visible,
	button:focus-visible {
		outline: 3px solid #ffd54f;
		outline-offset: 1px;
	}

	.fleet {
		display: grid;
		gap: 0.75rem;
		align-content: start;
	}

	.fleet h3 {
		margin: 0;
	}

	.fleet ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.5rem;
	}

	.tray-ship {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		padding: 0.4rem 0.6rem;
		border: 2px solid transparent;
		border-radius: 6px;
		background-color: #f5f5f5;
		color: #111111;
		font: inherit;
		text-align: left;
		cursor: grab;
	}

	.tray-ship.active {
		border-color: #ffd54f;
		font-weight: bold;
	}

	.blocks {
		display: flex;
		gap: 2px;
	}

	.block {
		width: 0.9rem;
		height: 0.9rem;
		border-radius: 2px;
		background-color: var(--ship);
	}

	.tools {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tools button,
	.ready {
		padding: 0.4rem 0.75rem;
		font: inherit;
		cursor: pointer;
	}

	.tools button:disabled,
	.ready:disabled {
		cursor: not-allowed;
	}

	.ready {
		font-weight: bold;
	}

	@media (min-width: 760px) {
		.layout {
			grid-template-columns: minmax(0, 26rem) 1fr;
		}
	}
</style>