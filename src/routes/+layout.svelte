<script>
	import favicon from '#lib/assets/favicon.svg';
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<nav>
	<p class="site-title">Chang Chi (Ethan) Hua</p>
	<ul>
		<li><a href="/" class="current-page">Home</a></li>
		<li><a href="/about">About Me</a></li>
		<li>
			<details>
				<summary>Games</summary>
				<ul>
					<li><a href="/games/crossword">Crossword</a></li>
					<li><a href="/games/2048">2048</a></li>
					<li>coming soon!</li>
					<li>coming soon!</li>
				</ul>
			</details>
		</li>
		<li><a href="/contact">Contact</a></li>
	</ul>
</nav>
{@render children()}
<style>
	nav {
    padding:5px;
    position: sticky;
    top: 0;
    background-color: rgba(255, 255, 255, 0.834);
    border: solid gray 1px;
}

nav p{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
}
nav ul{
    display: flex;
    list-style: none;
    gap: 10px;
    margin: 0;
    padding: 0;
}
nav a:hover{
    background-color: var(--color-accent);
}
nav a:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 2px;
}

nav a {
    text-decoration: none;
    transition: background-color 0.2s;
}

</style>
