export function rangeValue(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function shuffleArray(arr: any[]) {
  const len = arr.length

  for (let i = 0; i < len; ++i) {
    const j = rangeValue(len - 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}
