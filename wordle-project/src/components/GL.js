import React from 'react';
import { StyleLabels } from "../assets/StyleLabels";
import { useSelector } from "react-redux";
import "../less/index.less";

function GL (props) {

    //Access current game from game slice
    const game = useSelector(state => state.game);
    const { try_cur, guesses, answer } = game;

    //Check current guess 
    const currentGuess = guesses[props.gi];
    let style;

    //Stores indices of the current letter in the answer, (identifies where the letter occurs)
    let indicesAnswer = [];
   
    answer.forEach((char, idx) => {
        if (char === props.vl) {
            indicesAnswer.push(idx);
        }
    });

    if (try_cur !== 0 && props.gi < try_cur) {
        const isLetterInAnswer = answer.includes(props.vl);
        const letterOccurrencesInGuess = currentGuess.filter(letter => letter === props.vl).length;
        const letterOccurancesInAnswer = answer.filter(letter => letter === props.vl).length;
        const isCorrectPosition = indicesAnswer.includes(props.idx);
        const isLetterCorrect = currentGuess[props.idx] === props.vl;

        //Determine the style based on the letter's correctness
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

//Determines to flip the letter tile
let flipped = try_cur !== 0 && props.gi < try_cur ? "flipped" : "";

// return (
//     <div className={`gl ${flipped}`}>
//         <div className={`flipper d${props.idx}`}>
//             <div className="front">{props.vl}</div>
//             <div className="back" style={style}>{props.vl}</div>
//         </div>
//     </div>
//     );
// }
return (
    <div className={"gl " + flipped} >
        <div className={"flipper d" + props.idx}>
            <div className="front">{props.vl}</div>
            <div className="back" style={style}>{props.vl}</div>
        </div>
    </div>
    )
}


export default GL;

