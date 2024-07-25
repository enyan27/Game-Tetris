/** constant **/
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
    '#7F7FD5',
    '#86A8E7',
    '#91EAE4',
    '#654ea3',
    '#eaafc8',
    '#ff9966',
    '#ff5e62',
    '#fff',
];

const BRICK_LAYOUT = [
    [
        [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
        ],
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
    ],
];

const KEY_CODES = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
}

const WHITE_COLOR_ID = 7;

const canvas = document.querySelector('#board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

/** Board */
class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard();
        this.score = 0;
        this.gameOver = false;
        this.isPlaying = false;
    }

    reset() {
        this.score = 0;
        this.grid = this.generateWhiteBoard();
        this.gameOver = false;
        this.drawBoard();
        this.handleScore(this.score)
    }

    // Khởi tạo bảng (10x20)
    generateWhiteBoard() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(WHITE_COLOR_ID));
    }

    // Vẽ 1 Cell (30x30)
    drawCell(xAxis, yAxis, colorId) { //
        this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
        this.ctx.fillRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillStyle = '#434343';
        this.ctx.strokeRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }

    // Vẽ Cell cho toàn bộ Board (200 Cells)
    drawBoard() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawCell(col, row, this.grid[row][col]);
            }
        }
    }

    handleCompletedRows() {
        const lastestGrid = board.grid.filter((row) => { // row => []
            return row.some(col => col === WHITE_COLOR_ID);
        });

        const newScore = ROWS - lastestGrid.length; // 
        const newRows = Array.from({ length: newScore }, () => Array(COLS).fill(WHITE_COLOR_ID));

        if (newScore) {
            board.grid = [...newRows, ...lastestGrid];
            this.handleScore(newScore * 10);
        }
    }

    handleScore(newScore) {
        this.score += newScore;
        document.querySelector('#score').innerHTML = this.score;
    }

    handleGameOver() {
        this.gameOver = true;
        this.isPlaying = false;
        alert('GAME OVER :<');
    }
}

/** Brick */
class Brick {
    constructor(id) {
        this.id = id;
        this.layout = BRICK_LAYOUT[id]; // Loại gạch
        this.activeIndex = 0;           // Hướng xoay của gạch
        this.colPos = 3;
        this.rowPos = -2;
    }

    draw() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, this.id)
                }
            }
        }
    }

    clear() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID)
                }
            }
        }
    }

    moveLeft() {
        if (!this.checkCollision(this.rowPos, this.colPos - 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPos--;
            this.draw();
        }
    }

    moveRight() {
        if (!this.checkCollision(this.rowPos, this.colPos + 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPos++;
            this.draw();
        }
    }

    moveDown() {
        if (!this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
            this.clear();
            this.rowPos++;
            this.draw();
            return;
        }
        this.handleLanded();

        if (!board.gameOver) {
            generateNewBrick();
        }
    }

    rotate() {
        if (!this.checkCollision(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % 4])) {
            this.clear();
            this.activeIndex = (this.activeIndex + 1) % 4; // 0 >= x >= 3
            this.draw();
        }
    }

    checkCollision(nextRow, nextCol, nextLayout) {
        // if (nextCol < 0) return true;

        for (let row = 0; row < nextLayout.length; row++) {
            for (let col = 0; col < nextLayout[0].length; col++) {
                if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) {
                    if (
                        col + nextCol < 0 ||
                        col + nextCol >= COLS ||
                        row + nextRow >= ROWS ||
                        board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID
                    )
                        return true;
                }
            }
        }

        return false;
    }


    handleLanded() {
        if (this.rowPos <= 0) {
            board.handleGameOver();
            return;
        }

        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.grid[row + this.rowPos][col + this.colPos] = this.id;
                }
            }
        }

        board.handleCompletedRows();
        board.drawBoard();
    }
}

function generateNewBrick() {
    // Tạo ra id từ 0 -> 6
    brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length) 
}

board = new Board(ctx);
board.drawBoard();

document.querySelector('#play').addEventListener('click', () => {
    board.reset();
    board.isPlaying = true;
    
    generateNewBrick();
    const refresh = setInterval(() => {
        if (!board.gameOver) {
            brick.moveDown();
        } else {
            clearInterval(refresh);
        }
    }, 500);
});


document.addEventListener('keydown', (e) => {
    if (!board.gameOver && board.isPlaying) {
        switch (e.code) {
            case KEY_CODES.LEFT:
                brick.moveLeft();
                break;
    
            case KEY_CODES.RIGHT:
                brick.moveRight();
                break;
    
            case KEY_CODES.DOWN:
                brick.moveDown();
                break;
    
            case KEY_CODES.UP:
                brick.rotate();
                break;
    
            default:
                break;
        }
    }
})