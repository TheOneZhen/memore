import { Difficulty, Sudoku } from './src/sudoku'

const test = new Sudoku(9, Difficulty.esay, false)
test.printBoard()

// 开始新的游戏，提供默认参数，获取新的棋盘
// 继续旧的游戏，提供字符串模板，解析模板，补充原有数据

// 如果用户开启校验，那么会对内部属性进行校验并校正，棋盘的校验会将错误的单元修改为-1
