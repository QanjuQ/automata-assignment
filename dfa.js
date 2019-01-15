class DFA {
  constructor (tuple) {
    this.configuration = tuple;
  }

  transit(state, alphabet) {
    return this.configuration.delta[state][alphabet];
  }

  doesAccept(inputString) {
    const initialState = this.configuration['start-state'];
    const transit = (state, alphabet) => this.transit(state, alphabet)
    const finalState = inputString.split('').reduce(transit, initialState);
    return this.configuration['final-states'].includes(finalState);
  }
}

module.exports = DFA;