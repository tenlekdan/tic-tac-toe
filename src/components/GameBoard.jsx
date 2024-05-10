import { useState } from "react"

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            prevGameBoard[rowIndex][colIndex] = "X"
        });
    }
    return (
        <ol id="game-board">
            {initialGameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((col, colIndex) => 
                    <li key={colIndex}>
                        <button>{col}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    )
}