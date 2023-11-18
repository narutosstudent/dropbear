const { isOpeningParenthesis, isClosingParenthesis } = require('./identify');
const { specialForms } = require('./special-forms');
const { peek, pop } = require('./utilities');

const parenthesize = (tokens) => {
  const token = pop(tokens);

  if (isOpeningParenthesis(token.value)) {
    const expression = [];

    while (!isClosingParenthesis(peek(tokens).value)) {
      // loop recursively
      expression.push(parenthesize(tokens));
    }

    pop(tokens); // Remove closing parenthesis
    return expression;
  }

  return token;
};

const parse = (tokens) => {
  const isCallExpression = Array.isArray(tokens);
  if (isCallExpression) {
    if (tokens.length === 0) return null;

    let [first, ...rest] = tokens;

    return {
      type: 'CallExpression',
      name: first.value,
      // arguments is an array of parsed tokens, so it could be deeply nested with CallExpressions and other stuff
      arguments: rest.map(parse),
    };
  }

  if (tokens.type === 'Number') {
    return {
      type: 'NumericLiteral',
      value: tokens.value,
    };
  }

  if (tokens.type === 'String') {
    return {
      type: 'StringLiteral',
      value: tokens.value,
    };
  }

  if (tokens.type === 'Name') {
    return {
      type: 'Identifier',
      name: tokens.value,
    };
  }
};

module.exports = { parse: (tokens) => parse(parenthesize(tokens)) };
