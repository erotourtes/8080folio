<script>
  import { userStore } from '$lib/stores/userStore';
</script>

<h1 class="text-3xl text-red-500">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>{JSON.stringify($userStore, null, 2)}</p>

<button on:click={userStore.signIn}> Sign up </button>
