import url from 'url'

export const checkWindowExists = () => typeof window !== 'undefined'

export const parseURL = x => (checkWindowExists() ? new URL(x) : url.parse(x))

export const validDomain = x => {
  try {
    const u = parseURL(x)
    return u && u.href
  } catch (e) {
    const DOMAIN = 'https://open.sorcerers.dev'
    const u2 = parseURL(DOMAIN + '/' + x)
    return u2 && u2.href
  } finally {
    return false
  }
}
