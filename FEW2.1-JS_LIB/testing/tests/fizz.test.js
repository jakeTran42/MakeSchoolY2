const fizzbuzz = require('../fizzbuzz')

test("is divisible by 3", () => {
    expect(fizzbuzz.isFizzy(1)).toBe(false);
    expect(fizzbuzz.isFizzy(2)).toBe(false);
    expect(fizzbuzz.isFizzy(3)).toBe(true);
    expect(fizzbuzz.isFizzy(6)).toBe(true);
})

test("is divisible by 5", () => {
    expect(fizzbuzz.isBuzzy(1)).toBe(false);
    expect(fizzbuzz.isBuzzy(3)).toBe(false);
    expect(fizzbuzz.isBuzzy(5)).toBe(true);
    expect(fizzbuzz.isBuzzy(10)).toBe(true);
})

test("fizz if 3, buzz if 5, fizzbuzz if both", () => {
    expect(fizzbuzz.fizzyBuzzy(1)).toEqual('');
    expect(fizzbuzz.fizzyBuzzy(17)).toEqual('');
    expect(fizzbuzz.fizzyBuzzy(3)).toEqual('fizz');
    expect(fizzbuzz.fizzyBuzzy(5)).toEqual('buzz');
    expect(fizzbuzz.fizzyBuzzy(15)).toEqual('fizzbuzz');
})

test("fizzbuzz objects", () => {
    expect(fizzbuzz.fizzBuzz(1)).toMatchObject({ count: 1, fizz: 0, buzz: 0, fizzBuzz: 0 });
    expect(fizzbuzz.fizzBuzz(3)).toMatchObject({ count: 3, fizz: 1, buzz: 0, fizzBuzz: 0 });
    expect(fizzbuzz.fizzBuzz(5)).toMatchObject({ count: 5, fizz: 1, buzz: 1, fizzBuzz: 0 });
    expect(fizzbuzz.fizzBuzz(15)).toMatchObject({ count: 15, fizz: 4, buzz: 2, fizzBuzz: 1 });
})