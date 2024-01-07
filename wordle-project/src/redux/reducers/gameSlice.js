import { createSlice } from "@reduxjs/toolkit";
import initState from "../store/initState";
import { save, score_load, score_save } from "../reducers/LocalStorage";
import { clearWarning, deleteLetter, inputLetter, newGame, submitGuess, toggleHelp } from "../actions";
import C_W from "./WordChecker";


const gameSlice = createSlice({
    name: 'game',
    initialState: initState(),
    reducers: {
        resetGame(state){
            Object.assign(state, initState());
            save(state);
        },
    },
        extraReducers: (builder) => {
            builder
                .addCase(toggleHelp, (state) => {
                    state.help = !state.help; //toggle help state
                    save(state); 
                })
                .addCase(newGame, (state) => {
                    const newState = initState();
                    Object.assign(state, { ...newState, help: false}); //reset the game state
                    save(state);
                })
                .addCase(submitGuess, (state, action) => {
                    let newTry = state.try + 1;
                    let win = state.win;
                    let end = state.end;
                    let addLetters = state.guessed;
                    let currentScores = score_load();

                    if (state.guesses[state.try].indexOf('') === -1 && !state.end && C_W(state.guesses[state.try].join(''))) {
                        addLetters += state.guesses[state.try].join('');
                        if (state.guesses[state.try].join('') === state.answer.join('')) {
                            win = true;
                            end = true;
                            currentScores[state.try + 1] = (currentScores[state.try + 1] || 0) + 1;
                            score_save(currentScores);
                        }
    
                        if (newTry === 6) {
                            end = true;
                            if (!win) {
                                currentScores.lose = (currentScores.lose || 0) + 1;
                                score_save(currentScores);
                            }
                        }
    
                        state.try = newTry;
                        state.win = win;
                        state.end = end;
                        state.guessed = addLetters;
                        state.warn = false;
                    } else {
                        state.warn = true;
                    }
                    state.change = !state.change;
                    save(state);
                })
                .addCase(inputLetter, (state, action) => {
                    const activeGuess = state.guesses[state.try];
                    const letterIndex = activeGuess.indexOf('');
                    let warn = false;
        
                    if(!state.end && activeGuess.includes("") && letterIndex < state.answer.length) {
                        activeGuess[letterIndex] = action.payload; //action.payload should contain the letter to input
                     } else {
                        warn = true;
                        }
        
                    state.guesses[state.try] = activeGuess;
                    state.change = !state.change;
                    save(state);
                })
                .addCase (clearWarning, (state) => {
                    state.warn = false; //clear warning flag
                save(state);
                })
                .addCase (deleteLetter, (state) => {
                    if (!state.end) {
                        const activeGuess = state.guesses[state.try];
                        let indexToRemove = activeGuess.lastIndexOf('');
                        indexToRemove = indexToRemove !== -1 ? indexToRemove -1 : activeGuess.length - 1;
    
                        if (indexToRemove >= 0) {
                            activeGuess[indexToRemove] = ''; //delete the last non empty letter
                        }
    
                        state.guesses[state.try] = activeGuess;
                        state.change = !state.change;
                        save(state);
                    }
                })
            }
        })

                

   

export const {
  resetGame
} = gameSlice.actions

export default gameSlice.reducer;