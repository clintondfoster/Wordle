import { initialState } from "./gameSlice";

//retrives game state from local storage, allows players to continue from where they left off
export const load = function () {
    try {
        const gameState = localStorage.getItem('game-state');
        return gameState ? JSON.parse(gameState) : initialState();
    } catch (e) {
        console.error("Error loading game state:", e);
        return initialState();
    }
}


//saves the current game state to local storage
export const save = function(obj) {
    localStorage["game-state"] = JSON.stringify(obj);
};

//retrievees the game's score data
export const score_load = function(){
    return JSON.parse(localStorage["score"]);
}

//saves the current scores
export const score_save = function(obj){
    localStorage["score"] = JSON.stringify(obj);
}