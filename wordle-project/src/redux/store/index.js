import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../reducers/gameSlice";
import { load, score_save } from "../reducers/localStorage";

//Attempt to load the existing game state from local storage, otherwise go to initial state
const preloadedState = localStorage.getItem('game-state') ? load() : undefined; // use undefined to let the slice define the inital state

//Initialize scores if not present
if(!localStorage.getItem('game-state')) {
    score_save({1:0, 2:0, 3:0, 4:0, 5:0, 6:0, lose:0})
}

export default configureStore({
    reducer: {
        game: gameReducer,
    },
        preloadedState,
});