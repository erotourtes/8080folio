<script>
  import '../../../app.css';
  import Footer from './components/Footer.svelte';
  import Header from './components/Header.svelte';

  let y;
  let innerWidth = 0;
  let innerHeight = 0;

  function goTop() {
    document.body.scrollIntoView();
  }
</script>

<div
  class="container relative mx-auto flex min-h-screen w-full max-w-[1400px] flex-col text-sm sm:text-base"
>
  <div
    class={'fixed bottom-0 z-[10] flex w-full p-10 duration-200 ' +
      (y > 0 ? ' opacity-full pointer-events-auto' : ' pointer-events-none opacity-0')}
  >
    <button on:click={goTop} class="ml-auto rounded-full bg-slate-900 text-green-400 px-3 sm:px-4 hover:bg-slate-800 cursor-pointer aspect-square grid place-items-center" >
      <i class="fa-solid fa-arrow-up" />
    </button>
  </div>
  {* eslint-disable-next-line *}
  <Header y={y} />
  <slot />
  <Footer />
</div>

<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />
