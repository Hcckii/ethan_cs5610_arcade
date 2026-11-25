<script>
    import { enhance } from "$app/forms";
  
    let { form } = $props();
    let submitting = $state(false);
  </script>
  
  <h1>Register</h1>
  
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
    <input id="password" name="password" type="password" autocomplete="new-password" required minlength="6" />
  
    {#if form?.error}
      <p role="alert">{form.error}</p>
    {/if}
  
    <button type="submit" disabled={submitting}>
        {submitting ? "Creating account..." : "Register"}
    </button>
  </form>
  
  <p>Already have an account? <a href="/login">Log in</a></p>