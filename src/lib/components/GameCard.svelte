<script>
	let { title, description, href = null, detail = '' } = $props();
</script>

<article class="card" class:soon={!href}>
	<h3>{title}</h3>
	<p>{description}</p>
	{#if detail}
		<p class="detail">{detail}</p>
	{/if}
	{#if href}
		<a class="play" {href}>Play {title}</a>
	{:else}
		<p class="badge">Coming soon</p>
	{/if}
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1.25rem;
		border: 2px solid var(--color-title);
		border-radius: 15px;
		background-color: white;
	}
	.card.soon {
		border-style: dashed;
		background-color: transparent;
	}
	h3 {
		margin: 0;
		font-size: 1.3rem;
	}
	p {
		margin: 0;
		line-height: 1.6;
	}
	.detail {
		font-weight: bold;
	}
	.play {
		margin-top: auto;
		align-self: flex-start;
		padding: 0.5rem 1rem;
		border-radius: 10px;
		background-color: var(--color-title);
		color: white;
		font-weight: bold;
		text-decoration: none;
	}
	.play:focus-visible {
		outline: 3px solid var(--color-focus);
		outline-offset: 2px;
	}
	.badge {
		margin-top: auto;
		font-weight: bold;
		font-style: italic;
	}
</style>