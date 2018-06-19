const _ = require('lodash');

module.exports = (component, { jsDocResolver, propsNameResolver }) => `
  ${jsDocResolver(component.description)} export const ${_.startCase(component.displayName).replace(/ /g, '')}: React.ComponentClass<${propsNameResolver(component)}>;
`;
