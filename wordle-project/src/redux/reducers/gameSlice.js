import { createSlice, createSelector } from "@reduxjs/toolkit";
import { save, score_load, score_save } from "./localStorage";
import checkWord from "./wordChecker";
import { generate } from "random-words";

const generateRandomWord = () => {
    let theWord = generate({ exactly: 1, minLength: 5, maxLength: 5 });
    while (theWord[0].split('').length !== 5) {
        theWord = generate({ exactly: 1, minLength: 5, maxLength: 5});
    }
    return theWord[0];
};

export const initialState = () => {
    const answer = generateRandomWord().split("");
    const guesses = Array(6).fill(null).map(() => Array(5).fill(""));
    return {
        try: 0,
        guesses,
        answer,
        guessed: "",
        change: false,
        end: false,
        win: false,
        warn: false,
        press: false,
        help: true
    };
};

const gameSlice = createSlice({
    name: 'game',
    initialState: initialState(),
    reducers: {
        resetGame(state){
            Object.assign(state, initialState());
            state.help = false;
            save(state);
        },
        toggleHelp(state) {
            state.help = !state.help;
            save(state);
        },
        newGame(state) {
            const newState = initialState();
                    Object.assign(state, { ...newState, help: false}); //reset the game state
                    save(state);
        },
        submitGuess(state, action) {
            let newTry = state.try + 1;
            let win = state.win;
            let end = state.end;
            let addLetters = state.guessed;
            let currentScores = score_load();

            //Checks that current guess does not contain empty slots, the game hasn't ended, and it is a valid word
            if (state.guesses[state.try].indexOf('') === - 1 && !state.end && checkWord(state.guesses[state.try].join(''))) {
                addLetters += state.guesses[state.try].join('');

                //Win Condition Check
                if (state.guesses[state.try].join('') === state.answer.join('')) {
                    win = true;
                    end = true;
                    currentScores[state.try + 1] = (currentScores[state.try + 1] || 0) + 1;
                    score_save(currentScores);
                }
                //End game on final attempt
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
        },
        inputLetter(state, action) {
            const activeGuess = state.guesses[state.try];
            const letterIndex = activeGuess.indexOf('');
    
                if (!state.end && activeGuess.includes("") && letterIndex < state.answer.length) {
                    activeGuess[letterIndex] = action.payload; //action.payload should contain the letter to input
                 } else {
                    state.warn = true;
                }
                state.guesses[state.try] = activeGuess;
                state.change = !state.change;
            save(state);
        },
        clearWarning(state) {
            state.warn = false; //clear warning flag
            save(state);
        },
        deleteLetter(state) {
            if (!state.end) {
                const activeGuess = [...state.guesses[state.try]];

                //interaing backwards to find the last non-empty index
                let nonEmptyIdx = -1;
                for (let i = activeGuess.length - 1; i >= 0; i--) {
                    if (activeGuess[i] !== "") {
                        nonEmptyIdx = i;
                        break;
                    }
                };

                //if a non-empty index is found, set it to empty
                if (nonEmptyIdx !== -1) {
                    activeGuess[nonEmptyIdx] = "";
                    state.guesses[state.try] = activeGuess;
                    state.change = !state.change;
                }
                save(state);
            }
        },
    }
});

export const selectGameStatus = state => state.game;

export const selectGameDetails = createSelector(
    [selectGameStatus],
    (game) => ({
        warning: game.warn,
        try_cur: game.try,
        press: game.press,
        answer: game.answer,
        guesses: game.guesses
    })
);

export const {
  resetGame,
  toggleHelp,
  newGame,
  submitGuess,
  inputLetter,
  clearWarning,
  deleteLetter
} = gameSlice.actions

export default gameSlice.reducer;


