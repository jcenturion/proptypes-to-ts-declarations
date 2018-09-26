const { expect } = require('code');
const { describe, it } = exports.lab = require('lab').script();

const {
  enumNameResolver,
  jsDocResolver,
  propsNameResolver,
  tsTypeResolver
} = require('../src/resolvers');

const { TSDBuilder, Strategies } = require('../src/builder');

describe('builder', () => {
  it('should correctly build a ts declaration', () => {
    const component = {
      displayName: 'component',
      props: {
        string: {
          type: {
            name: 'string',
            value: 'value'
          }
        },
        func: {
          type: {
            name: 'func',
            value: ''
          }
        },
        enum: {
          description: 'prop comment',
          type: {
            name: 'enum',
            value: [{ value: '\'default\'', computed: false }]
          }
        }
      }
    };
    const builder = new TSDBuilder(component, {
      enumNameResolver,
      jsDocResolver,
      propsNameResolver,
      tsTypeResolver
    });

    const result = builder
      .next(Strategies.enumStrategy)
      .next(Strategies.headerStrategy)
      .next(Strategies.interfaceStrategy)
      .end();

    expect(result).to.equal('\n\ntype componentEnumEnum = \"default\";\n   export const Component: React.ComponentClass<ComponentProps>;\n\n  interface ComponentProps {\n     string?: string\n func?(): void\n\n  /**\n   * prop comment\n  */\n enum?: componentEnumEnum\n  }\n');
  });

  describe('strategies', () => {
    describe('enum', () => {
      it('should correctly handle enum with array values', () => {
        const component = {
          displayName: 'component',
          props: {
            prop: {
              description: 'prop comment',
              required: true,
              defaultValue: 'defaultValue',
              type: {
                name: 'enum',
                value: [{ value: '\'default\'', computed: false }]
              }
            }
          }
        };
        const enumDeclaration = Strategies.enumStrategy(component, { enumNameResolver });

        expect(enumDeclaration).to.equal('type componentPropEnum = "default";');
      });

      it('should correctly skip resolution if type is not enum', () => {
        const component = {
          displayName: 'component',
          props: {
            prop: {
              description: 'prop comment',
              required: true,
              defaultValue: 'defaultValue',
              type: {
                name: 'string',
                value: '__KEY__'
              }
            }
          }
        };
        const enumDeclaration = Strategies.enumStrategy(component, { enumNameResolver });

        expect(enumDeclaration).to.equal('');
      });

      it('should correctly handle unknown types', () => {
        const component = {
          displayName: 'component',
          props: {
            prop: {
              description: 'prop comment',
              required: true,
              defaultValue: 'defaultValue',
              type: {
                name: 'enum',
                value: '__KEY__'
              }
            }
          }
        };
        const enumDeclaration = Strategies.enumStrategy(component, { enumNameResolver });

        expect(enumDeclaration).to.equal('type componentPropEnum = "unknown";');
      });

      it('should correctly handle external types', () => {
        const component = {
          displayName: 'component',
          props: {
            prop: {
              description: 'prop comment',
              required: true,
              defaultValue: 'defaultValue',
              type: {
                name: 'enum',
                value: '__KEY__'
              }
            }
          }
        };
        const enumDeclaration = Strategies.enumStrategy(component, { enumNameResolver }, {
          oneOfResolvers: { __KEY__: ['custom'] }
        });

        expect(enumDeclaration).to.equal('type componentPropEnum = "custom";');
      });
    });

    describe('interface', () => {
      it('should correctly resolve the ts interface', () => {
        const component = {
          displayName: 'component',
          props: {
            string: {
              type: {
                name: 'string',
                value: 'value'
              }
            },
            func: {
              type: {
                name: 'func',
                value: ''
              }
            },
            enum: {
              description: 'prop comment',
              type: {
                name: 'enum',
                value: [{ value: '\'default\'', computed: false }]
              }
            }
          }
        };

        const interface = Strategies.interfaceStrategy(component, {
          propsNameResolver,
          jsDocResolver,
          enumNameResolver,
          tsTypeResolver
        });

        expect(interface).to.equal('\n  interface ComponentProps {\n     string?: string\n func?(): void\n\n  /**\n   * prop comment\n  */\n enum?: componentEnumEnum\n  }\n');
      });
    })

    describe('header', () => {
      it('should correctly create the export sentence', () => {
        const component = {
          displayName: 'component',
          props: {
            prop: {
              description: 'prop comment',
              required: true,
              defaultValue: 'defaultValue',
              type: {
                name: 'enum',
                value: '__KEY__'
              }
            }
          }
        };

        const header = Strategies.headerStrategy(component, {
          jsDocResolver,
          propsNameResolver
        });

        expect(header).to.equal('\n   export const Component: React.ComponentClass<ComponentProps>;\n');
      });
    });
  });
});
