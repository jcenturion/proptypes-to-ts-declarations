const fs = require('fs');
const docgen = require('react-docgen');
const _ = require('lodash');
const glob = require('glob');

module.exports = (path) => () => {
  const files = glob.sync(path);
  const components = [];

  _.forEach(files, (filePath) => {
    const code = fs.readFileSync(filePath, 'utf8');

    try {
      components.push(docgen.parse(code));
    } catch (e) {
      // console.log(e);
    }
  });

  return components;
};
