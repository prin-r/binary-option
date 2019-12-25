import { useState, useEffect } from 'react'

export default ({ baseTime }) => {
  const [remaining, setRemaining] = useState(baseTime - Date.now())

  useEffect(() => {
    setRemaining(baseTime - Date.now())
  }, [baseTime])

  useEffect(() => {
    if (remaining <= 0) return
    ;(async () => {
      await new Promise(r => setTimeout(r, 1000))
      setRemaining(baseTime - Date.now())
    })()
  }, [remaining])

  const secs = Math.floor(remaining / 1000)
  const minutes = Math.floor(secs / 60)
  let secsRemain = secs - minutes * 60
  secsRemain = secsRemain < 10 ? '0' + secsRemain : secsRemain

  return remaining > 0 ? 'Settle in ' + minutes + ':' + secsRemain : 'Settling'
}
