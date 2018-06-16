# string-enum

<!-- [![Version](http://img.shields.io/npm/v/es6-enum.svg)](https://www.npmjs.org/package/es6-enum) -->

Creates simple and immutables sets of names (*strings*).

*These sets are guaranteed to be immutable. Moreover, if you ever mispell a name, an error will be raised immediately, instead of letting `undefined` cripple and damage your running program in unexpected ways.*

## Installation

```sh
npm install string-enum
```

## Usage (node)

```javascript
import Enum from "string-enum";         // ES6 modules
// or
const Enum = require("string-enum");    // Node way

const eyeColors = Enum(
    "brown",
    "blue",
    "green",
    "hazel");

console.log(eyeColors.brown);   // brown
console.log(eyeColors.green);   // green

console.log(eyeColors.bronw);   // Error, undefined eye color.

eyeColors.brown = "blue";       // Error, cant modify existing color

eyeColors.red = "red";          // Error, cant add new color

delete eyeColors.brown;         // Error, cant delete color

```

## Usage (browser)

```html
<script src="string-enum.js"></script>
<script>
    const eyeColors = StringEnum (
        "brown",
        "blue",
        "green",
        "hazel");
    alert(`You have beautiful ${eyeColors.hazel} eyes!`);
</script>
```

## More usages

### Construction

To create a new set of enum values, all the followings are equivalent:

```javascript
const eyeColors = StringEnum("brown", "blue", "green", "hazel");

const eyeColors = StringEnum( ["brown", "blue", "green", "hazel"] );

const eyeColors = new StringEnum("brown", "blue", "green", "hazel");
```

### Equality

Enum elements are just normal strings, hence:

```javascript
eyeColors.blue === 'blue';  // true
```

### Iteration

Values are iterable with either `for... of...` or `for... in...`:

```javascript
for(const color in eyeColors) { ... }

for(const color of eyeColors) { ... }
```

### Lookup

StringEnums are basically simple objects, so values are accessed with either dot notation or by bracket lookup:

```javascript
console.log(eyeColors.blue);        // blue

console.log(eyeColors['blue']);     // blue
```

### Check membership

To check beforehand if an element is part of the Enum set, you may use the `in` operator:

```javascript
'blue' in eyeColors;                // true
'red' in eyeColors;                 // false
```

### Other stuff

```javascript
eyeColors instanceof StringEnum;    // true

Object.keys(eyeColors)              // ['browns', etc.]
Object.values(eyeColors)            // ['browns', etc.]
[...eyeColors]                      // ['browns', etc.]

{...eyeColors}                      // { brown:'brown', etc. }
```

## License

MIT