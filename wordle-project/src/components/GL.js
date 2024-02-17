import React from 'react';
import { StyleLabels } from "../assets/StyleLabels";
import { useSelector } from "react-redux";

function GL (props) {

    //Updated seleectors to access nested state under 'game'
    const game = useSelector(state => state.game);
    const { cTry, guesses, answer } = game;

    const currentGuess = guesses[props.gi];
    let style;

    let indicesAnswer = [];
    answer.forEach((char, index) => {
        if (char === props.vl) {
            indicesAnswer.push(index);
        }
    });

    if (cTry !== 0 && props.gi < cTry) {
        const isLetterInAnswer = answer.includes(props.vl);
        const letterOccurrencesInGuess = currentGuess.filter(letter => letter === props.vl).length;
        const letterOccurancesInAnswer = answer.filter(letter => letter ===props.vl).length;
        const isCorrectPosition = indicesAnswer.includes(props.idx);
        const isLetterCorrect = currentGuess[props.idx] === props.vl;

        //Determine the stle based on the letter's correctness
        if (isLetterInAnswer) {
            if (isCorrectPosition && isLetterCorrect) {
            style = StyleLabels.good;
            } else if (!isCorrectPosition && letterOccurrencesInGuess <= letterOccurancesInAnswer && isLetterCorrect) {
                style = StyleLabels.okay;
            } else {
                style = StyleLabels.bad;
            }
        } else {
            style = StyleLabels.bad;
        }
}

let flipped = cTry !== 0 && props.gi < cTry ? "flipped" : "";

return (
    <div className={`gl ${flipped}`}>
        <div className={`flipper d${props.idx}`}>
            <div className="front">{props.vl}</div>
            <div className="back" style={style}>{props.vl}</div>
        </div>
    </div>
    );
}

export default GL;

