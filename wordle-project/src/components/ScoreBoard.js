import React, { useState, useEffect } from 'react';
import { score_load } from "../redux/reducers/localStorage";
import ScoreBar from "./ScoreBar";

function ScoreBoard() {
    const [scores, setScores] = useState([]);
    const [totS, setTotS] = useState(0);

    //Access any current scores 
    useEffect(() => {
        let newScores = score_load();
        let scoreList = [];
        for (let i in newScores) {
            scoreList.push([i, newScores[i]]);
        }
        setScores(scoreList);
    }, []);

    //Total tries
    useEffect(() => {
        
        let totalTries = scores.reduce((acc, score) => acc + score[1], 0);
        setTotS(totalTries);
    }, [scores]);

    let tryCalc = scores.map((tries, i) => 
        <ScoreBar key={i} score={`Try ${tries[0]}`} fill={tries[1]/ totS}/>
    );

    return (
        <div className="scores">
            {tryCalc}
        </div>
    );
}

export default ScoreBoard;