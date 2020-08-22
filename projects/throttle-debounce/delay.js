export const delayFn = debounce => (trailing, delay, fn) => {
  let timeoutID
  let cancelled = false
  let lastExec = 0
  const clearExistingTimeout = () => timeoutID && clearTimeout(timeoutID)
  const cancel = () => {
    clearExistingTimeout()
    cancelled = true
  }
  function delayed() {
    if (cancelled) return
    const args = arguments
    const self = this
    const elapsed = Date.now() - lastExec
    const execute = () => {
      lastExec = Date.now()
      fn.apply(self, args)
    }
    const clear = () => {
      timeoutID = null
    }
    if (debounce && !timeoutID) execute()
    clearExistingTimeout()
    if (!debounce && elapsed > delay) {
      execute()
    } else if (!trailing) {
      timeoutID = setTimeout(
        debounce ? clear : execute,
        debounce ? delay - elapsed : delay
      )
    }
  }
  delayed.cancel = cancel
  return delayed
}
export default delayFn
