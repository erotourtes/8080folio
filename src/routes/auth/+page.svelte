<script lang="ts">
  import { signIn } from '$lib/firebase/firebase.app';
  import { error } from '@sveltejs/kit';
  import { tick } from 'svelte';
  import { FORM_ACCESS_TOKEN_NAME, FORM_JWT_TOKEN_NAME } from './constants';

  let form: HTMLFormElement;
  let accessToken: string | null;
  let jwtToken: string | null;

  async function handleSignIn() {
    const tokens = await signIn().catch(() => null);
    if (!tokens || !tokens.accessToken || !tokens.jwtToken) throw error(404, 'Could not login');
    accessToken = tokens.accessToken;
    jwtToken = tokens.jwtToken;

    await tick();
    form.submit();
  }
</script>

<form method="post" action="?/signIn" bind:this={form}>
  <button type="button" on:click={handleSignIn}>Login with Github</button>
  <input type="hidden" name={FORM_ACCESS_TOKEN_NAME} value={accessToken} />
  <input type="hidden" name={FORM_JWT_TOKEN_NAME} value={jwtToken} />
</form>
