export class Heap<T> {
  BT: Array<T>

  constructor(
    public maxLength = Number.POSITIVE_INFINITY,
    public compare: (val1: T, val2: T) => number,
  ) {
    this.BT = []
  }

  pop() {}

  push(...values: T[]) {
    for (const value of values) {
      this.BT.push(value)
      this.siftdown()
    }
    return values
  }

  pushpop(value: T) {
    if (this.BT.length === 0) this.BT.push(value)
    else {
      this.BT[0] = value
      // this.siftdown()up
    }
  }

  siftdown() {
    let pos = this.BT.length - 1

    while (pos > 0) {
      const parentPos = (pos - 1) >> 1
      const parent = this.BT[parentPos]

      if (this.compare(parent, this.BT[pos]) < 0) break
      this.swap(pos, parentPos)
      pos = parentPos
    }
  }

  siftup() {
    const start = 0
    const end = this.BT.length
    const middle = start * 2 + 1
  }

  adjust(start: number) {
    const left = start * 2 + 1
    const right = start * 2 + 2
    let middle = start

    if (middle >= this.BT.length) return
    if (
      left < this.BT.length &&
      this.compare(this.BT[middle], this.BT[left]) > 0
    )
      middle = left
    if (
      right < this.BT.length &&
      this.compare(this.BT[middle], this.BT[right]) > 0
    )
      middle = right

    if (middle !== start) {
      ;[this.BT[middle], this.BT[start]] = [this.BT[start], this.BT[middle]]
      this.adjust(middle)
    }
  }

  swap(index1: number, index2: number) {
    const middle = this.BT[index1]
    this.BT[index1] = this.BT[index2]
    this.BT[index2] = middle
  }
}

// 先按照最大堆来
