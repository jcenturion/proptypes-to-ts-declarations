const { Runner, Steps } = require('./runner');

module.exports = (libName, path, destinationPath, customResolvers) => {
  const runner = new Runner();

  runner
    .step(Steps.read(path))
    .step(Steps.analyze(customResolvers, libName))
    .step(Steps.write(destinationPath))
    .exec();
};

module.exports.dryRun = (path, customResolvers) => {
  const runner = new Runner();

  return runner
    .step(Steps.read(path))
    .step(Steps.analyze(customResolvers))
    .exec();
};
