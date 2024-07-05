export enum Difficulty {
  esay = 62,
  medium = 53,
  hard = 44,
  varyHard = 35,
  insane = 26,
  inhuman = 17,
}

export enum Errors {
  RangeUndefined = 'Range undefined!',
}

export class Sudoku {
  size: number = 9

  constructor(public difficulty: Difficulty = Difficulty.esay) {}

  generate() {
    const blankBoard = ''.padEnd(this.size * this.size, '.')
  }

  private randRange(max: number, min: number = 0) {
    if (max) return Math.floor(Math.random() * (max - min)) + min
    else throw Errors.RangeUndefined
  }

  private forceRange(num: number) {}
}
