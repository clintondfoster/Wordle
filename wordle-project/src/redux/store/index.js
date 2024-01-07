import { configureStore } from "reduxjs/toolkit";
import gameSlice from "../reducers/gameSlice";
import initState from "./initState";
import { load, score_save } from "..reducers/localStorage";

const preloadedState = localStorage.getItem('game-state') ? load() : initState();

//Initialize scores if not present
if(!preloadedState) {
    score_save({1:0, 2:0, 3:0, 4:0, 5:0, 6:0, lose:0})
}

export default configureStore({
    reducer: {
        game: gameSlice,
        preloadedState,
    }
});