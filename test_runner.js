const assert = require('assert');
const DFA = require('./dfa');
const NFA = require('./nfa');

const tests = require('./testcases.js')

const createMachine = (type, tuple) => {
  const machine = { dfa: DFA, nfa: NFA };
  return new machine[type](tuple);
};

const runtest = (machineInfo) => {
  console.log(`\n********${machineInfo.type}: ${machineInfo.name}********`);
  machineInfo['pass-cases'].forEach((input) => {
    const machine = createMachine(machineInfo.type, machineInfo.tuple);
    console.log(`Should return true for ${input}`); ``
    assert(machine.doesAccept(input));
  });
  machineInfo['fail-cases'].forEach((input) => {
    const machine = createMachine(machineInfo.type, machineInfo.tuple);
    console.log(`Should return false for ${input}`);
    assert(!machine.doesAccept(input));
  });
};

tests.forEach(runtest);