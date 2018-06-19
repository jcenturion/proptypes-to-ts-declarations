const _ = require('lodash');

module.exports = (component, { propsNameResolver, jsDocResolver, enumNameResolver, tsTypeResolver }) => `
  interface ${propsNameResolver(component)} {
    ${_.keys(component.props).map((propName) => {
      const { type: { name, value }, description } = component.props[propName];

      if (name === 'enum') {
        return `${jsDocResolver(description)} ${propName}?: ${enumNameResolver(component.displayName, propName)}`;
      }

      if (name === 'func') {
        return `${jsDocResolver(description)} ${propName}?(): void`;
      }

      return `${jsDocResolver(description)} ${propName}?: ${tsTypeResolver(name)}`;
    }).join('\n')}
  }
`;
