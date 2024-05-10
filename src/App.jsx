import Player from './components/Players.jsx'
import GameBoard from './components/Gameboard.jsx'
function App() {

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player intialName="Player 1" symbol="X"></Player>
          <Player intialName="Player 2" symbol="O"></Player>
        </ol>
        <GameBoard></GameBoard>
      </div>
      Log
    </main>
  )
}
export default App
