require('prismjs/plugins/line-numbers/prism-line-numbers.css')

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(`open.sorcerers.dev has been updated. Reload with new data?`)
  if (answer) {
    window.location.reload()
  }
}
