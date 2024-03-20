import { Words } from '../../assets/Words';

export default function checkWord (word) {
    // console.log('checkWord called with:', word);

    return Words.some((x) => x === word)
}

