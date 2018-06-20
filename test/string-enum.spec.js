const chai = require('chai');
const expect = chai.expect;

const values = ['aa', 'bb'];
const StringEnum = require('../dist/string-enum');

const enums = [
    // Create enum directly
    StringEnum(values),
    // Create enum with new
    new StringEnum(values),
    // Create enum with a list or args
    StringEnum(...values),
];

describe('String Enum', function() {

    it('Enum elements are readable and equals to themselves', function() {
        for(const e of enums) {
            expect(e.aa).eq('aa');
            expect(e['aa']).eq('aa');
            expect(e.bb).eq('bb');
        }
    });

    it('Enum elements cant be modified, deleted or created', function() {
        for(const e of enums) {
            // Modification
            expect( () => (e.aa = "") ).throw(TypeError, 'modify');
            // Deletion
            expect( () => (delete e.aa) ).throw(TypeError, 'delete');
            // Creation
            expect( ()=>e.new_elem = "" ).throw(TypeError, 'define');
            // Via Object
            expect( () => (Object.defineProperty(e, 'aa', Object.getOwnPropertyDescriptor(e, 'aa'))) ).throw(TypeError, 'modify');
        }
    });

    it('Inexistant enum elements raise error', function() {
        for(const e of enums) {
            expect(()=>e.does_not_exist).throw(ReferenceError);
        }
    });

    it('Enum elements are iterable', function() {
        for(const e of enums) {
            // ... spread working but eslint unhappy with new syntax
            // expect({...enums[0]}).eql({...enums[1]}).eql({...enums[2]});

            expect(e[Symbol.iterator]).not.undefined;

            // Enums key are object iterable
            let keys = [];
            for(const key in e){
                keys.push(key);
            }
            expect(keys).eql(values);
            expect(Object.keys(e)).eql(keys);

            // Enums key are array iterable
            let vals = [];
            for(const val of e){
                vals.push(val);
            }
            expect(vals).eql(values);
            expect(Object.values(e)).eql(values);
            expect([...e]).eql(values);

        }

    });

    it('Enum of non string elements raise errors', function() {
        expect(()=>StringEnum(1, -2)).throw(TypeError);
        expect(()=>StringEnum(undefined, undefined)).throw(TypeError);
        expect(()=>StringEnum(null, null)).throw(TypeError);
    });

    it('Enum object are StringEnum', function() {
        for(const e of enums){
            expect(e).instanceof(StringEnum);
            expect(e.__proto__).eq(StringEnum.prototype);
            expect(e.__proto__.constructor).eq(StringEnum);
        }
    });

    it('Enum elements defined more than once raise errors', function() {
        expect(()=>StringEnum('a', 'b', 'c', 'a')).throw(Error, 'already defined');
    });

    it('Enum elements overriding internal object properties are just fine', function() {
        const specialNames = ['constructor', 'hasOwnProperty'];
        const specials = StringEnum(specialNames);
        for(const name of specialNames){
            expect(specials[name]).eq(name);
            expect(name in specials).true;
        }
    });

    it('Special methods are still available, if not overridden', function() {
        for(const e of enums)
        {
            expect(e.constructor).eq(StringEnum);
            expect(e.__proto__).eq(StringEnum.prototype);
            expect(e.hasOwnProperty('aa')).true;

            // Automatic conversion
            expect(e + "").eq({}+"");
            expect(+e).NaN;
        }
    });

    it('in operator', function() {
        for(const e of enums)
        {
            for(const v of values) {
                expect(v in e).true;
            }
            expect('not there' in e).false;
            expect('constructor' in e).false;
            expect('hasOwnProperty' in e).false;
            expect('__proto__' in e).false;
        }
    });


});
