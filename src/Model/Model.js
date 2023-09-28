export class Group {
    constructor(i, j) {
        this.i = i
        this.j = j
    }
}

export class Model {

    constructor(configuration) {
        this.numMoves = 0
        this.config = [[]]
        this.selectedGroup = new Group(-1, -1)
        this.hasWon = false
        this.backgroundColor = 'white'
        for (let i = 0; i < configuration.numRows; i++)
        {
            this.config[i] = []
            for (let j = 0; j < configuration.numColumns; j++)
            {
                this.config[i][j] = this.backgroundColor
            }
        }
        configuration.baseSquares.forEach(square => {
            this.config[square.row][square.column] = square.color
        })
    }

    rotateCW() {
        if (!this.canSelect(this.selectedGroup)) return this.config
        this.numMoves++
        let { i, j } = { ...this.selectedGroup }
        i -= 1
        j -= 1
        let temp = this.config[i][j]
        this.config[i][j] = this.config[i + 1][j]
        this.config[i + 1][j] = this.config[i + 1][j + 1]
        this.config[i + 1][j + 1] = this.config[i][j + 1]
        this.config[i][j + 1] = temp
        return this.config
    }

    rotateCCW() {
        if (!this.canSelect(this.selectedGroup)) return this.config
        this.numMoves++
        let { i, j } = { ...this.selectedGroup }
        i -= 1
        j -= 1
        let temp = this.config[i][j]
        this.config[i][j] = this.config[i][j + 1]
        this.config[i][j + 1] = this.config[i + 1][j + 1]
        this.config[i + 1][j + 1] = this.config[i + 1][j]
        this.config[i + 1][j] = temp
        return this.config
    }

    remove(group) {
        let i = group.i - 1
        let j = group.j - 1
        this.config[i][j] = this.backgroundColor
        this.config[i][j + 1] = this.backgroundColor
        this.config[i + 1][j + 1] = this.backgroundColor
        this.config[i + 1][j] = this.backgroundColor
    }

    canRemove(group) {
        let i = group.i - 1
        let j = group.j - 1
        return this.config[i][j] === this.config[i][j + 1]
            && this.config[i][j] === this.config[i + 1][j + 1]
            && this.config[i][j] === this.config[i + 1][j]
    }

    checkWin() {
        return this.config.every(row => {
            return row.every(cell => {
                return cell === this.backgroundColor
            })
        })
    }

    canSelect(group) {
        let i = group.i - 1
        let j = group.j - 1
        return this.config[i][j] != this.backgroundColor
            || this.config[i][j + 1] != this.backgroundColor
            || this.config[i + 1][j + 1] != this.backgroundColor
            || this.config[i + 1][j] != this.backgroundColor
    }

    selectGroup(group) {
        if (this.canSelect(group))
        {
            if (this.canRemove(group))
            {
                this.remove(group)
                this.hasWon = this.checkWin()
            }
            this.selectedGroup = group
        }
        // this.config[i - 1][j - 1] = 'black'
        return this.config
    }

}