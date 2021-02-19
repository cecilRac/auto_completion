import * as fs from 'fs';
// tree class - for implementing dictionary
import Tree from '../classes/Tree' ;

const dictionary =  new Tree;

// read keywords from <file> into memory
export const load_dictionary = (file): void => {
    let words = fs.readFileSync(file, 'utf8').split('\n')
    words.map(word => dictionary.add(word.toLowerCase()))

}

// get <num> possible sugesstions for <text>
export const get_suggestions = async (text , num = 4): Promise <string[]> => {
    const array_suggestions = dictionary.suggest_match(text.toLowerCase(), num);
    return array_suggestions.map(el => el.word)
}
