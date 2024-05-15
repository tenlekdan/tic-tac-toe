import Player from './components/Players.jsx'
import { useState } from 'react'
import Log from './components/Log.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameBoard from './components/GameBoard.jsx';
import GameOver from './components/GameOver.jsx';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIALGAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length && gameTurns[0].player === 'X')
    currentPlayer = 'O';
  return currentPlayer;
}

function deriveWinner(gameBoard, playerNames) {
  let winner;
  for (let combination of WINNING_COMBINATIONS) {
    const firstSqSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSqSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSqSymbol = gameBoard[combination[2].row][combination[2].column];
    if (firstSqSymbol && firstSqSymbol === secondSqSymbol && firstSqSymbol === thirdSqSymbol) {
      winner = playerNames[firstSqSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIALGAMEBOARD.map((d) => [...d])];
  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  let currentPlayer = derivedActivePlayer(gameTurns);
  const [playerNames, setPlayerNames] = useState(PLAYERS);
  let gameBoard = deriveGameBoard(gameTurns);
  let winner = deriveWinner(gameBoard, playerNames);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSqure(rowIndex, colIndex) {
    setGameTurns((prevTurns => {
      let activePlayer = derivedActivePlayer(prevTurns);
      const newTurns = [{ square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurns];
      return newTurns;
    }))
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, name) {
    setPlayerNames((prev) => {
      return {
        ...prev,
        [symbol]: name
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player intialName={PLAYERS.X} symbol="X" isActive={currentPlayer === 'X'} onPlayerNameChange={handlePlayerNameChange}></Player>
          <Player intialName={PLAYERS.O} symbol="O" isActive={currentPlayer === 'O'} onPlayerNameChange={handlePlayerNameChange}></Player>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch}></GameOver>}
        <GameBoard onSelectSquare={handleSelectSqure} activePlayer={currentPlayer}
          board={gameBoard}></GameBoard>
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}
export default App
