<script lang="ts">
  import { signIn } from '$lib/firebase/firebase.app';
  import { error } from '@sveltejs/kit';
  import { tick } from 'svelte';
  import { FORM_TOKEN_NAME } from './constants';

  let form: HTMLFormElement;
  let token: string | null;

  async function handleSignIn() {
    token = await signIn().catch(() => null);
    if (!token) throw error(404, 'Could not login');

    await tick();
    form.submit();
  }
</script>

<form method="post" action="?/signIn" bind:this={form}>
  <button type="button" on:click={handleSignIn}>Login with Github</button>
  <input type="hidden" name={FORM_TOKEN_NAME} bind:value={token} />
</form>
