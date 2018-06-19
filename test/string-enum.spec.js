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
            expect( () => (e.aa = "") ).throw(TypeError);
            // Deletion
            expect( () => (delete e.aa) ).throw(TypeError);
            // Creation
            expect( ()=>e.new_elem = "" ).throw(TypeError);
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
            for(const k of keys) {
                expect(k in e).true;
            }

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

    it('Enum inheritance', function() {
        for(const e of enums){
            expect(e).instanceof(StringEnum);
        }
    });

    it('Enum elements defined more than once raise errors', function() {
        expect(()=>StringEnum('a', 'b', 'c', 'a')).throw(Error, 'already defined');
    });

    it('Enum elements overriding internal object properties raise errors', function() {
        for(const specialProp of ['constructor', '__proto__', 'hasOwnProperty' ])
        {
            expect(()=>StringEnum('a', specialProp )).throw(Error, 'special', specialProp);
        }
    });

    it('Special methods are still available', function() {
        for(const e of enums)
        {
            expect(e.constructor).eq(StringEnum);
            expect(e.__proto__).eq(StringEnum.prototype);
            expect(e.hasOwnProperty('aa')).true;
            expect(e.hasOwnProperty).eq(Object.prototype.hasOwnProperty);
        }
    });


});
