<script>
  import { onDestroy } from 'svelte';
  import '../app.css';
  import { refreshToken } from '../lib/api/auth';
  import { firebaseAuth } from '../lib/firebase/firebase.client';

  const unsubscribe = firebaseAuth.onIdTokenChanged(async (user) => {
    const token = await user?.getIdToken();
    await refreshToken(token);
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<slot />
