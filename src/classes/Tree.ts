export default class Tree {
    tree: Node;
    constructor() {
      this.tree = null;
    }

    newNode(): Node {
        return {
            isLeaf: false,
            children: {} ,
            frequency: 0
        }
    }
    // adding and keeping track of frequency of words
    add(word: string): void {
        if (!this.tree) this.tree = this.newNode();

        let root = this.tree;
        for (const letter of word) {
            if (!(letter in root.children)) {
            root.children[letter] = this.newNode();
            }
            root = root.children[letter];
            root.frequency++;
        }
        root.isLeaf = true;
    }

    // search exact match of text
    find(word: string): Node {
        let root = this.tree;
        for (const letter of word) {
            if (letter in root.children) {
              root = root.children[letter];
            } else return;
        }
        return root;
    }
    // recursive to find complete words(leaves) on a given branch
    traverse(root: Node, word: string, array: Suggestion []): Suggestion[] {
        if (root.isLeaf) {
            array.push({word, freq: root.frequency});
            return array;
        }

        for (const letter in root.children) {
            this.traverse(root.children[letter], word + letter, array);
        }
    }

    // return <max> suggestions for search-word
    suggest_match(word: string, max: number = 4): Suggestion [] {
        let suggestion_array : Suggestion [] = [];
        const root = this.find(word);
        if (!root) return suggestion_array; // cannot suggest anything

        const children = root.children;
        for (const letter in children) {
           this.traverse(children[letter], word + letter, suggestion_array);
        }

        suggestion_array = this.sort_suggestions(suggestion_array);
        return suggestion_array.slice(0, max);
    }

    // each possible suggestion is pushed and sorted
    sort_suggestions(array: Suggestion []): Suggestion [] {
        if (array.length < 2) return array;

        return array.sort((a,b) => {
            if(a.freq > b.freq) return -1;
            else if(a.freq < b.freq) return 1;
            return 0;
        })
    }

    print(): void {
      console.log(this.tree)
    }
}

interface Node {
    isLeaf: boolean,
    children: {} ,
    frequency: number
}

interface Suggestion {
    word: string,
    freq: number
}