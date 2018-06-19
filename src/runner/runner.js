const _ = require('lodash');

const Runner = function() {
  this.steps = [];
};

Runner.prototype.step = function(step, name) {
  this.steps.push(step);
  return this;
};

Runner.prototype.exec = function () {
  let accum;

  _.forEach(this.steps, (step) => {
    accum = step(accum);
  });

  return accum;
}

module.exports = Runner;
