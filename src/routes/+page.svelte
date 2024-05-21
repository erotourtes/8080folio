<script>
  import { userStore } from '$lib/stores/user';
</script>

<h1 class="text-3xl text-red-500">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<a href="/auth" class="my-10 block">Login</a>

{$userStore?.photoURL}
