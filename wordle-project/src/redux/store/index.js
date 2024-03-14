import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../reducers/gameSlice";
import { load, score_save } from "../reducers/localStorage";

//Attempt to load the existing game state from local storage, otherwise go to initial state
let preloadedState;
const loadedState = load();
    if (localStorage.getItem('game-state')) {
        preloadedState = {
            game: loadedState
        };
    }

    //Initialize scores if not present
    if (!localStorage.getItem('game-state')) {
        score_save({1:0, 2:0, 3:0, 4:0, 5:0, 6:0, lose:0})
    }

    const store = configureStore({
        reducer: {
            game: gameReducer,
        },
            preloadedState,
});

export { store }