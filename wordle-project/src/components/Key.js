import { useSelector, useDispatch } from "react-redux";
import { inputLetter } from "../redux/reducers/gameSlice";
import { StyleLabels } from "../assets/StyleLabels";

function Key(props) {
    //Assiging the nested state under 'game'
    const {guesses, answer, try: cTry, guessed } = useSelector(state => state.game);

    const dispatch = useDispatch();

    let style;
    let stop = false;

    if (guessed.includes(props.vl)) {
        if (answer.join('').includes(props.vl)) {
            for (let i = 0; i < cTry; i++) {
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