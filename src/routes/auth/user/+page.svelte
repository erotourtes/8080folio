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

  interface User {
    bio: string | null;
    blog: string;
    created_at: string;
    html_url: string;
    name: string | null;
    public_repos: number;
    repos_url: string;
    total_private_repos: number;
    username: string;
  }

  export let repos: Repository[] = [];
  export let users: User[] = [];
  let loading: boolean = true;

  async function fetchReposData(): Promise<Repository[]> {
    let array: Repository[] = [];
    const querySnapshot = await getDocs(collection(firebaseDb, 'repos'));
    querySnapshot.forEach((doc) => {
      array.push(doc.data() as Repository);
    });
    return array;
  }

  async function fetchUsersData(): Promise<User[]> {
    let array: User[] = [];
    const querySnapshot = await getDocs(collection(firebaseDb, 'users'));
    querySnapshot.forEach((doc) => {
      array.push(doc.data() as User);
    });
    return array;
  }

  async function loadData() {
    [repos, users] = await Promise.all([fetchReposData(), fetchUsersData()]);
    loading = false;
  }

  loadData();
</script>

{#if loading}
  <p>Loading...</p>
{:else}
  <Main {repos} {users} />
{/if}
