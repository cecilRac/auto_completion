const fs = require('fs');
// tree class - for implementing dictionary
const Tree = require('../classes/Tree');

const dictionary =  new Tree;

// read keywords from <file> into memory
exports.load_dictionary = async (file) => {
    let words = fs.readFileSync(file, 'utf8').split('\n')
    words.map(word => dictionary.add(word.toLowerCase()))

}

// get <num> possible sugesstions for <text>
exports.get_suggestions = async (text , num = 4) => {
    dictionary.clear_suggestions();
    const array_suggestions = dictionary.suggest_match(text.toLowerCase(), num);
    return array_suggestions.map(el => el.word)
}
