import { configureStore } from "@reduxjs/toolkit";
import gameReducer, { initialState } from "../reducers/gameSlice";
import { load, score_save, score_load } from "../reducers/localStorage";

//Attempt to load the existing game state from local storage, otherwise go to initial state
const loadedState = load();

const preloadedState = loadedState ? { game: loadedState } : { game: initialState() };
//     if (localStorage.getItem('game-state')) {
//         preloadedState = {
//             game: loadedState
//         };
//     }

    //Initialize scores if not present
    const loadedScores = score_load();
    if (!loadedScores || Object.keys(loadedScores).length === 0) {
        score_save({1:0, 2:0, 3:0, 4:0, 5:0, 6:0, lose:0})
    }
    // if (!localStorage.getItem('score')) {
    //     score_save({1:0, 2:0, 3:0, 4:0, 5:0, 6:0, lose:0})
    // }

    const store = configureStore({
        reducer: {
            game: gameReducer,
        },
            preloadedState,
});

export { store };