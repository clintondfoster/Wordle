import React, { useState, useEffect } from 'react-redux';
// import { useSelector } from 'react-redux';
import { score_load } from "..redux/reducers/LocalStorage";
import ScoreBar from "./ScoreBar";

function ScoreBoard() {
    const [scores, setScores] = useState([]);
    const [ts, setTS] = useState(0);

    //Load scores from Local storage on component mount
    useEffect(() => {
        let newScores = score_load();
        let scoreList = [];
        for (let i in newScores) {
            scoreList.push([i, newScores[i]]);
        }
        setScores(scoreList);
    }, []);

    //Calculate total tries
    useEffect(() => {
        let totalTries = scores.reduce((acc, score) => acc + score[1], 0);
        setTS(totalTries);
    }, [scores]);

    let eles = scores.map((it, i) => 
    <ScoreBar key={i} score={`Try ${it[0]}`} fill={it[1]/ ts}/>
    );

    return (
        <div className="scores">
            {eles}
        </div>
    );
}

export default ScoreBoard;