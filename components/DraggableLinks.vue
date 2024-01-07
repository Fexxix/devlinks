<script setup lang="ts">
import { Container, Draggable, type DropResult } from "vue3-smooth-dnd"
const { userData, removeLink } = useUserData()
const errors = useErrors()

function onDrop(dropResult: DropResult) {
  userData.value.links = applyDrag(userData.value.links, dropResult)
}

const hasTouched = ref<Record<Platform["name"], boolean>>(
  Object.fromEntries(
    userData.value.links.map((l) => [l.platform.name, false])
  ) as Record<Platform["name"], boolean>
)

function validateLink(platformName: Platform["name"], value: string) {
  if (!hasTouched.value[platformName]) return

  if (!value || value.trim() === "") {
    return errors.value.links.set(platformName, { message: "Cannot be blank" })
  }

  if (!/^[a-zA-Z0-9$\-_\.]+$/.test(value)) {
    return errors.value.links.set(platformName, {
      message: "Invalid for a link",
    })
  }

  errors.value.links.delete(platformName)
}

function handleBlur(platformName: Platform["name"], value: string) {
  hasTouched.value[platformName] = true
  validateLink(platformName, value)
}

watchEffect(() => {
  const hasTouchedKeys = Object.keys(hasTouched.value)

  if (hasTouchedKeys.length < userData.value.links.length) {
    hasTouched.value[userData.value.links.at(-1)!.platform.name] = false
  }
  if (hasTouchedKeys.length > userData.value.links.length) {
    const removedPlatformName = getRemovedElement(
      hasTouchedKeys,
      userData.value.links.map((l) => l.platform.name)
    ) as Platform["name"]

    delete hasTouched.value[removedPlatformName]
    errors.value.links.delete(removedPlatformName)
  }
})
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
      class="flex-shrink-0"
    >
      <div
        class="px-4 pt-2 w-full-h-full bg-blackgray border border-darkgray rounded-md flex flex-col gap-1.5"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <button class="relative z-10 pt-1 cursor-move" data-drag-handler>
              <UIcon name="i-heroicons-bars-2" />
            </button>
            <label :for="link.platform.name">{{ link.platform.name }}</label>
          </div>
          <button @click="removeLink(index)" class="pr-2">
            <UIcon
              name="i-heroicons-minus-circle"
              class="text-red-600 h-5 w-5"
            />
          </button>
        </div>
        <div class="flex flex-col">
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
              @blur="(e) => handleBlur(link.platform.name, (e.target as HTMLInputElement).value)"
              @input="(e) => validateLink(link.platform.name, (e.target as HTMLInputElement).value)"
              v-model="link.userURL"
              :id="link.platform.name"
              :name="link.platform.name"
            />
          </div>
          <div
            class="text-red-600 text-sm p-2"
            :class="{
              invisible: !errors.links.get(link.platform.name)?.message,
            }"
          >
            {{ errors.links.get(link.platform.name)?.message }}
          </div>
        </div>
      </div>
    </Draggable>
    <div class="p-4"></div>
  </Container>
</template>
