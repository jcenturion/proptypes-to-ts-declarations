const fs = require('fs');

module.exports = (destinationPath) => (data) => {
  fs.writeFileSync(destinationPath, data);
};
