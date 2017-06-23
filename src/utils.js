export function getOS() {
  if (process.server) return ''

  const { userAgent } = window.navigator
  return /Mac/.test(userAgent) ?
    'macOS' :
    /Windows/.test(userAgent) ?
    'Windows' :
    'Linux'
}
