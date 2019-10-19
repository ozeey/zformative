export const STORAGE_KEY = 'zformative'

/**
 * Use this function if you need to call a middleware
 * when setting the initial state.
 */

/* Use an IIFE to export the persisted state in a variable */
export const persistedState = (() => {
  try {
    const rawRoot = localStorage.getItem(STORAGE_KEY)
    if (rawRoot === null) return undefined
    const state = {}
    state.root = JSON.parse(rawRoot)
    return state
  } catch (err) {
    return undefined
  }
})()

/* Export a method to save state on each store update */
export const saveState = state => {
  try {
    let stateFilter = JSON.parse(JSON.stringify(state.root)) // deep clone
    ;[''] // states which we don't want to persist.
      .forEach(item => delete stateFilter[item])
    const rawState = JSON.stringify(stateFilter)
    localStorage.setItem(STORAGE_KEY, rawState)
  } catch (err) {
    // Ignore write errors.
  }
}

export const deleteState = state => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    // Ignore write errors.
  }
}
