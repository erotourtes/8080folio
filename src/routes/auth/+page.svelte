<script lang="ts">
  import { error } from '@sveltejs/kit';
  import { userStore } from '$lib/stores/user';
  import { tick } from 'svelte';
  import { FORM_ACCESS_TOKEN_NAME, FORM_JWT_TOKEN_NAME } from './constants';
  import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';

  let form: HTMLFormElement;
  let accessToken: string | null;
  let jwtToken: string | null;

  async function handleSignIn() {
    const tokens = await userStore.signIn().catch(() => null);
    if (!tokens || !tokens.accessToken || !tokens.jwtToken) throw error(404, 'Could not login');
    accessToken = tokens.accessToken;
    jwtToken = tokens.jwtToken;

    await tick();
    form.submit();
  }

  async function handleSignOut() {
    await userStore.signOut();
    goto('/');
  }
</script>

<form method="post" action="?/signIn" bind:this={form} use:enhance>
  <button type="button" on:click={handleSignIn}>Login with Github</button>
  <input type="hidden" name={FORM_ACCESS_TOKEN_NAME} value={accessToken} />
  <input type="hidden" name={FORM_JWT_TOKEN_NAME} value={jwtToken} />
  <button type="button" on:click={handleSignOut}>Log out</button>
</form>
