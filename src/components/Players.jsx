import { useState } from "react";
export default function Player({ intialName, symbol, isActive, onPlayerNameChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(intialName);
    let btnCaption = 'Edit'
    function handleEditClick() {
        setIsEditing(editing => !editing);
        isEditing && onPlayerNameChange(symbol, playerName)
    }
    function handleChange(event) {
        setPlayerName(event.target.value);
    }
    let player = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        player = <input placeholder="player name" required value={playerName} onChange={handleChange} />
        btnCaption = 'Save';
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {player}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => { handleEditClick() }}>{btnCaption}</button>
        </li>
    )
} 