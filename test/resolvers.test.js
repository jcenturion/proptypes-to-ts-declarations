const { expect } = require('code');
const { describe, it } = exports.lab = require('lab').script();

const {
  enumNameResolver,
  jsDocResolver,
  propsNameResolver,
  tsTypeResolver
} = require('../src/resolvers');

describe('resolvers', () => {
  it('should correctly resolve the enum name', () => {
    const enumName = enumNameResolver('name', 'propName');
    expect(enumName).to.equal('namePropnameEnum');
  });

  it('should correctly resolve js docs', () => {
    const jsdoc = jsDocResolver('a comment');
    expect(jsdoc).to.equal('\n  /**\n   * a comment\n  */\n');
  });

  it('should correctly resolve propsName', () => {
    const propsName = propsNameResolver({ displayName: 'component' });
    expect(propsName).to.equal('component_props');
  });

  it('should correctly resolve ts type', () => {
    const type = tsTypeResolver('bool');
    expect(type).to.equal('boolean');
  });
});
