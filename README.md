# Assignment 2: Secure Web Programming and Node.js, Question 2 (vending machine)

> Consider the following JavaScript code for the vending machine we did in class.  The design and implementation are rife with bad practices.  Please do the following:
> 1. Identify all issues and explain why they can present security concerns.  Explain the fix. Please upload your document as a PDF file.
> 2. Fix all of the issues and submit the corrected .js file.

## Introduction to JavaScript and Secure Coding

### Issue 1: All numbers are internally represented using double-precision 64-bit format (IEEE 754)

Security Concern: mathematical calculation errors

Fix: Use [big-js](http://mikemcl.github.io/big.js/) library (and/or convert decimals to integers prior to performing mathematical calculations)

Open Terminal

```shell
cd vending_machine/
```

Install big.js

```shell
npm install big.js
```

Use big-js on any floating point variables.



### Issue 2: Passing Invalid arguments to parseInt or parseFloat

Security Concern: Will lead to incorrect math calculations, allows program input to be exploited.

Fix:  Validate User input

Use [`readlineSync.questionFloat()`](https://github.com/anseki/readline-sync#questionfloat) for float inputs. Readline-sync has more available [utility methods](https://github.com/anseki/readline-sync#utility-methods).





## More Secure Coding

## XSS

Issue:

Security Concern:

Fix:
