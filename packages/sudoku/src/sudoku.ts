import { DIFFICUTLY } from './difficutly'

export class Sudoku {
  container: Array<Array<number>>
  rows: Array<Set<number>>
  cols: Array<Set<number>>

  constructor(
    public size: number = 9,
    public difficutly: DIFFICUTLY = DIFFICUTLY.ESAY,
  ) {
    this.container = Array.from({ length: size }).map(() =>
      Array.from<number>({ length: size }).fill(0),
    )
    this.rows = Array.from({ length: size }).map(() => new Set<number>())
    this.cols = Array.from({ length: size }).map(() => new Set<number>())
    this.init()
  }

  init() {
    for (let row = 0; row < this.size; ++row) {
      const rowSet = this.rows[row]

      for (let col = 0; col < this.size; ++col) {
        const colSet = this.cols[col]

        this.container[row][col] = this.generateRandomNumber(rowSet, colSet)
      }
    }
  }

  generateRandomNumber(rowSet: Set<number>, colSet: Set<number>) {
    let res = Math.floor(Math.random() * (this.size - 1)) + 1

    while (rowSet.has(res) || colSet.has(res)) res = (res + 1) % this.size

    rowSet.add(res)
    colSet.add(res)
    return res
  }
  /**
   * prompt one
   */
  help() {}

  solve() {}
}

const test = new Sudoku(9, DIFFICUTLY.ESAY)
console.log(test.container)
