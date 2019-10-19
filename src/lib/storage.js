const STORAGE_KEY = 'zformative'
const CSRF_TOKEN = `csrf`

export default {
  get CSRFToken() {
    let stateFilter = JSON.parse(localStorage.getItem(STORAGE_KEY)) // deep clone
    // console.log(stateFilter[`${CSRF_TOKEN}`][`${CSRF_TOKEN}`])
    return null
    // return `${stateFilter} ${CSRF_TOKEN}`
  },
  // set CSRFToken(value) {
  //   localStorage.setItem(CSRF_TOKEN, value)
  // },
  clearStorage: () => {
    localStorage.removeItem(CSRF_TOKEN)
  },
}
