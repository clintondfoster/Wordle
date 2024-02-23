import {Words} from '../../assets/Words';

let WordsSet;

export default function C_W (word) {
    console.log('C_W called with:', word);

    //initialize WordsSet on the first call to C_W
    if (!WordsSet) {
        WordsSet = new Set(Words.map(word => word.toLowerCase()));
    }
    if (word === null) {
        return false;
    }

    return WordsSet.has(word.toLowerCase());
}

