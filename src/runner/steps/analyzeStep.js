const _ = require('lodash');
const prettier = require('prettier');

const resolvers = require('../../resolvers');
const { TSDBuilder, Strategies } = require('../../builder');

module.exports = (customResolvers, libName) => (data) => {
  const declarations = [];
  const componentsList = [];

  _.forEach(data, (component) => {
    if (!component) return;

    componentsList.push(component.displayName);

    const builder = new TSDBuilder(
      component,
      resolvers,
      customResolvers
    );

    builder
      .next(Strategies.enumStrategy)
      .next(Strategies.interfaceStrategy)
      .next(Strategies.headerStrategy);

    declarations.push(builder.end());
  });

  console.log('Library name:', libName);
  console.log('Components found:', declarations.length);
  console.log('Components list:', componentsList.join(', '));

  return prettier.format(`
    declare module '${libName}' {
      import * as React from 'react';

      ${declarations.join('\n')}
    }`,
    {
      parser: 'typescript'
  });
};
