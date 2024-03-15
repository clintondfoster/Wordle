import React from 'react';
import { StyleLabels } from "../assets/StyleLabels";
import { useSelector } from "react-redux";
import "../less/index.less";

function GL (props) {

    //Access current game from game slice
    const game = useSelector(state => state.game);
    const { try_cur, guesses, answer } = game;

    console.log("answer from GL", answer)
    console.log("try_cur from GL", try_cur)
    console.log("guesses from GL", guesses)

    //Check current guess 
    const currentGuess = guesses[props.gi];
    let style;

    let indicesAnswer = [];
    answer.forEach((char, idx) => {
        if (char === props.vl) {
            indicesAnswer.push(idx);
        }
    });
    console.log("indicesAnswer from GL", indicesAnswer)


    //Style logic for submitted guessess
    if (try_cur !== 0 && props.gi < try_cur) {
        if (answer.join("").includes(currentGuess[props.idx])) {
            if (currentGuess.filter((x) => x === props.vl).length > 1) {
                if (indicesAnswer.includes(props.idx)) {
                    style = StyleLabels.good;
                } else if (currentGuess.indexOf(props.idx) === props.idx && answer.indexOf(props.vl) !== currentGuess.indexOf(props.vl)) {
                    style = StyleLabels.okay;
                } else {
                    style = StyleLabels.bad;
                }
            }
        } 
    }

// console.log("style", style)
//Determines to flip the letter tile
let flipped = try_cur !== 0 && props.gi < try_cur ? "flipped" : "";


return (
    <div className={"gl " + flipped}>
        <div className={"flipper d" + props.idx}>
            <div className="front" style={style}>{props.vl}</div>
            <div className="back" style={style}>{props.vl}</div>
        </div>
    </div>
    )
}

export default GL;

