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

<div class="flex h-screen flex-col items-center justify-center">
  <img
    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    alt="GitHub Logo"
    class="mb-8 h-64 w-64 rounded-full"
  />
  <form
    method="post"
    action="?/signIn"
    bind:this={form}
    use:enhance
    class="flex flex-col space-y-6"
  >
    <button
      type="button"
      on:click={handleSignIn}
      class="rounded-full bg-green-500 px-8 py-4 font-semibold text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
    >
      Login with Github
    </button>
    <input type="hidden" name={FORM_ACCESS_TOKEN_NAME} value={accessToken} />
    <input type="hidden" name={FORM_JWT_TOKEN_NAME} value={jwtToken} />
    <button
      type="button"
      on:click={handleSignOut}
      class="rounded-full bg-white px-8 py-4 font-semibold text-gray-800 shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
    >
      Log out
    </button>
  </form>
</div>
