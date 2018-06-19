const _ = require('lodash');

module.exports = description => _.isEmpty(description) ? '' : `
  /**
   ${description.split('\n').map(d => `* ${d}`).join('\n')}
  */
`;
