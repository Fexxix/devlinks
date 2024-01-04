type UserData = {
  name: string
  email: string
  imgURL: string
  links: {
    platform: Platform
    userURL: string
  }[]
}

export function useCurrentTab() {
  const currentTab = useState<"links" | "profile">("currentTab", () => "links")

  return {
    currentTab,
    setCurrentTab(tab: typeof currentTab.value) {
      currentTab.value = tab
    },
  }
}

export function useUserData() {
  const userData = useState<UserData>("userData", () => ({
    name: "",
    email: "",
    imgURL: "",
    // "https://cdn.discordapp.com/attachments/805028085425635331/1186649351737581638/GAuy2Mza0AAMRJi.jpeg?ex=65940454&is=65818f54&hm=45a99ebd613b58fa0f4a37530927b8a9df527083ad109d97ee44c6fe7f4bf996&",
    links: [],
  }))

  return {
    userData,
    removeLink(index: number) {
      userData.value.links.splice(index, 1)
    },
  }
}

type Errors = {
  [key in keyof UserData]: key extends "links"
    ? { message: string; index: number }[]
    : { message: string }
}

export function useErrors() {
  return useState<Errors>("errors", () => ({
    name: { message: "" },
    email: { message: "" },
    imgURL: { message: "" },
    links: [],
  }))
}
