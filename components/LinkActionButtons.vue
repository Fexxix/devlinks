<script setup lang="ts">
const { userData } = useUserData()
const toast = useToast()

function validateUserData() {
  if (isCompletelyBlank()) {
    return toast.add({
      title: "Please fill in all fields",
    })
  }

  if (userData.value.links.length === 0) {
    return toast.add({
      title: "Please add at least one link",
    })
  }

  // if (userData.)

  const invalidLinkIndices = getInvalidLinksIndices()

  if (invalidLinkIndices.length !== 0)
    toast.add({
      title: "Invalid links! Please remove invalid links before saving.",
      icon: "i-heroicons-x-circle w-6 h-6 text-red-600",
    })
}

function getInvalidLinksIndices() {
  // Allow alphanumeric characters, hyphens, underscores, and dollar sign
  return userData.value.links
    .filter(({ userURL }) => !/^[a-zA-Z0-9_$-]+$/.test(userURL))
    .map((_, i) => i)
}

function isCompletelyBlank() {
  return (
    userData.value.links.length === 0 &&
    userData.value.email === "" &&
    userData.value.imgURL === "" &&
    userData.value.name === ""
  )
}
</script>

<template>
  <div class="flex gap-3">
    <button
      @click="validateUserData"
      class="flex items-center gap-2 border border-accent py-1 px-2 rounded-md hover:bg-accent hover:shadow-accent hover:shadow-button transition-colors"
    >
      <UIcon name="i-heroicons-pencil-square" />
      <span class="hidden md:block"> Save </span>
    </button>
    <button
      class="flex items-center gap-2 border border-accent py-1 px-2 rounded-md hover:bg-accent hover:shadow-accent hover:shadow-button transition-colors"
    >
      <UIcon name="i-heroicons-arrow-top-right-on-square" />
      <span class="hidden md:block">
        /{{ userData.name.toLowerCase() || "username" }}
      </span>
    </button>
  </div>
</template>
