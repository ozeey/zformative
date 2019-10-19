export const isDevHosted = window.location.hostname.includes('dev.cmobiler.com')
export const isLocalHosted = window.location.hostname.includes('localhost')
export const isProdHosted = !isDevHosted && !isLocalHosted

export default { isProdHosted, isDevHosted, isLocalHosted }
