const _ = require('lodash');

module.exports = (component, { enumNameResolver }, customResolvers) => _.keys(component.props).map((propName) => {
  const { oneOfResolvers } = customResolvers || { };
  const { type: { name, value }, description, required, defaultValue  } = component.props[propName];
  const varName = `type ${enumNameResolver(component.displayName, propName)}`;

  if (name !== 'enum') return;

  if (_.isArray(value)) {
    return `${varName} = ${_.map(value, (e=>`"${e.value.replace(/^'(.*)'$/, '$1')}"`)).join('|')};`;
  }

  if (_.isString(value) && oneOfResolvers) {
    const values = oneOfResolvers[value];
    return `${varName} = ${_.map(values, c => `"${c}"`).join('|')};`;
  }

  return `${varName} = "unknown";`;
}).join('\n');
