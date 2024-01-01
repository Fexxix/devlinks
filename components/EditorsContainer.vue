<script setup lang="ts">
const { currentTab } = useCurrentTab()
</script>

<template>
  <div
    class="w-[62%] relative border h-full border-white rounded-md overflow-x-hidden"
  >
    <div
      :style="{
        left: `${currentTab === 'links' ? '0' : '-100%'}`,
      }"
      class="flex absolute p-8 pb-0 gap-16 w-full h-full transition-all"
    >
      <LinksEditor />
      <ProfileEditor />
    </div>
  </div>
</template>

<style>
/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
