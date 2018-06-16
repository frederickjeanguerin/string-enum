/**
 * Creates an immutable set of string values.
 * @param  {string[]} values 
 * @return {StringEnum}
 */
function StringEnum(...values) {

    // If values is a single array, then use its own values
    if(values.length === 1 && values[0].constructor === Array)
    {
        values = values[0];
    }

    // If called with new, use 'this' as container, otherwise create a new object
    const _enum = new.target ? this : Object.create(StringEnum.prototype);

    // Populate the object
    for(let value of values)
    {
        _enum[value] = value;
    }

    // Handler for proxiing the object
    // This will make the enum immutable
    // All attempts to modify an existing value will raise an error.
    // Moreover, accessing a unexistant value will also raise an error.
    const handler = {
        get (target, key) {
            if(key in target)
                return target[key];
            else if (typeof key !== 'symbol')
                throw new ReferenceError(`Undefined enum property: ${key}`);
        },
        set (target, key, value) {
            void value; // arg not used
            if(key in target)
                throw new TypeError(`Cant modify enum property: ${key}`);
            else
                throw new TypeError(`Cant define new enum property: ${key}`)                ;
        },
        deleteProperty (target, key) {
            void target; // arg not used
            throw new TypeError(`Cant delete enum property: ${key}`);
        }
    };
    return new Proxy( _enum, handler);
};

// Enum elements can be iterated like an Array
StringEnum.prototype[Symbol.iterator] = function*() {
    for(const e in this) yield this[e];
};

// Export only in Node
if (typeof module === 'object' && module.exports)
{
    module.exports = StringEnum;
}

// Some easy tests
if (typeof require !== 'undefined' && require.main === module)
{
    const e = StringEnum(1, -2);
    console.log(
        e[1] === 1,
        e[-2] === -2,
        // {...e},
        Object.keys(e),
        Object.values(e),
        Object.entries(e),
        Object.prototype.hasOwnProperty.call(e, "1"),
        Object.prototype.hasOwnProperty.call(e, "2") === false
    );
    console.log(
        e.constructor === StringEnum,
        "1" in e,
        [...e]
    );

}
