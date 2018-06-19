/**
 * Creates an immutable set of string values.
 * @param  {string[]} values
 * @return {StringEnum}
 */
function StringEnum(...values) {

    // If values is a single array, then use its own values
    if(values.length === 1 && values[0] != undefined && values[0].constructor === Array)
    {
        values = values[0];
    }

    // If called with new, use 'this' as container, otherwise create a new object
    const _enum = new.target ? this : Object.create(StringEnum.prototype);

    const ESCAPE = '__';

    function own(_enum, elem) {
        return Object.getOwnPropertyDescriptor(_enum, elem);
    }

    // Populate the object
    for(let value of values)
    {
        // Only strings are allowed as values because.
        // 1- object member access convert all values to string, anyways.
        // 2- The StringEnum interface remains extensible to other types in the future.
        // NB: Values with spaces or non identifier compatible characters are still possible though less usable.
        if( typeof value !== "string" )
            throw new TypeError("Enum elements should be strings: " + value);
        if(own(_enum, value))
            throw new Error("Enum element already defined: " + value);
        if(value.startsWith(ESCAPE))
            throw new Error("Cannot define elements starting with '" + ESCAPE + "' like: " + value);
        _enum[value] = undefined;
    }

    // Handler for proxiing the object
    // This will make the enum immutable
    // All attempts to modify an existing value will raise an error.
    // Moreover, accessing a unexistant value will also raise an error.
    const handler = {
        get (target, key) {
            if(own(target, key))
                return key;
            if(typeof key === 'symbol')
                return target[key];
            if(key === "__proto__")
                return target.__proto__;
            if(key.startsWith(ESCAPE))
                return target.__proto__[key.slice(ESCAPE.length)];
            throw new ReferenceError(`Undefined enum property: ${key}`);
        },
        set (target, key, value) {
            void value; // arg not used
            if(own(target,key))
                throw new TypeError(`Cant modify enum property: ${key}`);
            else
                throw new TypeError(`Cant define new enum property: ${key}`);
        },
        defineProperty(target, key, descriptor) {
            void descriptor;
            handler.set(target, key, undefined);
        },
        deleteProperty (target, key) {
            void target; // arg not used
            throw new TypeError(`Cant delete enum property: ${key}`);
        },
        has (target, key) {
            return !!own(target, key);
        },
    };
    return new Proxy( _enum, handler);
};

// Enum elements can be iterated like an Array
StringEnum.prototype[Symbol.iterator] = function*() {
    for(const e in this) yield this[e];
};
