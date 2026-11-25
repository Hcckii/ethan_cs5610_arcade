<script>
    import { enhance } from "$app/forms";
    import { navigating } from "$app/state";

    let { data, form } = $props();
    let pending = $state(null);

    function track(name) {
        return () => {
        pending = name;
        return async ({ update }) => {
            await update();
            pending = null;
        };
        };
    }
</script>
<div class="page centered">
<main class="centered">
    <header class="centered">
        <div class="titles">
            <h1>BATTLESHIP</h1>
    <pre class="ship" aria-hidden="true">            
                |>
               _|_
         __ __|___|__ __
      __|__|_________|__|__
      \   ===  ===  ===   /
    ~~~\_________________/~~~</pre>
        </div>
    </header>
    {#if navigating.to}
    <p role="status">Loading...</p>
    {/if}

    {#if !data.user}
    <p>Log in to see and create games.</p>
    <p><a href="/login">Log in</a> or <a href="/register">Register</a></p>
    {:else}
    {#if data.error}
        <p role="alert">{data.error}</p>
    {/if}
    {#if form?.error}
        <p role="alert">{form.error}</p>
    {/if}

    <form method="POST" action="?/create" use:enhance={track("create")}>
        <button type="submit" disabled={pending !== null}>
        {pending === "create" ? "Creating..." : "New game"}
        </button>
    </form>

    <section class="centered">
        <h2>Waiting for a second player</h2>
        {#if data.waiting.length === 0}
        <p>No games are waiting right now. Start a new one!</p>
        {:else}
        <ul>
            {#each data.waiting as game (game.id)}
            <li>
                <span>Created by {game.players.p1}</span>
                <form method="POST" action="?/join" use:enhance={track(game.id)}>
                <input type="hidden" name="id" value={game.id} />
                <button type="submit" disabled={pending !== null}>
                    {pending === game.id ? "Joining..." : "Join"}
                </button>
                </form>
            </li>
            {/each}
        </ul>
        {/if}
  </section>

  <section class="centered">
    <h2>Your games</h2>
    {#if data.mine.length === 0}
      <p>You haven't joined any games yet.</p>
    {:else}
      <ul>
        {#each data.mine as game (game.id)}
          <li>
            <a href="/games/battleship/{game.id}">
              vs {game.players.p1 === data.user.email ? (game.players.p2 ?? "waiting...") : game.players.p1}
            </a>
            <span>{game.status}</span>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
{/if}
</main>
<footer>
	<p>&copy; 2026 Chang Chi (Ethan) Hua</p>
</footer>
</div>
<style>
    footer p{
        color: var(--color-font-bs);
    }
	h1 {
		margin: 0;
		margin-top: 5px;
		font-size: clamp(3rem, 20vw, 70px);
		font-family: var(--font-bs);
		color: var(--color-font-bs);
	}

    h2{
        font-family: var(--font-bs);
        color: var(--color-font-bs);
    }

    p{
        font-size:   clamp(1.1rem, 1.1vw, 18px);
    }

    .page {
        font-family: var(--font-bs);
        background-color: var(--color-bg-bs);
        color: var(--color-font-bs);
        width: 100%;
        min-height: 100dvh;
        align-self: stretch;
        box-sizing: border-box;
    }
    a{
        color:white;
    }
    button{
        color: var(--color-bg-bs);
        font-weight: bold;
        background-color: var(--color-font-bs);
        font-family: var(--font-bs);
    }
	.titles {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	margin: 5px;
	padding: 5px;
    }

    .ship {
        margin: 0;
        font-family: monospace;
        font-size: clamp(0.55rem, 1.6vw, 0.9rem);
        line-height: 1.1;
        color: var(--color-font-bs);
    }
</style>