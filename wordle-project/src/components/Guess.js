import GL from "./GL";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGameDetails, clearWarning } from "../redux/reducers/gameSlice";
import "../less/index.less";
import Popup from "./Popup";

function Guess (props) {

    //Mapping each letter in the guess to the GL component
    let gl_eles = props.vl.map((l, i) => <GL key={i} vl={l} idx={i} gi={props.idx}/>);

    //Check if player has any saved game details
    const dispatch = useDispatch();
    const { warning, try_cur, press } = useSelector(selectGameDetails);
    const [wn, setWN] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    //Manage the warning state and animation timing
    useEffect(() => {
        if (try_cur === props.idx) {
            if (warning) {
                setShowPopup(true);
                setWN("warning");
                setTimeout(() => {
                    setShowPopup(false);
                    setWN("dull")
                    dispatch(clearWarning());
                }, 1000);
            } else {
                setWN("dull");
            }
        }
    }, [press, warning, try_cur, props.idx, dispatch]);

    return (
        <div className={"guess " + wn}>
            {showPopup && <Popup message="Not in word list" />}
            {gl_eles}
        </div>
    )
};

    export default Guess;