export default defineAppConfig({
  ui: {
    strategy: "override",
    notification: {
      wrapper: "w-full pointer-events-auto",
      title: "lg:text-base",
      background: "bg-blackgray",
      ring: "ring-1 ring-darkgray",
      icon: {
        base: "flex-shrink-0 w-5 h-5",
        color: "",
      },
      shadow: "shadow-button",
      transition: {
        enterActiveClass: "transform ease-out duration-300 transition",
        enterFromClass: "-translate-y-7 opacity-0",
        enterToClass: "translate-y-0 opacity-100 sm:translate-x-0",
        leaveActiveClass: "transition ease-in duration-100",
        leaveFromClass: "opacity-100",
        leaveToClass: "opacity-0",
      },
    },
    notifications: {
      position: "top-0 left-1/2 -translate-x-1/2",
      wrapper: "fixed flex flex-col justify-end z-[55]",
      container: "px-4 sm:px-6 py-6 space-y-3 overflow-y-auto",
      width: "w-full sm:w-[420px]",
    },
    select: {
      base: "relative block w-full cursor-pointer -z-10 select-none disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 transition-shadow",
      color: {
        white: {
          outline:
            "bg-blackgray text-white ring-1 ring-inset ring-darkgray focus:ring-accent focus:ring-2",
        },
      },
    },
    selectMenu: {
      base: "relative focus:outline-none overflow-y-auto scroll-py-1 scrollbar-hide",
      background: "bg-blackgray",
      ring: "ring-0",
      shadow: "shadow-accent shadow-[0_0_10px_3px]",
      option: {
        active: "bg-accent/40 cursor-pointer",
      },
      transition: {
        enterActiveClass: "transition duration-100 ease-out",
        enterFromClass: "transform scale-95 opacity-0",
        enterToClass: "transform scale-100 opacity-100",
        leaveActiveClass: "transition duration-75 ease-out",
        leaveFromClass: "transform scale-100 opacity-100",
        leaveToClass: "transform scale-95 opacity-0",
      },
    },
  },
})
