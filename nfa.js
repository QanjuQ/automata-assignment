class NFA {
  constructor (configuaration) {
    this.configuaration = configuaration;
  }

  etransit(states) {
    let transit = state => this.configuaration.delta[state].e;
    return states.reduce((transits, state) => transits.concat(transit(state)), []);
  }

  hasEpsilon(state) {
    state = this.configuaration.delta[state]
    return state && state.e !== undefined;
  }

  etransits(states) {
    let currentStates = states.slice();
    let statesChecked = [];
    let epsilonStates = currentStates.filter((state) => this.hasEpsilon(state));
    while (epsilonStates.length != 0) {
      statesChecked = statesChecked.concat(currentStates);
      currentStates = this.etransit(epsilonStates);
      epsilonStates = currentStates.filter((state) => this.hasEpsilon(state));
      const isAlreadyChecked = (ele) => (!statesChecked.includes(ele));
      epsilonStates = epsilonStates.filter(isAlreadyChecked);
    }
    return statesChecked.concat(currentStates);
  }

  transit(currentStates, alphabet) {
    currentStates = this.etransits(currentStates);
    currentStates = this.transitions(currentStates, alphabet);
    currentStates = currentStates.filter((state) => state !== undefined);
    return currentStates;
  }

  transitions(states, alphabet) {
    return states.reduce((states, state) => states.concat(this.moveto(state, alphabet)), []);
  }

  moveto(state, alphabet) {
    state = this.configuaration.delta[state];
    state = state ? state[alphabet] : state;
    return state;
  }

  doesAccept(input) {
    const initialStates = this.etransits([this.configuaration['start-state']]);
    const transit = (state, alphabet) => this.transit(state, alphabet);
    let finalStates = input.split('').reduce(transit, initialStates);
    const isFinalState = (state) => this.configuaration['final-states'].includes(state);
    return this.etransits(finalStates).some(isFinalState);
  }
}

module.exports = NFA;
