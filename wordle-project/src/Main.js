import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetGame, submitGuess, inputLetter, deleteLetter, selectGameDetails } from "./redux/reducers/gameSlice";
import Guesses from "./components/Guesses";
import Keys from "./components/Keys";
import ScoreBoard from "./components/ScoreBoard";

const enterKeys = ['Enter'];
const backKeys = ['Backspace'];

const useEventListener = (eventName, handler, element = window) => {
    const savedHandler = React.useRef();

    React.useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    React.useEffect(() => {
        const eventListener = (event) => savedHandler.current(event);
        element.addEventListener(eventName, eventListener);
        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
};

function Main() {
    const dispatch = useDispatch();
    const { win, end, answer } = useSelector((state) => state.game);
    const { try_cur } = useSelector(selectGameDetails);
    const [showMessage, setShowMessage] = useState(false)

    const handler = ({ key }) => {
        if ('abcdefghijklmnopqrstuvwxyz'.split('').includes(key.toLowerCase())) {
            dispatch(inputLetter(key));
        } else if (enterKeys.includes(key)) {
            dispatch(submitGuess());
        } else if (backKeys.includes(key)) {
            dispatch(deleteLetter());
        }
    };

    useEventListener("keydown", handler);

    useEffect(() => {
        if (end) {
            setTimeout(() => setShowMessage(true), 3000);
        }
    }, [end]);

    let color = win ? "green" : "red";

    const createNewGame = () => {
        setShowMessage(false);
        dispatch(resetGame());
    };

    return (
        <div className="contain">
            <h1>New Wordle</h1>
            <Guesses />
            <Keys />
            {showMessage && <div className="message">
                    <div className="tab" style={{ backgroundColor: color }}>
                        {win && <h1>You Win!!</h1>}
                        {win && <h2>You won in {try_cur} tries!</h2>}
                        {end && !win ? <h1>Better luck next time. </h1> : ""}
                        {end && !win ? <h2>The Answer was {answer.join('')}.</h2> : ""}
                        <ScoreBoard />
                        <h2 onClick={createNewGame}>Play Again?</h2>
                    </div>
                </div>}
        </div>
    );
}

export default Main;