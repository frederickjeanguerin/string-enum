# string-enum

<!-- [![Version](http://img.shields.io/npm/v/es6-enum.svg)](https://www.npmjs.org/package/es6-enum) -->
[![Build Status](https://travis-ci.org/frederickjeanguerin/string-enum.svg)](https://travis-ci.org/frederickjeanguerin/string-enum)
[![Coverage Status](https://coveralls.io/repos/github/frederickjeanguerin/string-enum/badge.svg?branch=master)](https://coveralls.io/github/frederickjeanguerin/string-enum?branch=master)

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

Note that enum elements should be strings :

```javascript
const numbers = StringEnum(1, 2, 3);        // TypeError
```

Identifier incompatible strings are allowed, but then you must use bracket notation to access them in your code later on :

```javascript
const otherColors = StringEnum('light-blue', 'lime-green');

otherColors['light-blue']                   // OK
otherColors.light-blue                      // Not working
```

Enum elements cant be repeated :

```javascript
const colors = StringEnum('red', 'blue', 'red');    // Error
```

Enum elements cant start with a double undercore :

```javascript
const colors = StringEnum('__a', '__b');            // Error
```

That's because the double undercore is used to access special properties (*see below*).

All other names are available, including special names :

```javascript
const specials = StringEnum('constructor', 'toString', 'valueOf');     // Just fine
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

StringEnum are objects and as such do own special objects properties, like most other JS objects.
However, to access them you need to precede them with a double underscore.

```js
eyeColors.__proto__             // prototype
eyeColors.__constructor         // constructor
eyeColors.__toString            // string conversion
```

*Note that because the `toString` and `valueOf` methods are masked, automatic object conversion will not happen.*

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