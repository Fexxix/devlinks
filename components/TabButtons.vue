<script setup lang="ts">
const linksBtnRef = ref<HTMLButtonElement | null>(null)
const profileBtnRef = ref<HTMLButtonElement | null>(null)
const indicatorRef = ref<HTMLDivElement | null>(null)
const { currentTab, setCurrentTab } = useCurrentTab()

let indicatorDimensions = reactive({
  left: "0px",
  top: "0px",
  width: "0px",
  height: "0px",
})

function setIndicatorDimensions(rect: DOMRect, parentRect: DOMRect) {
  indicatorDimensions.left = `${rect.left - parentRect.left}px`
  indicatorDimensions.top = `${rect.top - parentRect.top}px`
  indicatorDimensions.width = `${rect.width}px`
  indicatorDimensions.height = `${rect.height}px`
}

function handleResize() {
  const currentBtn = getCurrentTabButton()

  indicatorRef.value!.style.transition = "none"
  setIndicatorDimensions(
    currentBtn.getBoundingClientRect(),
    (currentBtn.parentElement as HTMLDivElement).getBoundingClientRect()
  )
  setTimeout(() => indicatorRef.value!.style.removeProperty("transition"))
}

function handleTabChange(tab: typeof currentTab.value) {
  setCurrentTab(tab)

  const currentBtn = getCurrentTabButton()

  setIndicatorDimensions(
    currentBtn.getBoundingClientRect(),
    (currentBtn.parentElement as HTMLDivElement).getBoundingClientRect()
  )
}

function getCurrentTabButton() {
  return (
    currentTab.value === "links" ? linksBtnRef.value : profileBtnRef.value
  )!
}

onMounted(() => {
  const btnRect = linksBtnRef.value!.getBoundingClientRect()
  const btnParentRect = linksBtnRef.value!.getBoundingClientRect()

  setIndicatorDimensions(btnRect, btnParentRect)

  window.addEventListener("resize", handleResize)
})

onUnmounted(() => window.removeEventListener("resize", handleResize))
</script>

<template>
  <div
    class="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-3 h-fit isolate"
  >
    <!-- Indicator -->
    <div
      ref="indicatorRef"
      class="absolute bg-accent rounded-md -z-10 transition-all"
      :style="{ ...indicatorDimensions }"
    />
    <button
      ref="linksBtnRef"
      class="flex gap-2 items-center py-1 p-2 border border-accent rounded-md hover:bg-accent/40"
      @click="handleTabChange(`links`)"
    >
      <UIcon name="i-heroicons-link" />
      <p class="hidden md:block">Links</p>
    </button>
    <button
      ref="profileBtnRef"
      class="flex gap-2 items-center py-1 p-2 border border-accent rounded-md hover:bg-accent/40"
      @click="handleTabChange(`profile`)"
    >
      <UIcon class="h-5 w-5" name="i-heroicons-user-circle-solid" />
      <p class="hidden md:block">Profile Details</p>
    </button>
  </div>
</template>
