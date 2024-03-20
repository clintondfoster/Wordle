import React from 'react';
import { StyleLabels } from "../assets/StyleLabels";
import { useSelector } from "react-redux";
import "../less/index.less";
import { selectGameDetails } from '../redux/reducers/gameSlice';

function GL (props) {

    // const game = useSelector(state => state.game);
    // const { try_cur, guesses, answer } = game;

    const { try_cur, answer } = useSelector(selectGameDetails);
    console.log("answer from GL", answer)
    // console.log("try_cur from GL", try_cur)
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
        const letterInAnswer = answer.includes(props.vl);
        const letterInCorrectPosition = answer[props.idx] === props.vl;
    
        if (letterInCorrectPosition) {
            style = StyleLabels.good;
        } else if (letterInAnswer && !letterInCorrectPosition) {
            style = StyleLabels.okay;
        } else {
            style = StyleLabels.bad;
        }
    }


//Animation flip for current guess
let flipped = try_cur !== 0 && props.gi < try_cur ? "flipped" : "";


return (
    <div className={"gl " + flipped}>
        <div className={"flipper d" + props.idx}>
            <div className="front" >{props.vl}</div>
            <div className="back" style={style}>{props.vl}</div>
        </div>
    </div>
    )
}

export default GL;

