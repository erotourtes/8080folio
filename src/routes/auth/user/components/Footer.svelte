<script>
  export let users;
</script>

<footer
  id="contact"
  class="flex flex-col items-center justify-center gap-4 border-t border-solid border-green-950 bg-black py-20 sm:gap-8 sm:py-32"
>
  <p class="bg-white px-8 py-4 font-medium text-slate-950">Connect with me &darr;</p>
  <div class="flex flex-col items-center justify-center gap-4">
    <p>
      <b class="pr-2">GitHub</b>
      <!-- <b class="pr-2">LinkedIn</b> -->
      <a href={users[0].html_url} target="_blank" class="text-green-400"
        >{users[0].username}<sup class=""
          ><span class="scale-75 pl-0.5 text-xs"
            ><i class="fa-solid fa-arrow-up-right-from-square scale-[75%] text-xs" /></span
          ></sup
        ></a
      >
    </p>
  </div>
</footer>
