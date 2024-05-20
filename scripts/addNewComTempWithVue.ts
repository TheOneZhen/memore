interface TokenType {
  indentSize: number
  name: string
}

interface ASTNode extends TokenType {
  type: 'file' | 'directory'
  children: Array<ASTNode>
}

function generateTokens(str: string, indentSign: string, rows: string[]) {
  const result: Array<TokenType> = []

  function splitIndent(row: typeof str) {
    let index = 0
    while (row.charAt(index) === indentSign) index++
    return {
      indentSize: index,
      name: row.slice(index),
    }
  }

  for (const row of rows) {
    const token = splitIndent(row)
    // 会舍弃空的name
    if (token.name !== '') result.push(token)
  }

  return result
}

function adjustTypeByName(name: string) {
  const pointIndex = name.indexOf('.')
  if (pointIndex === -1 || pointIndex >= name.length - 1) return 'directory'
  return 'file'
}

function createTemplateByString(str, indentSign = ' ', target = '.') {
  const rows = str.split('\n')

  const tokens = generateTokens(str, indentSign, rows)
  console.log(tokens)
  const nodes: Array<ASTNode> = []
  const stack: typeof nodes = []

  for (const token of tokens) {
    const top = stack.pop()
    const node: ASTNode = {
      ...token,
      type: adjustTypeByName(token.name),
      children: [],
    }
    if (top === undefined) {
      nodes.push(node)
      stack.push(node)
    } else {
      if (top.indentSize === node.indentSize) {
        top = 
      }
    }
  }
}

const structure = `
  folder1
    file1.js
    file2.js
    README.md
  folder2
    file3.js
    file4.js
    README.md
    folder3
      file4.js
      README.md
  package.json
  `

createTemplateByString(structure, 'a')
