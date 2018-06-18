# string-enum

<!-- [![Version](http://img.shields.io/npm/v/es6-enum.svg)](https://www.npmjs.org/package/es6-enum) -->
[![Build Status](https://travis-ci.org/frederickjeanguerin/string-enum.svg)](https://travis-ci.org/frederickjeanguerin/string-enum)

Creates simple and immutables sets of names (*strings*).

*These sets are guaranteed to be immutable. Moreover, if you ever mispell a name, an error will be raised immediately, instead of letting `undefined` cripple and damage your running program in unexpected ways, thus following a [fail-fast](https://en.wikipedia.org/wiki/Fail-fast) approach.*

## Installation

```sh
npm install string-enum
```

## Usage (node)

```javascript
import StringEnum from "string-enum";         // ES6 modules
// or
const StringEnum = require("string-enum");    // Classic way

const eyeColors = StringEnum(
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
<!-- or -->
<script src="string-enum-min.js"></script>

<script>
    const eyeColors = StringEnum (
        "brown",
        "blue",
        "green",
        "hazel");
    alert(`You have beautiful ${eyeColors.hazel} eyes!`);
</script>
```

## More usage

### Construction

To create a new set of enum values, all the followings are equivalent:

```javascript
const eyeColors = StringEnum("brown", "blue", "green", "hazel");

const eyeColors = StringEnum( ["brown", "blue", "green", "hazel"] );

const eyeColors = new StringEnum("brown", "blue", "green", "hazel");
```

Note that enum elements should be strings:

```javascript
const numbers = StringEnum(1, 2, 3);        // TypeError
```

Identifier incompatible strings are allowed, but then you must use bracket notation to access them in your code later on:

```javascript
const otherColors = StringEnum('light-blue', 'lime-green');

otherColors['light-blue']                   // OK
otherColors.light-blue                      // Not working
```

### Equality

Enum elements are just normal strings, hence:

```javascript
eyeColors.blue === 'blue';                  // true
```

### Iteration

Enum elements are iterable with either `for... of...` or `for... in...`:

```javascript
for(const color in eyeColors) { ... }

for(const color of eyeColors) { ... }
```

### Membership lookup

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

## ES6 module versions

The package also exists in ES6 module versions to be used on the web or with Node. Note that the `-module` versions may be used on a server that cant properly serve `.mjs` extension as a JavaScript MIME type.

```sh
string-enum.mjs
string-enum-min.mjs

string-enum-module.js
string-enum-module-min.js
```

## License

MIT