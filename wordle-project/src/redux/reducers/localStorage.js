import { initialState } from "./gameSlice";

//retrives game state from local storage, allows players to continue from where they left off
export const load = function () {
    try {
        const gameState = localStorage.getItem('game-state');
        if (gameState === null || gameState === "undefined") {
            return initialState();
        }
        return JSON.parse(gameState);
    } catch (e) {
        console.error("Error loading game state:", e);
        return initialState();
    }
}

//saves the current game state to local storage
export const save = function(obj) {
    localStorage.setItem('gameState', JSON.stringify(obj));
};

//retrieves the game's score data
export const score_load = function(){
    try {
        const score = localStorage.getItem('score');
        if (score === null || score === "undefined") {
            return {};
        }
        return JSON.parse(score);
    } catch (e)  {
        console.error("error loading scores", e)
        return {};
    }
}

//saves the current scores
export const score_save = function(obj){
    localStorage.setItem('score', JSON.stringify(obj));
}