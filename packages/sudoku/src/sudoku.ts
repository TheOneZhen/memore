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
  }

  init() {}

  insertRandomNumber() {}

  help() {}

  autoResolve() {}
}
