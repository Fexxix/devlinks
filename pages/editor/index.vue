<script setup lang="ts">
const { signOut } = useAuth()
</script>

<template>
  <button @click="() => signOut()">Sign Out</button>
  <Header />
  <Editor />
</template>
