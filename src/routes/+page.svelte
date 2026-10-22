<script>
	import { onMount } from 'svelte';
	import GameCard from '#lib/components/GameCard.svelte';
	import { scores } from '#lib/state/scores.svelte.js';

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});

	const bestText = $derived(mounted && scores.best > 0 ? `Your best: ${scores.best}` : '');
</script>

<svelte:head>
	<title>Ethan Hua | The Arcade</title>
	<meta
		name="description"
		content="Ethan Hua's personal site and arcade: a CSS-only crossword and a 2048 game built with SvelteKit."
	/>
</svelte:head>

<main class="home">
	<section class="hero">
		<img
			src="/images/IMG_4731.jpeg"
			alt="Me wearing a goofy hat"
			width="400"
			height="500"
			fetchpriority="high"
		/>
		<div class="hero-text">
			<h1>Hi, I'm Ethan</h1>
			<p class="tagline">
				Software engineer and former power plant commissioning engineer, now studying computer
				science at Northeastern. Welcome to my arcade.
			</p>
			<div class="actions">
				<a class="button primary" href="/games/2048">Play a game</a>
				<a class="button secondary" href="/about">About me</a>
			</div>
		</div>
	</section>

	<section id="games">
		<h2 class="arcade">The Arcade</h2>
		<div class="cards">
			<GameCard
				title="Crossword"
				description="A small crossword built with only HTML and CSS. No JavaScript required."
				href="/games/crossword"
			/>
			<GameCard
				title="2048"
				description="Slide and merge tiles to reach 2048. Play with arrow keys, swipes, or on-screen buttons."
				href="/games/2048"
				detail={bestText}
			/>
			<GameCard title="Next game" description="Something new is on the way." />
		</div>
	</section>

	<section class="built">
		<h2>Under the hood</h2>
		<p>
			This site is built with SvelteKit. The 2048 game logic is published as my own npm package,
			<a href="https://www.npmjs.com/package/@ethanhua/arcade-core"><code>@ethanhua/arcade-core</code></a>:
			pure, framework-agnostic functions that the app installs as a dependency.
		</p>
	</section>
</main>

<footer>
	<p>&copy; 2026 Chang Chi (Ethan) Hua</p>
</footer>

<style>
    .arcade{
        font-family: var(--font-2048);
        font-weight: bold;
        font-size:clamp(2.5rem, 30px, 70px);
        color:gold;
        -webkit-text-stroke: 2px red;
        text-shadow: 5px 5px 0 rgb(0, 0, 0);
    }
	.home {
		max-width: 960px;
		margin: 0 auto;
		padding: 2rem 1rem;
		display: grid;
		gap: 3rem;
	}

	.hero {
		display: grid;
		gap: 2rem;
		align-items: center;
	}
	.hero img {
		width: min(320px, 80vw);
		height: auto;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		border-radius: 20px;
		justify-self: center;
	}

	h1 {
		margin: 0 0 0.75rem;
		font-size: clamp(2.2rem, 7vw, 3.5rem);
		font-weight: bold;
		color: var(--color-title);
	}
	h2 {
		margin: 0 0 1rem;
		font-size: clamp(1.5rem, 4vw, 2rem);
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--color-title);
	}
	p {
		max-width: 65ch;
		line-height: 1.7;
	}
	.tagline {
		margin: 0;
		font-size: 1.15rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1.5rem;
	}
	.button {
		padding: 0.75rem 1.5rem;
		border-radius: 10px;
		font-weight: bold;
		text-decoration: none;
		border: 2px solid var(--color-title);
	}
	.primary {
		background-color: var(--color-title);
		color: white;
	}
	.secondary {
		color: var(--color-title);
	}
	a:focus-visible {
		outline: 3px solid var(--color-focus);
		outline-offset: 2px;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1.5rem;
	}

	@media (min-width: 864px) {
		.hero {
			grid-template-columns: auto 1fr;
		}
	}
</style>