<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
	let submitting = $state(false);
</script>

<main class="page">
	<div class="login_window">
		<h1>Register</h1>

		<form
			class="login"
			method="POST"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					await update();
					submitting = false;
				};
			}}
		>
			<label for="email">Email</label>
			<input id="email" name="email" type="email" autocomplete="email" required value={form?.email ?? ''} />

			<label for="password">Password</label>
			<input
				id="password"
				name="password"
				type="password"
				autocomplete="new-password"
				required
				minlength="6"
			/>

			{#if form?.error}
				<p role="alert" class="error">{form.error}</p>
			{/if}

			<button type="submit" disabled={submitting}>
				{submitting ? 'Creating account...' : 'Register'}
			</button>
		</form>

		<p>Already have an account? <a href="/login">Log in</a></p>
	</div>
</main>

<style>
	.page {
		display: grid;
		place-items: center;
		min-height: 70dvh;
		padding: 1rem;
	}

	.login_window {
		box-sizing: border-box;
		width: min(100%, 24rem);
		aspect-ratio: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
		padding: 1.5rem;
		border: 5px solid var(--color-title-2048);
		border-radius: 15px;
		background-color: var(--color-bg-2048);
		font-family: var(--font-2048);
		color: black;
	}

	h1 {
		margin: 20px;
		text-align: center;
	}

	.login {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	input,
	button {
		font: inherit;
	}

	input {
		padding: 0.5rem;
		border: 2px solid var(--color-title-2048);
		border-radius: 8px;
	}

	button {
		margin-top: 0.5rem;
		padding: 0.6rem;
		border: none;
		border-radius: 8px;
		background-color: var(--color-title-2048);
		color: white;
		font-weight: bold;
		cursor: pointer;
	}

	button:disabled {
		cursor: wait;
	}

	input:focus-visible,
	button:focus-visible,
	a:focus-visible {
		outline: 3px solid black;
		outline-offset: 2px;
	}

	.error {
		margin: 0;
		color: #8b0000;
	}

	p {
		margin: 0;
		text-align: center;
	}
</style>