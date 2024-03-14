import { useSelector, useDispatch } from "react-redux";
import { inputLetter } from "../redux/reducers/gameSlice";
import { StyleLabels } from "../assets/StyleLabels";

function Key (props) {
    //Access current game from game slice
    const {guesses, answer, try: try_cur, guessed } = useSelector(state => state.game);

    const dispatch = useDispatch();

    let style;
    let stop = false;

    //Interate through to determine if the guessed letter is in the answer, to change the key color
    if (guessed.includes(props.vl)) {
        if (answer.join('').includes(props.vl)) {
            for (let i = 0; i < try_cur; i++) {
                if (!stop) {
                    if (guesses[i].lastIndexOf(props.vl) === answer.lastIndexOf(props.vl) || guesses[i].indexOf(props.vl) === answer.indexOf(props.vl)) {
                        style = StyleLabels.good;
                        stop = true;
                    } else {
                        style = StyleLabels.okay;
                    }
                }
            }
        } else {
            style = StyleLabels.bad;
        }
    }
        return (
            <div className={"key " + props.vl} style={style}
                onClick={() => dispatch(inputLetter(props.vl))}>{props.vl.toUpperCase()}</div>
        )
        }
    
        export default Key;