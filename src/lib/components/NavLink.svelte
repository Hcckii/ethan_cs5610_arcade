<script>
	import { page } from '$app/state';

	let { href, label } = $props();

	const isCurrent = $derived(page.url.pathname === href);
</script>

<a {href} class:current-page={isCurrent} aria-current={isCurrent ? 'page' : undefined}>{label}</a>
<style>
    a:hover{
        background-color: var(--color-accent);
        padding:5px;
        border-radius: 5px;
    }
    a:focus-visible {
        outline: 3px solid var(--color-focus);
        outline-offset: 2px;
    }
    a {
        color:inherit;
        text-decoration: none;
        transition: background-color 0.2s;
    }
    a.current-page {
		background-color: var(--color-accent);
	}
    .current-page{
        background-color: var(--color-accent);
        padding:5px;
        border-radius: 5px;
        font-weight: bold;
    }
</style>