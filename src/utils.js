export function getOS(userAgent) {
  return /Mac/.test(userAgent) ?
    'macOS' :
    /Windows/.test(userAgent) ?
    'Windows' :
    'Linux'
}
