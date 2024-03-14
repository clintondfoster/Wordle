import Key from "./Key";
import { useDispatch } from "react-redux";
import { deleteLetter, submitGuess } from "../redux/reducers/gameSlice";
// import { FontAwesomeIcon } from "@fontawesome/react-fontawesome";
// import { faDeleteLeft } from "@fontawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';


function Keys () {
    const keys = 'qwertyuiopasdfghjklzxcvbnm'.split("");
    const dispatch = useDispatch();

    let keyElements = keys.map((k, idx) => 
    <Key key={idx} vl={k}/>
    );

    return (
        <div className={"keys"}>
            {keyElements}
            <div className="key submit" onClick={() => dispatch(submitGuess())}>Enter</div>
            <div className="key delete" onClick={() => dispatch(deleteLetter())}>
                <FontAwesomeIcon icon={faBackspace}/>
            </div>
        </div>
    );
}

export default Keys;