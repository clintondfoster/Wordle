import React from 'react';
import { StyleLabels } from "../assets/StyleLabels";
import { useSelector } from "react-redux";
import "../less/index.less";
import { selectGameDetails } from '../redux/reducers/gameSlice';

function GL (props) {

    const { try_cur, answer } = useSelector(selectGameDetails);
    let style;

    let indicesAnswer = [];
    answer.forEach((char, idx) => {
        if (char === props.vl) {
            indicesAnswer.push(idx);
        }
    });

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
    };

//Animation CSS for current guess
let flipped = try_cur !== 0 && props.gi < try_cur ? "flipped" : "";

return (
    <div className={"gl " + flipped}>
        <div className={"flipper d" + props.idx}>
            <div className="front">{props.vl}</div>
            <div className="back" style={style}>{props.vl}</div>
        </div>
    </div>
    )
};

export default GL;

