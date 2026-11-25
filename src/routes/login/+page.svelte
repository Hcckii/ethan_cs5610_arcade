<script>
    import { enhance } from "$app/forms";
  
    let { form } = $props();
    let submitting = $state(false);
  </script>
  
  <h1>Log in</h1>
  
  <form
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
    <input id="email" name="email" type="email" autocomplete="email" required value={form?.email ?? ""} />
  
    <label for="password">Password</label>
    <input id="password" name="password" type="password" autocomplete="current-password" required minlength="6" />
  
    {#if form?.error}
      <p role="alert">{form.error}</p>
    {/if}
  
    <button type="submit" disabled={submitting}>
      {submitting ? "Logging in..." : "Log in"}
    </button>
  </form>
  
  <p>No account? <a href="/register">Register</a></p>