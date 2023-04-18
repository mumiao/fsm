const STATES = {
  START: "start",
  NUMBER: "number",
  STRING: "string",
};

const INPUTS = {
  NUMBER: "number",
  LETTER: "letter",
  SPACE: "space",
  QUOTE: "quote",
};

const TRANSITIONS = [
  {
    currentState: STATES.START,
    input: INPUTS.NUMBER,
    nextState: STATES.NUMBER,
  },
  {
    currentState: STATES.START,
    input: INPUTS.LETTER,
    nextState: STATES.STRING,
  },
  { currentState: STATES.START, input: INPUTS.SPACE, nextState: STATES.START },
  { currentState: STATES.START, input: INPUTS.QUOTE, nextState: STATES.STRING },
  {
    currentState: STATES.NUMBER,
    input: INPUTS.NUMBER,
    nextState: STATES.NUMBER,
  },
  { currentState: STATES.NUMBER, input: INPUTS.SPACE, nextState: STATES.START },
  {
    currentState: STATES.STRING,
    input: INPUTS.LETTER,
    nextState: STATES.STRING,
  },
  { currentState: STATES.STRING, input: INPUTS.SPACE, nextState: STATES.START },
  { currentState: STATES.STRING, input: INPUTS.QUOTE, nextState: STATES.START },
];

class TextParse {
  constructor() {
    this.currentState = STATES.START;
    this.buffer = "";
    this.type;
  }

  performTransition(input) {
    const transition = TRANSITIONS.find(
      (t) => t.currentState === this.currentState && t.input === input.type
    );
    if (!transition)
      throw new Error(
        `Invalid input "${input.value}" for state "${this.currentState}"`
      );

    this.currentState = transition.nextState;

    if (this.currentState === STATES.START) {
      const token = this.buffer;
      const type = this.type;
      this.buffer = "";
      this.type = "";
      return {
        type,
        value: token,
      };
    } else {
      this.buffer += input.value;
      this.type = input.type;
    }
  }
}

function textParse(input) {
  const textParse = new TextParse();
  const tokens = [];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    try {
      const token = textParse.performTransition({
        type: getInputType(char),
        value: char,
      });

      if (token) {
        tokens.push(token);
      }
    } catch (e) {
      console.error(e.message);
      return null;
    }
  }

  const lastToken = textParse.performTransition({ type: INPUTS.SPACE });

  if (lastToken) {
    tokens.push(lastToken);
  }

  return tokens;
}

function getInputType(char) {
  if (/[0-9]/.test(char)) {
    return INPUTS.NUMBER;
  } else if (/[a-zA-Z]/.test(char)) {
    return INPUTS.LETTER;
  } else if (/[\s\n\t\r]/.test(char)) {
    return INPUTS.SPACE;
  } else if (char === '"') {
    return INPUTS.QUOTE;
  } else {
    throw new Error(`Unknown input type for "${char}"`);
  }
}

// Example usage:
console.log(textParse('123 abc d "def ghi" 456')); 
// [
//   { type: 'number', value: '123' },
//   { type: 'letter', value: 'abc' },
//   { type: 'letter', value: '"def' },
//   { type: 'letter', value: 'ghi' },
//   { type: '', value: '' },
//   { type: 'number', value: '456' }
// ]