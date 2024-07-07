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
type BoardType = Array<Array<number>>

/**
 * 每次实例，都是一局新的游戏
 */
export class Sudoku {
  protected defaultDifficulty = Difficulty.medium // 默认难度
  protected defaultSize = 9 // 默认棋盘大小
  protected gapChar = ' ' // 棋盘矩阵打印时的间隔符号
  size: number = this.defaultSize // 棋盘边长
  difficulty: Difficulty = this.defaultDifficulty // 难度
  board: BoardType = [[]] // 棋盘矩阵，0代表没有填充元素
  protected answer: BoardType = [[]] // 答案矩阵，-1代表board中的填充错误
  // 格子数量
  get squares() {
    return this.size * this.size
  }
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
  /**
   * 是否进行校验
   * @param validate
   */
  constructor(size: number, difficulty: Difficulty, validate: boolean)
  constructor(
    templateOrSize: number | string,
    difficulty: number = 0,
    validate = true,
  ) {
    if (typeof templateOrSize === 'string') {
      const result = this.parseTemplate(templateOrSize)
      templateOrSize = result.size
      difficulty = result.difficulty
      this.board = result.board
    }
    this.size = templateOrSize
    this.difficulty = difficulty
    this.generate()
    validate && this.validate()
  }

  generate() {
    const rowRecord = this.generateRecord()
    const colRecord = this.generateRecord()
    const blockRecord = this.generateRecord()
    const positions = this.rangeRandomPosition()

    this.board = Array.from({ length: this.size }).map(() =>
      Array.from<number>({ length: this.size }).fill(0),
    )
    /**
     * 当数字插入失败的时候，进行进行回溯
     * @param row 行索引
     * @param col 列索引
     * @returns 需要回溯的次数，当第一列数字插入失败的时候，此时是由于列元素和块元素重复导致的，所以最优选择是回到上一列
     */
    const backTrack = (row: number, col: number): number => {
      if (row === this.size) return 0

      const rowSet = rowRecord[row]
      const colSet = colRecord[col]
      const blockSet = blockRecord[this.getBlockIndexByRowsAndCols(row, col)]
      // 获取可以插入的数字
      const candidates = this.getCandidates(rowSet, colSet, blockSet)
      const position = row * this.size + col
      const cancelInsert = (val: number) => {
        rowSet.delete(val)
        colSet.delete(val)
        blockSet.delete(val)
      }
      const insert = (val: number) => {
        rowSet.add(val)
        colSet.add(val)
        blockSet.add(val)
        if (positions.has(position)) this.board[row][col] = val
        this.answer[row][col] = val
      }

      while (true) {
        // 如果是第一列的数字，且没有可插入数字，需要回溯到上一行的第一列
        if (candidates.length === 0) return col === 1 ? this.size : 1

        const index = this.rangeValue(candidates.length - 1)
        const value = candidates[index]

        insert(value)

        const next =
          col === this.size - 1
            ? backTrack(row + 1, 0)
            : backTrack(row, col + 1)

        if (next === 0) break
        cancelInsert(value)
        candidates.splice(index, 1)
        if (next > 1) return next - 1
      }

      return 0
    }

    backTrack(0, 0)
  }

  /**
   * 根据记录获取候选数字
   * @param records 已经被选取数字的记录
   * @returns Array
   */
  getCandidates(...records: RecordType[]): Array<number> {
    const all: RecordType = new Set()

    for (const record of records) for (const num of record) all.add(num)
    return Array.from({ length: this.size })
      .map((_, index) => index + 1)
      .filter((num) => !all.has(num))
  }
  /**
   * 参数校验，校验应该是一种模式，此模式能够提供稳定的游戏。
   * 执行参数校验后会直接修改现有属性。
   */
  validate() {
    this.validateSize()
    this.validateDifficulty()
    this.validateBoard()
    this.validateAnswer()
  }

  protected validateSize() {
    const size = this.size
    this.size =
      Number.isInteger(size) && size > 1 && Number.isInteger(Math.sqrt(size))
        ? size
        : this.defaultSize
  }

  protected validateDifficulty() {
    this.difficulty =
      this.difficulty in Difficulty ? this.difficulty : this.defaultDifficulty
  }
  /**
   * 校验棋盘尺寸是否符合
   */
  protected validateBoard() {
    const reset = () => {
      this.board = Array.from({ length: this.size }).map(() =>
        Array.from<number>({ length: this.size }).fill(0),
      )
    }

    if (!Array.isArray(this.board) || this.board.length !== this.size) reset()
    else {
      for (const rows of this.board) {
        if (!Array.isArray(rows) || rows.length !== this.size) {
          reset()
          break
        }
        for (let i = 0; i < this.size; ++i) {
          if (typeof rows[i] !== 'number') {
            rows[i] = Number.isNaN(+rows[i]) ? 0 : +rows[i]
          }
        }
      }
    }
  }
  /**
   * 校验答案，首先会对已经填充的内容进行校验，如果用户填入的内容存在错误，对应单元格填充-1。如果不存在错误，补全答案。
   */
  protected validateAnswer() {}
  protected validateCell() {}
  /**
   * 根据字符串还原模板
   * .e.g
   * ======
   * esay:4
   * 1 2 3 4
   * 3 4 0 0
   * 2 1 0 0
   * 4 3 0 0
   * ======
   */
  protected parseTemplate(template: string) {
    const rows = template.split('\n')

    if (rows.length === 0) return false
    if (/[a-z]+:\d+/.test(rows[0])) {
    }
    return {
      size: this.defaultSize,
      difficulty: this.difficulty,
      board: [[]],
    }
  }

  protected generateRecord(): RecordType[] {
    return Array.from({ length: this.size }).map(() => new Set())
  }

  protected rangeValue(max: number, min = 0) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  /**
   * 生成随机数字代表后续填充数字的位置
   */
  protected rangeRandomPosition() {
    let count =
      this.squares - Math.trunc((this.squares * this.difficulty) / 100)
    const positions = Array.from({ length: this.squares }).map(
      (_, index) => index,
    )
    while (count > 0) {
      const index = this.rangeValue(positions.length - 1)
      positions.splice(index, 1)
      count--
    }
    return new Set(positions)
  }

  protected getBlockIndexByRowsAndCols(row: number, col: number) {
    const sl = Math.sqrt(this.size)
    return Math.trunc(row / sl) * sl + Math.trunc(col / sl)
  }

  printBoard() {
    let content = `${Difficulty[this.difficulty]}:${this.size}\n`
    const maxNumberLen = `${this.squares}`.length

    for (const row of this.board) {
      for (const col of row)
        content += `${col}${this.gapChar}`.padStart(maxNumberLen, this.gapChar)
      content += '\n'
    }
    console.log(content)
    return content
  }
}
