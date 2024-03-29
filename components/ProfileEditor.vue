<script setup lang="ts">
const toast = useToast()
const { userData } = useUserData()
const errors = useErrors()
const hasTouched = ref({ name: false, email: false })

let pfpFileReader: FileReader

const handleFileChange = (e: Event) => {
  if (e.currentTarget == null) return

  const fileInput = e.currentTarget as HTMLInputElement
  const file = fileInput.files?.[0]

  if (!file) return

  if (!isValidImageFile(file)) {
    toast.add({ title: "Please select a valid image file." })
    return
  }

  pfpFileReader.readAsDataURL(file)
}

const isValidImageFile = (file: File) => {
  const allowedExtensions = ["jpg", "jpeg", "png"]
  const extension = file.name.split(".").pop()?.toLowerCase() || ""
  return allowedExtensions.includes(extension)
}

onMounted(() => {
  pfpFileReader = new FileReader()
  pfpFileReader.onload = () =>
    (userData.value.imgURL = pfpFileReader.result as string)
})

function validateName() {
  if (!hasTouched.value.name) return

  if (!userData.value.name) {
    errors.value.name.message = "Name cannot be blank"
    return
  }

  if (userData.value.name.length < 3) {
    errors.value.name.message = "Name must be at least 3 characters long"
    return
  }

  errors.value.name.message = ""
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail() {
  if (!hasTouched.value.email) return

  if (!userData.value.email) {
    errors.value.email.message = "Email cannot be blank"
    return
  }

  if (!emailRegex.test(userData.value.email)) {
    errors.value.email.message = "Invalid email format"
    return
  }

  errors.value.email.message = ""
}

function handleFieldBlur(fieldName: keyof typeof hasTouched.value) {
  hasTouched.value[fieldName] = true
  if (fieldName == "name") validateName()
  if (fieldName == "email") validateEmail()
}
</script>

<template>
  <div class="flex flex-col h-full w-full flex-shrink-0">
    <div class="flex flex-col gap-3 justify-center">
      <p class="text-3xl font-bold">Profile Details</p>
      <p class="text-slate-500">
        Add your details to create a personal touch to your profile.
      </p>
    </div>
    <div class="flex flex-col flex-grow justify-around">
      <div class="flex flex-col gap-5 items-center">
        <div
          class="relative w-48 h-48 rounded-full flex-shrink-0 overflow-hidden"
        >
          <NuxtImg
            v-if="!!userData.imgURL"
            class="absolute inset-0 h-full w-full object-cover"
            :src="userData.imgURL"
            height="0"
            width="0"
          />
          <label
            for="profile_picture"
            class="flex flex-col justify-center items-center gap-3 bg-accent/50 opacity-0 hover:opacity-100 transition-opacity absolute inset-0 cursor-pointer z-10"
            :class="{ 'opacity-100': !userData.imgURL }"
          >
            <UIcon class="h-8 w-8" name="i-heroicons-photo" />
            <div>&plus; Upload Photo</div>
            <input
              @change="handleFileChange"
              type="file"
              name="profile_picture"
              id="profile_picture"
              class="hidden"
            />
          </label>
        </div>
        <label for="profile_picture">Profile Picture</label>
        <p class="text-sm text-slate-500 basis-1/5">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>
      <div class="flex flex-col gap-3">
        <div class="flex gap-5 items-center">
          <label class="w-12" for="name">Name</label>
          <div
            class="flex flex-grow rounded-md border border-darkgray has-[input:focus]:border-accent has-[input:focus]:shadow-accent/40 has-[input:focus]:shadow-[0_0_0_3px] transition-shadow"
          >
            <div class="p-2 flex items-center border-r border-r-darkgray">
              <UIcon class="w-5 h-5" name="i-heroicons-user-circle" />
            </div>
            <input
              @blur="() => handleFieldBlur('name')"
              @input="validateName"
              v-model="userData.name"
              class="p-2 bg-transparent flex-grow outline-none"
              type="text"
              placeholder="John Doe"
            />
          </div>
        </div>
        <div v-if="errors.name.message" class="text-red-600 text-sm">
          {{ errors.name.message }}
        </div>
        <div class="flex gap-5 items-center">
          <label class="w-12" for="email">Email</label>
          <div
            class="flex flex-grow rounded-md border border-darkgray has-[input:focus]:border-accent has-[input:focus]:shadow-accent/40 has-[input:focus]:shadow-[0_0_0_3px] transition-shadow"
          >
            <div class="p-2 flex items-center border-r border-r-darkgray">
              <UIcon class="w-5 h-5" name="i-heroicons-at-symbol" />
            </div>
            <input
              @blur="() => handleFieldBlur('email')"
              @input="validateEmail"
              v-model="userData.email"
              class="p-2 bg-transparent flex-grow outline-none"
              type="text"
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div v-if="errors.email.message" class="text-red-600 text-sm">
          {{ errors.email.message }}
        </div>
      </div>
    </div>
  </div>
</template>
