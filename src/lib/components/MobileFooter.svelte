<style>
  @keyframes fadeInUp {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  .hideaftertenseconds {
    animation: fadeInUp 1s ease-in-out 6s forwards;
  }
</style>

<div class="md:hidden fixed bottom-0 left-0 w-full p-4 z-50 text-center">
    <p class="text-[10px] text-neutral-500 hideaftertenseconds">
    Scroll bottom to see more →
  </p>
  <p class="text-[10px] text-neutral-500">
    Copyright Mert Doğu 2026 © All rights reserved.
  </p>
</div>
