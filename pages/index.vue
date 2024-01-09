<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
})
</script>

<template>
  <div class="h-screen flex flex-col gap-10 justify-center items-center">
    <div class="flex items-center gap-2 select-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        class="h-20 w-20"
        viewBox="0 0 32 32"
      >
        <path
          fill="#42b883"
          fill-rule="evenodd"
          d="M4.619 27.38c1.954 1.953 5.095 1.953 11.38 1.953 6.286 0 9.429 0 11.38-1.953 1.954-1.95 1.954-5.095 1.954-11.38 0-6.286 0-9.428-1.953-11.381C25.43 2.667 22.285 2.667 16 2.667c-6.286 0-9.428 0-11.381 1.952-1.952 1.954-1.952 5.095-1.952 11.38 0 6.286 0 9.429 1.952 11.38Zm8.047-15.713A4.333 4.333 0 1 0 17 16a1 1 0 0 1 2 0 6.333 6.333 0 1 1-6.334-6.334 1 1 0 1 1 0 2Zm11 4.333a4.333 4.333 0 0 1-4.333 4.333 1 1 0 1 0 0 2A6.333 6.333 0 1 0 13 16a1 1 0 1 0 2 0 4.334 4.334 0 0 1 8.666 0Z"
          clip-rule="evenodd"
        />
      </svg>
      <h1 class="text-5xl font-bold">devlinks</h1>
    </div>
    <h2 class="text-4xl font-bold">Share your profile with the World!</h2>
    <NuxtLink
      class="flex items-center gap-2 px-4 py-2 shadow-button shadow-accent border border-accent rounded-md hover:bg-accent transition-colors"
      to="/login"
      >Get Started</NuxtLink
    >
  </div>
</template>
