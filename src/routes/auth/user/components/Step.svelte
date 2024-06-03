<script>
  export let step;
  function getRepositoryName(url) {
    const repoNamePattern = /\/([^\/]+)\/?$/;
    const match = url.match(repoNamePattern);
    if (match) {
      return match[1];
    } else {
      throw new Error('Invalid GitHub URL');
    }
  }
  const repoName = getRepositoryName(step.html_url);
  const dateOnly = step.created_at.slice(0, 10);
  const languages = Object.keys(step.languages);
</script>

<div
  class="group flex cursor-pointer flex-col gap-4 rounded-lg border border-solid border-green-700 p-4 text-center duration-200 hover:border-green-400 sm:p-6 md:p-8"
>
  <div
    class="mx-auto -mt-10 grid place-items-center bg-slate-950 px-4 text-5xl duration-200 sm:-mt-12 md:-mt-14 md:text-6xl lg:-mt-16"
  >
    <h3
      class="overflow-hidden text-ellipsis break-words text-xl font-medium sm:text-2xl md:text-3xl"
    >
      {repoName}
    </h3>
  </div>
  {dateOnly}
  <div class="mt-4 flex flex-wrap justify-center gap-2">
    {#each languages as language}
      <span
        class="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700"
      >
        {language}
      </span>
    {/each}
  </div>
  <slot />
</div>
