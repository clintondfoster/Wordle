import { useSelector } from 'react-redux';
import Guess from "./Guess";
import React, { useState, useEffect } from 'react';

function Guesses () {
    //Accessing the nested 'game' slice state
    const { guesses, change } = useSelector((state) => state.game);

    const [gs, setGs] = useState(guesses);

    //Updating local state when the redux state changes
    useEffect(() => {
        setGs(guesses);
    }, [change, guesses]);

    //Mapping over the guesses to create Guess componenets 
    const gEles = gs.map((g, i) => <Guess key={i} vl={g} idx={i}/>);

    return <div className={'guesses'}>{gEles}</div>;
    }
    
    export default Guesses;
