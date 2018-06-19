# Proptypes to TypeScript Declarations [beta]

Creates TS declarations from your components library.

## Usage

Install it:

```
$ npm install proptypes-to-ts-declarations
```

Using it:

```javascript
const propTypesToTS = require('proptypes-to-ts-declarations');

propTypesToTS(
  'my-library',
  './src/components/**/*.js',
  './index.d.ts');
```

## Example

### Input

```javascript
const MyComponent = (props) => (
  <div className={props.className}>
    Good {props.time}, {props.name}!
  </div>
);

MyComponent.propTypes = {
  className: PropTypes.string
  time: PropTypes.oneOf(['morning', 'afternoon']).isRequired,
  name: PropTypes.string.isRequired
};
```

### Output

```typescript
declare module "my-library" {
  import * as React from "react";

  type timeEnum =
    | "default"
    | "information"
    | "success"
    | "warning"
    | "danger";

  export interface my_component_props {
    className?: string;
    time: timeEnum;
    name: string;
  }

  export const MyComponent: React.ComponentClass<my_component_props>;
}
```
