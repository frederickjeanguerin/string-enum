const assert = require('assert');
const StringEnum = require('../string-enum');

const values = ['brown', 'blue', 'green', 'hazel'];
const eyeColors = StringEnum(values);

const equals = [
    [ eyeColors.brown, 'brown' ],
    [ eyeColors['brown'], 'brown' ],
    [ 'brown' in eyeColors, true ],
    [ 'red' in eyeColors, false ],
    [ eyeColors instanceof StringEnum, true ],
    [ eyeColors.constructor, StringEnum ],
    [ [...eyeColors], values ],
    [ Object.keys(eyeColors), values ],
    [ Object.values(eyeColors), values ],
    [ {...eyeColors}, {'brown': 'brown', 'blue' : 'blue' , 'green': 'green', 'hazel': 'hazel'} ],
    [ (()=>{
        const vals = [];
        for(const val in eyeColors) vals.push(val);
        return vals;
    })(), values],
    [ (()=>{
        const vals = [];
        for(const val of eyeColors) vals.push(val);
        return vals;
    })(), values]
]

const throws = [
    () => eyeColors.red,
    () => eyeColors.brown = 'red',
    () => eyeColors.red = 'red',
    () => delete eyeColors.blue,
]

for(const [no, [actual, expected]] of equals.entries()){
    assert.deepStrictEqual(actual, expected, no);
}

for(const [no, test] of throws.entries()){
    assert.throws(test);
}

console.log("All is fine!")
