const _ = require('lodash');

module.exports = component => `${_.startCase(component.displayName).replace(/\s/g, '')}Props`;
