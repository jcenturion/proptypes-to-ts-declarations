const _ = require('lodash');

module.exports = (name, propName) => _.camelCase(`${_.capitalize(name)}${_.capitalize(propName)}Enum`);
