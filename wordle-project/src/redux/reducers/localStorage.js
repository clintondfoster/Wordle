export const load = function (){
    return JSON.parse(localStorage["game-state"]);
};

export const save = function(obj) {
    localStorage["game-state"] = JSON.stringify(obj);
};

export const score_load = function(){
    return JSON.parse(localStorage["score"]);
}

export const score_save = function(obj){
    localStorage["score"] = JSON.stringify(obj);
}