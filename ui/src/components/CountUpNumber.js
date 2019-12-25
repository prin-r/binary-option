import React, { useEffect } from 'react'
import { useCountUp } from 'react-countup'
import { usePriceContextState } from 'context/Price'

const CompleteHook = () => {
  const [{ latest, _ }] = usePriceContextState()

  const { countUp, update } = useCountUp({
    start: 0,
    end: 0,
    delay: 0,
    duration: 0.2,
  })

  useEffect(() => {
    update(Number(latest.px))
  }, [latest.px, update])

  return <div>{Number(countUp / 1e18).toFixed(4)}</div>
}
export default CompleteHook
