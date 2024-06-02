export const getUserToLc = () => {
  const lc = localStorage.getItem('user')

  if (!lc) {
    return undefined
  }

  return JSON.parse(lc)
}
