<script setup lang="ts">
const platforms = [...PLATFORMS]
const { userData, removeLink } = useUserData()

const selectedPlatforms = computed({
  get: () => userData.value.links.map((p) => p.platform),
  set: (selectedOptions: Platform[]): void => {
    if (selectedOptions.length === 0) {
      userData.value.links.length = 0
      return
    }

    if (selectedPlatforms.value.length > selectedOptions.length) {
      const removedPlatform = getRemovedElement(
        selectedPlatforms.value,
        selectedOptions
      )
      return removeLink(selectedPlatforms.value.indexOf(removedPlatform))
    }

    userData.value.links.push({
      platform: selectedOptions.at(-1)!,
      userURL: "",
    })
  },
})

const linksContainerRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const linksContainerRect = linksContainerRef.value!.getBoundingClientRect()

  linksContainerRef.value!.style.height = `${linksContainerRect.height}px`
  linksContainerRef.value!.classList.remove("hidden")
  linksContainerRef.value!.classList.add("flex")
})
</script>

<template>
  <div class="flex flex-col h-full w-full flex-shrink-0">
    <div class="flex flex-col gap-3 justify-center">
      <p class="text-3xl font-bold">Customize your links</p>
      <p class="text-slate-500">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
    </div>
    <div class="p-8">
      <USelectMenu
        v-model="selectedPlatforms"
        :options="platforms"
        multiple
        option-attribute="name"
        placeholder="Add a Link"
        color="white"
        variant="outline"
        name="links"
        size="lg"
      >
        <template #label
          ><div class="text-base flex gap-2 items-center overflow-hidden">
            {{ selectedPlatforms.length ? "" : "Add a link" }}
            <UAvatar
              v-for="platform in selectedPlatforms"
              :key="platform.name"
              :src="platform.logo"
              size="2xs"
            />
          </div>
        </template>
        <template #leading>
          <UIcon name="i-heroicons-link" />
        </template>
        <template #option="{ option }">
          <div class="flex items-center">
            <UAvatar :src="option.logo" size="3xs" class="mr-2" />
            {{ option.name }}
          </div>
        </template>
      </USelectMenu>
    </div>
    <div
      ref="linksContainerRef"
      class="h-full scrollbar-hide"
      :class="{
        'relative overflow-hidden': selectedPlatforms.length === 0,
        'overflow-y-auto': selectedPlatforms.length !== 0,
      }"
    >
      <div
        v-if="selectedPlatforms.length === 0"
        class="flex flex-col items-center gap-3 w-2/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <NuxtImg
          src="/icons/illustration-empty.svg"
          class="h-52 w-52 object-contain"
          width="0"
          height="0"
        />
        <p class="text-3xl font-bold">Let's get you started</p>
        <p class="text-slate-500 text-center">
          Use the &quot;Add a link&quot; select menu to get started. Once you
          have more than one link, you can reorder and edit them. We're here to
          help you share your profiles with everyone!
        </p>
      </div>
      <DraggableLinks />
    </div>
  </div>
</template>

<style>
[data-headlessui-state="open"] button {
  @apply ring-accent;
}
</style>
