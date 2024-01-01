<script setup lang="ts">
import { Container, Draggable, type DropResult } from "vue3-smooth-dnd"

const { userData } = useUserData()

function onDrop(dropResult: DropResult) {
  userData.value.links = applyDrag(userData.value.links, dropResult)
}
</script>

<template>
  <div class="h-full w-1/3 p-3 flex justify-center items-center">
    <div
      class="flex-shrink-0 h-[600px] w-[280px] border border-accent rounded-2xl"
    >
      <div class="flex items-center py-10 flex-col gap-3 h-2/5">
        <UIcon
          v-if="!userData.imgURL"
          name="i-heroicons-user-circle"
          class="rounded-full h-28 w-28 flex-shrink-0"
        />
        <NuxtImg
          v-else
          :src="userData.imgURL"
          width="0"
          height="0"
          class="rounded-full h-28 w-28 object-cover flex-shrink-0"
        />
        <div
          :class="{ 'gap-2': !userData.name || !userData.email }"
          class="flex flex-col items-center"
        >
          <p class="text-lg font-semibold" v-if="userData.name">
            {{ userData.name }}
          </p>
          <div class="bg-white/10 p-1.5 w-28 rounded-full" v-else></div>
          <p class="text-sm text-slate-500" v-if="userData.email">
            {{ userData.email }}
          </p>
          <div class="bg-white/10 p-1.5 w-14 rounded-full" v-else></div>
        </div>
      </div>
      <div class="h-3/5">
        <Container
          orientation="vertical"
          tag="ul"
          lock-axis="y"
          class="flex flex-col gap-2 items-center h-full overflow-y-scroll scrollbar-hide pb-2 links-container"
          :drag-handle-selector="'[data-drag-handler]'"
          @drop="onDrop"
          drag-class="dragging"
        >
          <Draggable
            tag="li"
            :style="{
              overflow: 'visible',
            }"
            class="contents"
            v-for="link in userData.links"
            :key="(link.platform.name as string)"
          >
            <div
              class="link relative px-4 py-2 w-56 rounded-md group border border-transparent"
              :style="{
                backgroundColor: link.platform.color,
                color: link.platform.text,
              }"
            >
              <button
                class="absolute -left-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 bg-accent text-white flex items-center z-10 cursor-move"
                data-drag-handler
              >
                <UIcon name="i-heroicons-bars-2" />
              </button>
              <a
                :href="`${link.platform.url}${link.userURL}`"
                target="_blank"
                class="flex justify-between items-center cursor-pointer"
              >
                <div class="flex items-center gap-2">
                  <NuxtImg
                    class="h-4 w-4 object-cover"
                    :src="link.platform.logo"
                    width="0"
                    height="0"
                  />
                  <p>{{ link.platform.name }}</p>
                </div>
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path
                    fill="currentColor"
                    d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
                  ></path>
                </svg>
              </a>
            </div>
          </Draggable>
        </Container>
      </div>
    </div>
  </div>
</template>

<style>
.link button {
  @apply scale-0 transition-transform;
}

.link:hover {
  @apply border-accent;
}

.link.dragging {
  @apply border-accent cursor-move;
}

.link:hover button {
  @apply scale-100;
}

.link.dragging button {
  @apply scale-100;
}

.link.dragging:hover {
  @apply border-transparent;
}

.links-container:has(.link.dragging) .link:not(.dragging) button {
  @apply scale-0;
}

.links-container:has(.link.dragging) .link:not(.dragging):hover button {
  @apply scale-0;
}

.links-container:has(.link.dragging) .link:not(.dragging):hover {
  @apply border-transparent;
}
</style>
