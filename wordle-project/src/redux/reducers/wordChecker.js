import { Words } from '../../assets/Words';

let WordsSet;

export default function C_W (word) {
    console.log('C_W called with:', word);

    //initialize WordsSet on the first call to C_W
    if (!WordsSet) {
        WordsSet = new Set(Words.map(word => {
            if (typeof word === 'string') {
                return word.toLowerCase();
            } else {
                //log a warning if a non-string element is found
                console.warn("Non-string element found in Words array:", word);
                return '';
            }
        }));
    }
    //return false immediately if word is falsy
    if (!word) {
        return false;
    }

    return WordsSet.has(word.toLowerCase());
}

