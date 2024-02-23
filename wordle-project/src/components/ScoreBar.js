import React from 'react';
import { useSelector } from 'react-redux';


function ScoreBar() {

    const game = useSelector(state => state.game);
    const { try: currentTry, win, end } = game;

    const fill = currentTry / 6;
    const scoreText = win ? "You won!" : (end ? "Game Over" : `Tries: ${currentTry}/6`);

    return (
        <div className="score">
            <h3>{scoreText}</h3>
            <div className="bar">
                <div className="fill" style={{width: `${fill * 100}%`}}></div>
            </div>
        </div>
    )
}

export default ScoreBar;