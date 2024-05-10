import Player from './components/Players.jsx'
import GameBoard from './components/Gameboard.jsx'
import { useState } from 'react'
import Log from './components/Log.jsx';

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length && gameTurns[0].player === 'X')
    currentPlayer = 'O';
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  let currentPlayer = derivedActivePlayer(gameTurns);
  function handleSelectSqure(rowIndex, colIndex) {
    setGameTurns((prevTurns => {
      let activePlayer = derivedActivePlayer(prevTurns);
      const newTurns = [{ square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurns];
      return newTurns;
    }))
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player intialName="Player 1" symbol="X" isActive={currentPlayer === 'X'}></Player>
          <Player intialName="Player 2" symbol="O" isActive={currentPlayer === 'O'}></Player>
        </ol>
        <GameBoard onSelectSquare={handleSelectSqure} activePlayer={currentPlayer}
          turns={gameTurns}></GameBoard>
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}
export default App
