import type { DropResult } from "vue3-smooth-dnd"

export function applyDrag<T>(arr: T[], dropResult: DropResult) {
  const { removedIndex, addedIndex } = dropResult

  if (removedIndex === null && addedIndex === null) return arr
  let itemToAdd: any

  if (removedIndex !== null) {
    itemToAdd = arr.splice(removedIndex, 1)[0]
  }
  if (addedIndex !== null) {
    arr.splice(addedIndex, 0, itemToAdd)
  }

  return arr
}

export function getRemovedElement<T>(arr1: T[], arr2: T[]) {
  const set2 = new Set(arr2)

  const element = arr1.filter((p) => !set2.has(p))[0]

  return element
}
