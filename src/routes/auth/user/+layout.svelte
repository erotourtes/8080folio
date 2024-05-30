<script>
  import '../../../app.css';
  import Footer from './components/Footer.svelte';
  import Header from './components/Header.svelte';

  //let y;
  let innerWidth = 0;
  let innerHeight = 0;
</script>

<div
  class="container relative mx-auto flex min-h-screen w-full max-w-[1400px] flex-col text-sm sm:text-base"
>
  <div class="">
    <button>
      <i class="fa-solid fa-arrow-up" />
    </button>
  </div>
  <Header />
  <slot />
  <Footer />
</div>

<!-- <svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth /> -->
