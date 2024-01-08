<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
})

const { signIn } = useAuth()
</script>

<template>
  <button @click="() => signIn('github', { callbackUrl: '/editor' })">
    Sign In using Github
  </button>
</template>
