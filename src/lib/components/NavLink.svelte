<script>
	import { page } from '$app/state';

	let { href, label } = $props();

	const isCurrent = () => page.url.pathname === href;
</script>

<a {href} class:current-page={isCurrent()} aria-current={isCurrent() ? 'page' : undefined}>{label}</a>