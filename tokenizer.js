class Tokenizer {
    constructor() {
        this.wordsMap = {
            "<SOS>": 0,
            "<EOS>": 1,
            "<UNK>": 2,
        };
        this.reverseMap = {
            0: "<SOS>",
            1: "<EOS>",
            2: "<UNK>"
        };
    }

    tokenize(sentence) {
        return sentence.match(/\w+|[^\w\s]/g) || [];
    }

    learnVocab(word) {
        if (!this.wordsMap[word]) {
            const key = this.generateUniqueKey(word);
            this.wordsMap[word] = key;
            this.reverseMap[key] = word;
        }
    }

    generateUniqueKey(word) {
        let hash = 0;
        for (let i = 0; i < word.length; i++) {
            hash = (hash * 31 + word.charCodeAt(i)) % 10000;
        }
        while (this.reverseMap[hash]) {
            hash = (hash + 1) % 50000;
        }
        return hash;
    }

    encode(sentence) {
        const words = this.tokenize(sentence);
        const codes = [];
        codes.push(this.wordsMap["<SOS>"]);
        words.forEach(word => {
            if (!this.wordsMap[word]) {
                this.learnVocab(word);
            }
            codes.push(this.wordsMap[word] || this.wordsMap["<UNK>"]);
        });
        codes.push(this.wordsMap["<EOS>"]);
        return codes;
    }

    decode(codeArray) {
        return codeArray.map(num => this.reverseMap[num] || "<UNK>").filter(w => w !== "<SOS>" && w !== "<EOS>").join(" ");
    }
}

const tokenizer = new Tokenizer();

const input = document.getElementById("textInput");
const encodeBtn = document.getElementById("encodeBtn");
const decodeBtn = document.getElementById("decodeBtn");
const output = document.getElementById("outputBox");

encodeBtn.addEventListener('click', () => {
    const res = tokenizer.encode(input.value);
    output.innerHTML = res;
});

decodeBtn.addEventListener('click', () => {
    const nums = input.value.split(",").map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    const res = tokenizer.decode(nums);
    output.innerHTML = res;
});