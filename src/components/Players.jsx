import { useState } from "react";
export default function Player({ intialName, symbol }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(intialName);
    let btnCaption = 'Edit'
    function handleEditClick() {
        setIsEditing(editing => !editing);
    }
    function handleChange(event) {
        console.log(event);
        setPlayerName(event.target.value);
    }
    let player = <span className="player-name">{playerName}</span>;
    if(isEditing) {
        player = <input placeholder="player name" required value={playerName} onChange={handleChange}/>
        btnCaption = 'Save';
    }
    return (
        <li>
            <span className="player">
                {player}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => {handleEditClick()}}>{btnCaption}</button>
        </li>
    )
} 