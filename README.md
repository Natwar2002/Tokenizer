# Simple JavaScript Tokenizer

[Live Link](https://tokenizer-rosy.vercel.app/)

A minimal tokenizer implementation in JavaScript that:
- Learns vocabulary from user input
- Generates unique numeric keys for words (max value 50000)
- Handles special tokens `<SOS>`, `<EOS>`, and `<UNK>`
- Supports encoding (text → numbers) and decoding (numbers → text)

## Features
- **Vocabulary learning**: Automatically assigns new IDs to unseen words.
- **Special tokens**:
  - `<SOS>` – Start of sentence
  - `<EOS>` – End of sentence
  - `<UNK>` – Unknown word
- **Unique key generation** using a hash function to keep IDs short.

## Usage

### 1. Website
Open `index.html` in your browser.

**Encoding**
1. Enter text in the input box
2. Click **Encode**
3. See numeric token IDs

**Decoding**
1. Enter comma-separated token IDs in the input box
2. Click **Decode**
3. See the reconstructed sentence