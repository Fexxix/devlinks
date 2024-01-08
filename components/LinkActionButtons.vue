<script setup lang="ts">
const { userData } = useUserData()
const toast = useToast()
const errors = useErrors()

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

  if (userData.value.links.some((l) => l.userURL === "")) {
    return toast.add({
      title: "Please fill in the selected links",
    })
  }

  if (userData.value.email === "" || userData.value.name === "") {
    return toast.add({
      title: "Please fill profile details",
    })
  }

  if (errorsExist()) {
    return toast.add({
      title: "Having trouble validating. Please fix all errors.",
      icon: "i-heroicons-x-circle h-6 w-6 text-red-600",
    })
  }
}

function errorsExist() {
  return (
    errors.value.name.message !== "" ||
    errors.value.email.message !== "" ||
    errors.value.links.size > 0
  )
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
