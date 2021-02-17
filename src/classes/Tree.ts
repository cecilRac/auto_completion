export default class Tree {
    tree: node;
    suggestions: suggestion [];
    constructor() {
      this.tree = null;
      this.suggestions = [];
    }

    newNode(): node {
        return {
            isLeaf: false,
            children: {} ,
            frequency: 0
        }
    }
    // adding and keeping track of frequency of words
    add(word): void {
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
    find(word): node {
        let root = this.tree;
        for (const letter of word) {
            if (letter in root.children) {
              root = root.children[letter];
            } else return;
        }
        return root;
    }
    // recursive to find complete words(leaves) on a given branch
    traverse(root, word):void {
        if (root.isLeaf) {
            this.push_sort_suggestions({word, freq: root.frequency});
            return;
        }

        for (const letter in root.children) {
            this.traverse(root.children[letter], word + letter);
        }
    }

    // return <max> suggestions for search-word
    suggest_match(word, max = 4): suggestion [] {
        const root = this.find(word);
        if (!root) return this.suggestions; // cannot suggest anything

        const children = root.children;

        for (const letter in children) {
            this.traverse(children[letter], word + letter);
        }
        return this.suggestions.slice(0, max);
    }
    // each possible suggestion is pushed and sorted
    push_sort_suggestions({word, freq}): void {
        if (this.suggestions.length < 1) {
            this.suggestions.push({word, freq});
            return;
        }
        this.suggestions.push({word, freq});
        this.suggestions.sort((a,b) => {
            if(a.freq > b.freq) return -1;
            else if(a.freq < b.freq) return 1;
            return 0;
        })
    }

    clear_suggestions(): void {
      this.suggestions = [];
    }

    print(): void {
      console.log(this.tree)
    }
}

interface node {
    isLeaf: boolean,
    children: {} ,
    frequency: number
}

interface suggestion {
    word: string,
    freq: number
}