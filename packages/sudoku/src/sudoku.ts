/**
 * 难度：根据百分比进行数字填充
 */
export enum Difficulty {
  esay = 62,
  medium = 53,
  hard = 44,
  insane = 26,
  inhuman = 17,
}

export enum Errors {
  RangeUndefined = 'Range undefined!',
  EmptyBoard = 'Empty board!',
  InvalidBoardSize = 'Invalid board size!',
}

type RecordType = Set<number>

/**
 * 每次实例，都是一局新的游戏
 */
export class Sudoku {
  private readonly defaultDifficulty = Difficulty.medium // 默认难度
  private readonly defaultSize = 9 // 默认棋盘大小
  size: number // 棋盘边长
  difficulty: Difficulty // 难度
  squares: number // 格子数量
  board: Array<Array<number>> // 棋盘矩阵
  numberTemplate: Array<number> // 数字模板

  /**
   * 当传入字符串模板时，会解析字符串并还原棋盘
   * @param template
   */
  constructor(template: string)
  /**
   * 或者直接进行新的游戏
   * @param size size in [4, Infinity] && sqrt(size, 2) is integer
   * @param difficulty
   */
  constructor(size: number, difficulty: Difficulty)
  constructor(
    templateOrSize: number | string,
    difficulty?: number,
    validate = true,
  ) {
    this.board = [[]]
    if (typeof templateOrSize === 'string') {
      const result = this.parseTemplate(templateOrSize)
      templateOrSize = result.size
      difficulty = result.difficulty
      this.board = result.board
    }
    this.size = templateOrSize
    this.difficulty = difficulty || 0
    this.squares = templateOrSize * templateOrSize
    this.numberTemplate = Array.from({ length: this.size }).map(
      (_, index) => index + 1,
    )
    validate && this.validate()
  }

  generate() {
    const rowRecord = this.generateRecord()
    const colRecord = this.generateRecord()
    const blockRecord = this.generateRecord()
    // 生成随机一些数字代表后续填充数字的位置
    /**
     * 当数字插入失败的时候，进行进行回溯
     * @param row 行索引
     * @param col 列索引
     * @returns 需要回溯的次数，当第一列数字插入失败的时候，此时是由于列元素和块元素重复导致的，所以最优选择是回到上一列
     */
    const backTrack = (row: number, col: number): number => {
      // 获取可以插入的数字
      const rowSet = rowRecord[row]
      const colSet = colRecord[col]
      const blockSet = blockRecord[this.getBlockIndexByRowsAndCols(row, col)]
      const candidates = this.getCandidates(rowSet, colSet, blockSet)
      const cancelInsert = (val: number) => {
        rowSet.delete(val)
        colSet.delete(val)
        blockSet.delete(val)
      }
      const insert = (val: number) => {
        rowSet.add(val)
        colSet.add(val)
        blockSet.add(val)
        this.board[row][col] = val
      }

      while (true) {
        // 如果是第一列的数字，且没有可插入数字，需要回溯到上一行的第一列
        if (candidates.length === 0) return col === 1 ? this.size : 1

        const index = this.rangeValue(candidates.length - 1)
        const value = candidates[index]

        insert(value)

        const next =
          col >= this.size ? backTrack(row + 1, 0) : backTrack(row, col + 1)

        if (next === 0) break
        cancelInsert(value)
        candidates.splice(index, 1)
        if (next > 1) return next - 1
      }

      return 0
    }

    backTrack(0, 0)
  }

  generateRecord(): RecordType[] {
    return Array.from({ length: this.size }).map(() => new Set())
  }
  /**
   * 根据记录获取候选数字
   * @param records 已经被选取数字的记录
   * @returns Array
   */
  getCandidates(...records: RecordType[]): Array<number> {
    const all: RecordType = new Set()

    for (const record of records) for (const num of record) all.add(num)
    return this.numberTemplate.filter((num) => !all.has(num))
  }
  /**
   * 参数校验，校验应该是一种模式，此模式能够提供稳定的游戏模式。
   */
  validate() {
    this.size = this.validateSize(this.size)
    this.difficulty = this.validateDifficulty(this.difficulty)
    this.squares = this.size * this.size
    this.numberTemplate = Array.from({ length: this.size }).map(
      (_, index) => index + 1,
    )
  }

  private validateSize(size: typeof this.size) {
    return Number.isInteger(size) &&
      size > 1 &&
      Number.isInteger(Math.sqrt(size))
      ? size
      : this.defaultSize
  }

  private validateDifficulty(difficulty: number): Difficulty {
    return difficulty in Difficulty ? Difficulty.esay : this.defaultDifficulty
  }
  /**
   * 根据字符串还原模板
   */
  private parseTemplate(template: string) {
    if (template) template = `${template}`
    return {
      size: this.defaultSize,
      difficulty: this.difficulty,
      board: [[]],
    }
  }

  private rangeValue(max: number, min = 0) {
    return Math.random() * (max - min) + min
  }

  private rangeRandomPosition() {
    let count =
      this.squares - Math.trunc((this.squares * this.difficulty) / 100)
    const positions = Array.from({ length: this.squares }).map(
      (_, index) => index + 1,
    )
    while (count > 0) {
      const index = this.rangeValue(positions.length - 1)
      positions.splice(index - 1)
      count--
    }
    return new Set(positions)
  }

  private getBlockIndexByRowsAndCols(row: number, col: number) {
    const sl = Math.sqrt(this.size)
    return Math.trunc(row / sl) * sl + Math.trunc(col / sl)
  }
}
