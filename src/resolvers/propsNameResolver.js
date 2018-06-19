const _ = require('lodash');

module.exports = component => _.snakeCase(`${component.displayName.toLowerCase()}Props`);
