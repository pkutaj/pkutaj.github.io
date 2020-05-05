---
layout: post
title: javascript > setting up jest (unit test framework)
categories: [javascript]
---
## the case	of jest
the question is, how to start writing unit test in JavaScript — using jest

## toc
<!-- TOC -->

- [jest](#jest)
- [xUnit family](#xunit-family)
- [TAP: test anything protocol](#tap-test-anything-protocol)
- [xUNIT, TAP and Jest](#xunit-tap-and-jest)
- [STEP-1 init a folder with npm](#step-1-init-a-folder-with-npm)
- [STEP-2 install Jest globally](#step-2-install-jest-globally)
- [STEP-3 identify a test file](#step-3-identify-a-test-file)
- [STEP-4 empty block is a PASS](#step-4-empty-block-is-a-pass)
- [STEP-5 write a failing test](#step-5-write-a-failing-test)
- [STEP-5 basic functions and globals](#step-5-basic-functions-and-globals)
- [STEP-5 run jest: regex and realtime](#step-5-run-jest-regex-and-realtime)
- [STEP-6 exercise: reading code to extract test structure](#step-6-exercise-reading-code-to-extract-test-structure)
- [STEP-7 best practice: U.S.E Naming](#step-7-best-practice-use-naming)
- [STEP-8 using test suites with describe()](#step-8-using-test-suites-with-describe)
- [STEP-9 rule: no logic in unit tests](#step-9-rule-no-logic-in-unit-tests)
    - [STEP-10 link code and test files](#step-10-link-code-and-test-files)
- [STEP-11 VSCode setup](#step-11-vscode-setup)
- [sources](#sources)

<!-- /TOC -->

## findings
### jest
* open-source test framework by Facebook
* originally for front-end react components in JS

### xUnit family
* this family is the standard of unit testing framework
* the founding father is **SUnit** for smalltalk Unit
* JUnit is for Java, xUnit for C#, CPPUnit for C++, etc

though. If you were using “an XUnit framework”, you could also expect a specific structure in which the tests are built. This was usually

“Test Suite” that contains
“Fixtures” that contain
“Test Cases”.
And when these frameworks would run, they would output their results in the same structure as well, which was usually an XML file with a specific schema.

### TAP: test anything protocol
* reporting structure of test results
* initially part of Perl, with implementations in C, C++, Python, PHP, Java, JS, etc.
* in JS, **Tape** framework is the most well-known test framework to natively support the TAP protocol

### xUNIT, TAP and Jest
( o get jest test results to be easily recognized by most build tools, you can install npm modules such as *est-xunit (if you want TAP specific output, use jest-tap-reporter) and then use a special jest.config.js file in your project to configure jest to alter it reporting format.)

### STEP-1 init a folder with npm
* you need:
    * install **NODE.JS**
    * install **NPM**

* navigate to the folder of choice and run

STEP# | CODE             | COMMENT
------|------------------|----------------------------------
1     | `npm init --yes` | init npm with `package.json`
2     | `git init`       | init git repo; Jest relies on git

```
mkdir jest-test
cd jest-test
npm init --yes
git init
```

### STEP-2 install Jest globally
* or course, there are other options
* I install jest globally with and run `jest` command in any folder with tests directly in it

```
npm install -g jest
```

### STEP-3 identify a test file
* any file found in a directory `__tests__/*.js` is considered a test
* any file with `*.spec.js` and `*.test.js` anywere

### STEP-4 empty block is a PASS
* the following is an empty-block that runs as pass

```js
//2020-05-01.test.js
it("should PASS", () => {

});
```

![empty_test_passes]({{ site.url }}/assets/{{ site.url }}/assets/img000831.png)

### STEP-5 write a failing test
* the `add()` has not been defined yet

```js
it('should PASS', () => {
    expect(add(1, 1).toEqual(2))
});
```

* the breakdown of the failing report 🠋

STEP# | CODE                                      | COMMENT
------|-------------------------------------------|------------------------------------------------
1     | ` × should return addition (2ms)`         | list of failed test with `x`
2     | ` ReferenceError: add is not defined`     | difference between actual / expected
**3** | **DETAILED REPORT ON EXPECTATIONS**       |
3.1   | `> 2 |     expect(add(1, 1)).toEqual(2);` | pinpointing the place where the test failed
**4** | **REPORTS ON TESTS AND TIME**             |
4.1   | `Test Suites: 1 failed, 1 total`          | report on how many tests ran, failed and passed
4.2   | `Time:        1.95s, estimated 2s`        | report on time

```js
 FAIL  ./sum.spec.js
  × should return addition (2ms)        //1

  ● should return addition

    ReferenceError: add is not defined  //2

/* 3 */
      1 | it("should return addition", () => {  //3.1
    > 2 |     expect(add(1, 1)).toEqual(2);     
        |     ^
      3 | });

      at Object.<anonymous>.it (sum.spec.js:2:5)

//
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        1.95s, estimated 2s
```

### STEP-5 basic functions and globals

STEP# | CODE                     | COMMENT
------|--------------------------|----------------------------------------------------------------------------
1     | `it` — aka `test`        | method to which a function to be tested is is passed
2     | `describe` — aka `suite` | optional method for grouping "its`
3     | `require`                | method to import a function to be tested (commonJS syntax)
4     | `expect`                 | assertion function that calls the test — has many methods like `.toEqual()`


### STEP-5 run jest: regex and realtime
* run `jest` + regex patterns that should recognize filenames to test particular fioles
* run `jest --watch`
    * runs with the each save of the:
        * code file
        * test file

### STEP-6 exercise: reading code to extract test structure

```js
01: // password-verifier0.js
02:
03: const verifyPassword = (input, rules) => {
04:   const errors = [];
05:   rules.forEach(rule => {
06:     const result = rule(input);
07:     if (!result.passed) {
08:       errors.push(`error ${result.reason}`);
09:     }
10:   });
11:   return errors;
12: };
13: module.exports = { verifyPassword };
```


STEP#         | CODE                                                      | COMMENT
--------------|-----------------------------------------------------------|----------------------------------------------------------------------------
0             | `test('badly named test', () => {...`                     | jest test method, accepting the description
**1-ARRANGE** |                                                           | Scenario **SETUP**
1.1           | `const fakeRule = input => ({ passed: false,..`           | arrow function with input parameter always return object literal with false
1.2           | `..reason: ‘fake reason’ })`                              |
**2-ACT**     |                                                           | Invoke the **ENTRY POINT** with input
2.1           | `const errors = verifyPassword('any value', [fakeRule]);` |
**3-ASSERT**  |                                                           | Check the **EXIT POINT**
3.1           | `expect(errors[0]).toMatch('fake reason');`               |


```js
// password.verifier0.spec.js
1: const { verifyPassword } = require('../password-verifier0');
2:
3: test('badly named test', () => {
/* 1-ARRANGE */
4:   const fakeRule = input => ({ passed: false,
5:                               reason: ‘fake reason’ });
/* 2-ACT */
6:   const errors = verifyPassword('any value', [fakeRule]);
/* 3-ASSERT */
7:   expect(errors[0]).toMatch('fake reason');
8: });
```

### STEP-7 best practice: U.S.E Naming
* naming of tests is essential
* **WHY** 🠊 with the test failing, no comments are presented or the full code, just: 
    * the name of the test 
    * the name of the relevant section
* the name of the test should have **3 PIECES OF INFORMATION**


NAME  | COMMENT
------|------------------------------------------------
**U** | unit of work under text (function name)
**S** | scenario or inputs to the unit (failed rule)
**E** | expected behavior/exit point (returns an error)

```js
1: test(‘verifyPassword, given a failing rule, returns errors’, () => {
2:   const fakeRule = input => ({ passed: false, reason: ‘fake reason’ });
3:
4:   const errors = verifyPassword('any value', [fakeRule]);
5:   expect(errors[0]).toContain('fake reason');
6: });
```

### STEP-8 using test suites with describe()
* gives more structure around the test
* separates the three pieces of information from each other
* this way it easier to add multiple exit points in a single `describe()`


STEP#             | CODE                                 | COMMENT
------------------|--------------------------------------|---------------------------------------
**1-UNIT**        |                                      |
1.1               | `describe('verifyPassword', () => {` | function name in the describe "tissue"
**2-SCENARIO**    |                                      |
2.1               | `test('given a failing rule...`      | scenario in the `test()`
**3-EXPECTATION** |                                      |
3.1               | `..returns errors', () => {..`       | expectation in the `test()`

```js
// ch2/__tests__/password.verifier0.spec.js
/* 1-UNIT */
01: describe('verifyPassword', () => {
/* 2-SCENARIO; 3-EXPECTATION */
02:   test('given a failing rule, returns errors', () => {
03:     const fakeRule = input => //ARRANGE
04:         ({ passed: false, reason: ‘fake reason’ });
05: /* ACT */
06:     const errors = verifyPassword('any value', [fakeRule]);
07: /* ASSERT */
08:     expect(errors[0]).toContain('fake reason');
09:   });
10: });
```

### STEP-9 rule: no logic in unit tests
* avoid logic in unit tests
* no ifs, switches, loops
* the bug risk is too high

#### STEP-10 link code and test files
* you are in `node.js` when doing this
* you have to first **export** the function from the file with `module.exports =` 
* import the function into the test file with `require` 

STEP#      | CODE                                           | COMMENT
-----------|------------------------------------------------|---------------------------------------------------
**1_CODE** |                                                | `sum.js`
1.1        | `module.exports = add;`                        | at the end of the `.js` file, export it
**2_TEST** |                                                | `sum.test.js`
2.1        | `const sum = require("./sum")`                 | at the beginning of the `.test.js` file, import it
2.2        | `describe('sum', () => {`                      | **U** unit of work
2.3        | `test('given 2 numbers,..`                     | **S** scenario
2.4        | `..it should return their addition ', () => {` | **E** expected result
2.5        | `let num1 = 1;  let num2 = 2;`                 | **A**
2.6        | `const result = sum(num1,num2)`                | **A**
2.7        | `expect(result).toEqual(3);`                   | **A**

```js
/* sum.js */
function add(a,b) {
    return a+b
};

module.exports = add;   //1.1

/* sum.test.js */
const sum = require("./sum")    //2.1

describe('sum', () => {         //2.2
    test('given 2 numbers, it should return their addition ', () => {   //2.3-2.4
        
        /* 2.5 */
        let num1 = 1;
        let num2 = 2;
        
        /* 2.6 */
        const result = sum(num1,num2)
        
        /* 2.7 */
        expect(result).toEqual(3);

    });
});
```

### STEP-11 VSCode setup
* open `launch.json`

```json
{
            "name": "Debug Jest Tests",
            "type": "node",
            "request": "launch",
            "runtimeArgs": [
                "--inspect-brk",
                "C:\\Users\\Admin\\AppData\\Roaming\
pm\
ode_modules\\jest\\bin\\jest.js",
                "--runInBand",
                "-c",
                "${fileDirname}\\package.json",
            ],
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "port": 9229
        },,
```

* navigate to the folder with **CODE/TESTS**
* run `npm init --yes` to create a `package.json` config file for jest
    * this is a **CONSTRAINT FOR THE DEBUGGER** to look only for the tests in a given folder 
    * **NOTE** it is not enough to just navigate to the folder and run `jest` if you want to run all tests in a given folder 🠊 jest will traverse the whole tree from down from the nearest `package.json`





### sources
* [2 A first unit test - The Art of Unit Testing, Third Edition MEAP V02](https://livebook.manning.com/book/the-art-of-unit-testing-third-edition/chapter-2/v-2/9)
* <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions>
* [Introduction To Testing In JavaScript With Jest - YouTube](https://www.youtube.com/watch?v=FgnxcUQ5vho)
* [Jest CLI Options · Jest](https://jestjs.io/docs/en/cli.html)