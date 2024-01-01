<script setup lang="ts">
import { Container, Draggable, type DropResult } from "vue3-smooth-dnd"
const { userData, removeLink } = useUserData()

function onDrop(dropResult: DropResult) {
  userData.value.links = applyDrag(userData.value.links, dropResult)
}
</script>

<template>
  <Container
    orientation="vertical"
    tag="ul"
    lock-axis="y"
    class="flex flex-col gap-3 h-full w-full"
    :drag-handle-selector="'[data-drag-handler]'"
    @drop="onDrop"
  >
    <Draggable
      v-for="(link, index) in userData.links"
      :key="link.platform.name"
      tag="li"
      class="link-editor px-4 handle pt-2 bg-blackgray border border-darkgray pb-4 rounded-md flex flex-col gap-1 flex-shrink-0"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button class="relative z-10 pt-1 cursor-move" data-drag-handler>
            <UIcon name="i-heroicons-bars-2" />
          </button>
          <p>{{ link.platform.name }}</p>
        </div>
        <button @click="removeLink(index)" class="pr-2">
          <UIcon name="i-heroicons-minus-circle" class="text-red-600 h-5 w-5" />
        </button>
      </div>
      <div
        class="flex rounded-md border border-darkgray has-[input:focus]:border-accent has-[input:focus]:shadow-accent/40 has-[input:focus]:shadow-[0_0_0_3px] transition-shadow"
      >
        <div class="p-2 flex items-center border-r border-r-darkgray">
          <UAvatar :src="link.platform.logo" size="2xs" />
        </div>
        <div class="p-2 flex items-center border-r border-r-darkgray">
          <span>{{
            link.platform.url.replace("https://", "").replace("www.", "")
          }}</span>
        </div>
        <input
          class="p-2 bg-transparent flex-grow outline-none"
          type="text"
          v-model="link.userURL"
        />
      </div>
    </Draggable>
    <div class="p-4"></div>
  </Container>
</template>
