import { Middleware } from "@reduxjs/toolkit"
export const saveToLocalStorage: Middleware<{}, any> =
  (store) => (next) => (action) => {
    const result = next(action)
    localStorage.setItem("reduxState", JSON.stringify(store.getState()))
    return result
  }

export function loadFromLocalStorage() {
  return localStorage.getItem("reduxState")
    ? JSON.parse(localStorage.getItem("reduxState") as string)
    : undefined
}
