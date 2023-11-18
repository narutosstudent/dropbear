const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

const tokenize = (input) => {
  const tokens = [];
  let cursor = 0;

  while (cursor < input.length) {
    const character = input[cursor];

    if (isParenthesis(character)) {
      tokens.push({
        type: 'Parenthesis',
        value: character,
      });

      cursor++;
      continue;
    }

    if (isWhitespace(character)) {
      cursor++;
      continue;
    }

    if (isNumber(character)) {
      let number = character;

      // Use a while loop to construct the full number
      while (isNumber(input[cursor + 1])) {
        number += input[++cursor]; // Increment cursor and append to number
      }

      tokens.push({
        type: 'Number',
        value: Number(number),
      });

      cursor++;
      continue;
    }

    if (isLetter(character)) {
      // handle case if its `add` token, then we want to add the whole word
      let symbol = character;

      while (isLetter(input[++cursor])) {
        symbol += input[cursor];
      }

      tokens.push({
        type: 'Name',
        value: symbol,
      });

      continue;
    }

    if (isQuote(character)) {
      let string = '';

      while (!isQuote(input[++cursor])) {
        string += input[cursor];
      }

      tokens.push({
        type: 'String',
        value: string,
      });

      cursor++;
      continue;
    }

    cursor++;
  }

  return tokens;
};

module.exports = { tokenize };
