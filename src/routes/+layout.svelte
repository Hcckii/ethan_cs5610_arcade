<script>
	import '@fontsource/press-start-2p';
	import '@fontsource/vt323';
	import favicon from '#lib/assets/favicon.svg';
	import '../app.css';
	import NavBar from '#lib/components/NavBar.svelte';
	let { children } = $props();

</script>
<NavBar />
<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
{@render children()}
