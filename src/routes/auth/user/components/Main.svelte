<script>
  export let repos;
  export let users;
  console.log('repoArray', repos);
  console.log('usersArray', users);

  const getLanguages = (repos) => {
    const languages = repos.map((repo) => repo.language).filter((lang) => lang && lang !== 'Shell');
    const uniqueLanguages = [...new Set(languages)].slice(0, 5);
    return uniqueLanguages;
  };

  const languages = getLanguages(repos);
</script>

<main class="flex flex-1 flex-col p-4">
  <section id="introPage" class="grid grid-cols-1 gap-10 py-8 sm:py-14 lg:grid-cols-2">
    <div class="flex flex-col gap-6 text-center md:gap-8 lg:justify-center lg:gap-10 lg:text-left">
      <h2 class="text-4xl font-semibold sm:text-5xl md:text-6xl">
        Hi! I'm <span class="poppins text-green-400">{users[0].username}</span>
        <br /> An Aspiring
        <span class="poppins text-green-400">Developer</span>
      </h2>
      <p class="text-base sm:text-lg md:text-xl">
        My <span class="text-green-400">favorite tech</span> includes
        {#each languages as language, index}
          {#if index === 0}
            {language}
          {:else if index === languages.length - 1}
            & {language}!
          {:else}
            , {language}
          {/if}
        {/each}
      </p>
      <button
        class="blueShadow poppins group relative mx-auto overflow-hidden rounded-full bg-white px-6 py-3 text-base text-slate-950 sm:text-lg md:text-xl lg:ml-0 lg:mr-auto"
      >
        <div
          class="absolute right-full top-0 z-0 h-full w-full bg-green-400 opacity-20 duration-200 group-hover:translate-x-full"
        />
        <h4 class="z-9 relative">Get in touch &rarr;</h4>
      </button>
    </div>
    <div class="relative grid place-items-center shadow-2xl">
      <img
        src="https://avatars.githubusercontent.com/u/117169759?s=400&v=4"
        alt="Current User"
        class="z-[2] max-h-[70vh] overflow-hidden rounded-full object-cover"
      />
    </div>
  </section>
</main>
