<script>
	import '@fontsource/press-start-2p';
	import '@fontsource/vt323';
	import favicon from '#lib/assets/favicon.svg';
	import '../app.css';
	import NavBar from '#lib/components/NavBar.svelte';
	import { useScoresFor } from '#lib/state/scores.svelte.js';

	let { data, children } = $props();

	$effect(() => {
		useScoresFor(data.user?.id ?? null);
	});

</script>
<NavBar user={data.user} />
<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
{@render children()}

