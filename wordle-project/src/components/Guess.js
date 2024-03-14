import GL from "./GL";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectGameDetails } from "../redux/reducers/gameSlice";
import "../less/index.less";

function Guess (props) {

    //Mapping each letter in the guess to the GL component
    let gl_eles = props.vl.map((l, i) => <GL key={i} vl={l} idx={i} gi={props.idx}/>);

    //Check if player has any saved game details
    const { warn, try_cur, press } = useSelector(selectGameDetails);
    const [wn, setWN] = useState("");

    //Manage the warning state and animation timing
    useEffect(() => {
        setWN("dull");
        if (try_cur === props.idx) {
            if (warn && try_cur === props.idx) {
                setWN("warning");
                setTimeout(() => {
                    setWN("dull");
                }, 1000);
            } else {
                setWN("dull");
            }
        }
    }, [press, warn, try_cur, props.idx]);

    return (
        <div className={`guess ${wn}`}>
            {gl_eles}
        </div>
    )
}

    export default Guess;