<script setup lang="ts">
useHead({
  title: "devlinks",
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/icons/logo-devlinks-small.svg",
    },
  ],
})
</script>

<template>
  <NuxtPage />
  <UNotifications />
</template>

<style>
body {
  @apply flex flex-col bg-black h-screen text-white;
}

#__nuxt {
  @apply contents;
}
</style>
