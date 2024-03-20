import React, { useState, useEffect } from 'react';
import { score_load } from "../redux/reducers/localStorage";
import ScoreBar from "./ScoreBar";
// import { useSelector } from 'react-redux';
// import { selectGameDetails } from '../redux/reducers/gameSlice';

function ScoreBoard() {
    const [scores, setScores] = useState([]);
    const [totalScore, setTotalScore] = useState(0);

    // const { try_cur, win } = useSelector(selectGameDetails);

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
        setTotalScore(totalTries);
    }, [scores]);

    let tryCalc = scores.map((tries, i) => 
        <ScoreBar key={i} score={`Try ${tries[0]}`} fill={tries[1]/ totalScore}/>
    );

    return (
        <div className="scores">
            {tryCalc}
        </div>
    );
}

export default ScoreBoard;