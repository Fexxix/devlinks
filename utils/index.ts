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
