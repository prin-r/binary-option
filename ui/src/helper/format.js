export const formatData = rawData => {
  const timestamp = rawData.ts * 1000
  const value = Number(parseFloat(rawData.px / 1e18).toFixed(4))
  return [timestamp, value]
}
