# string-enum

[![Build Status](https://travis-ci.org/frederickjeanguerin/string-enum.svg)](https://travis-ci.org/frederickjeanguerin/string-enum)
[![Coverage Status](https://coveralls.io/repos/github/frederickjeanguerin/string-enum/badge.svg?branch=master)](https://coveralls.io/github/frederickjeanguerin/string-enum?branch=master)
[![npm version](https://badge.fury.io/js/string-enum.svg)](https://badge.fury.io/js/string-enum)
![Supported Platform](https://img.shields.io/badge/run%20in-node%20%7C%20web-blue.svg)
![js version](https://img.shields.io/badge/js-ES6%2B-blue.svg)

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
<script src="path/to/string-enum.js"></script>
<!-- or -->
<script src="path/to/string-enum-min.js"></script>
<!-- or -->
<script src="https://unpkg.com/string-enum"></script>
<!-- or -->
<script src="https://unpkg.com/string-enum/dist/string-enum-min.js"></script>

<script>
    const eyeColors = StringEnum (
        "brown",
        "blue",
        "green",
        "hazel");
    alert(`You have beautiful ${eyeColors.hazel} eyes!`);
</script>
```

### Downloads

* [string-enum.js](https://unpkg.com/string-enum)
* [string-enum-min.js](https://unpkg.com/string-enum@1.0.0/dist/string-enum-min.js)

## More usage

### Construction

To create a new set of enum values, all the followings are equivalent :

```javascript
const eyeColors = StringEnum("brown", "blue", "green", "hazel");

const eyeColors = StringEnum( ["brown", "blue", "green", "hazel"] );

const eyeColors = new StringEnum("brown", "blue", "green", "hazel");
```

Enum elements should be strings :

```javascript
const numbers = StringEnum(1, 2, 3);        // TypeError
```

Strings that dont qualify as valid JS identifiers are allowed, but then you must use bracket notation to access them in your code later on :

```javascript
const otherColors = StringEnum('light-blue', 'lime-green');

otherColors['light-blue']                   // OK
otherColors.light-blue                      // Not working
```

Enum elements cant be repeated :

```javascript
const colors = StringEnum('red', 'blue', 'red');    // Error
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

### Special object properties

`StringEnum` are objects and as such do own special objects properties, e.g. `__proto__` and `constructor`, just like most other JS objects. However, `StringEnum` permits you to override these objects, because most of the time the user don't care about them. However, if they are not overridden, they behave normally. Note that the `in` operator has been modified to respond only to the enum elements.

```js
eyeColors.__proto__             // prototype
eyeColors.constructor           // constructor
eyeColors.toString()            // string conversion
'constructor' in eyeColors      // false

const specials = StringEnum('constructor', 'toString');
specials.constructor            // "constructor"
specials.toString               // "toString"
specials.valueOf()              // value conversion
'constructor' in specials       // true
'valueOf' in specials           // false
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

* [string-enum.mjs](https://unpkg.com/string-enum@1.0.0/dist/string-enum.mjs)
* [string-enum-min.mjs](https://unpkg.com/string-enum@1.0.0/dist/string-enum-min.mjs)
* [string-enum-module.js](https://unpkg.com/string-enum@1.0.0/dist/string-enum-module.js)
* [string-enum-module-min.js](https://unpkg.com/string-enum@1.0.0/dist/string-enum-module-min.js)

## Comparison with other Enum packages

There are many other [enum packages](https://www.npmjs.com/search?q=enum) available on **npm**. Most of them are useful for their particular use cases but none of them provides precisely what `StringEnum` means to do. `StringEnum` has been developed as part of another project that needed just what it does. The motivation was to furnish an immutable set of predefined names that catches most errors and (stupid) mistakes. It is a very simple code and very simple to use.  

## License

MIT
