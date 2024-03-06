import GL from "./GL";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectGameDetails } from "../redux/reducers/gameSlice";

function Guess(props) {

    //Mapping each letter in the guess to the GL component
    let gl_eles = props.vl.map((l, i) => <GL key={i} vl={l} idx={i} gi={props.idx}/>);

    //Selectring specific parts fo the game state related to warnings and attempts 
    const { warning, try_cur, press } = useSelector(selectGameDetails);

    //State for handling the warning animation/class
    const [wn, setWN] = useState("");

    //Effect hook to manage the warning state and animation timing
    useEffect(() => {
        setWN("dull");
        if (try_cur === props.idx) {
            if (warning && try_cur === props.idx) {
                setWN("warning");
                setTimeout(() => {
                    setWN("dull");
                }, 1000);
            } else {
                setWN("dull");
            }
        }
    }, [press, warning, try_cur, props.idx]);

    return (
        <div className={`guess ${wn}`}>
            {gl_eles}
        </div>
    )
    }

    export default Guess;