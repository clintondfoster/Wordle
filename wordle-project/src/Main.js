import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetGame, submitGuess, inputLetter, deleteLetter } from "./redux/reducers/gameSlice";
import Guesses from "./components/Guesses";
import Keys from "./components/Keys";
import ScoreBoard from "./components/ScoreBoard";

const enterKeys = ['Enter'];
const backKeys = ['Backspace', 8];

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

    let color = win ? "green" : "red";

    const createNewGame = () => {
        dispatch(resetGame());
    };

    return (
        <div className="contain">
            <h1>Endless Wordle</h1>
            <Guesses />
            <Keys />
            {end && (
                <div className="message">
                    <div className="tab" style={{ backgroundColor: color }}>
                        {win && <h1>You Win!!</h1>}
                        {end && !win && <h1>You Lose. The Answer was {answer.join('')}</h1>}
                        <ScoreBoard />
                        <h2 onClick={createNewGame}>Play Again?</h2>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Main;