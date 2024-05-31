<script lang="ts">
  import Main from './components/Main.svelte';
  import { firebaseDb } from '../../../lib/firebase/firebase.client';
  import { collection, getDocs } from 'firebase/firestore';

  interface Repository {
    user_uid: string;
    html_url: string;
    contributors: any[];
    languages: Record<string, any>;
    stargazers_count: number;
  }

  export let repos: Repository[] = [];
  let loading: boolean = true;

  // TO DO: Get data from firestore
  async function fetchUserData(): Promise<Repository[]> {
    let array: Repository[] = [];
    const querySnapshot = await getDocs(collection(firebaseDb, 'repos'));
    querySnapshot.forEach((doc) => {
      array.push(doc.data() as Repository);
    });

    console.log(`ARRAY LENGTH: ${array.length}`);
    console.log(array[1]);
    console.log(typeof array);
    return array;
  }

  async function loadData() {
    repos = await fetchUserData();
    console.log('Loaded repos:', repos);
    loading = false;
  }

  loadData();
</script>

{#if loading}
  <p>Loading...</p>
{:else}
  <Main {repos} />
{/if}
