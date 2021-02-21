# rulessjs
Javascript (Typescript) rules engine package

## Introduction
This package provides a means to apply one or more tests to
each record of an array and add the results of the tests to
those records. A single class, Model, is provided for this purpose.
The Model constructor takes the definition of the tests to
perform and the output to produce. Once created you then
pass your data as an array of records to the objects apply method.

## Usage

### Example 1
The following shows a simple example of applying rules to data
where each attribute value of each record is atomic.

```typescript
import { Model } from "rulessjs";

const def = {
    condition1: {
        "=": {
            attr: "col1",
            value: 1
        },
        output: {
            true: "PASS",
            false: "FAIL"
        }
    },
    condition2: {
        "=": {
            attr: "col2",
            value: 1
        },
        output: {
            name: "newattr",
            true: "PASS",
            false: "FAIL"
        }
    },
    condition3: {
        "and" : [
            {
                "=": {
                    attr: "condition1",
                    value: "PASS"
                }
            },
            {
                "=": {
                    attr: "newattr",
                    value: "PASS"
                }
            }
        ],
        output: {
            true: "PASS",
            false: "FAIL"
        }
    }
};
const model = new Model(def);
const data = [
    {col1: 1, col2: 1, expect: "PASS"},
    {col1: 1, col2: 2, expect: "FAIL"}
];
const results = model.apply(data);
```

In this example we expect that *results*:
+ will have the same number of records as *data*
+ all records will have the following new attributes added to data
    + condition1
    + newattr
    + condition3
+ will have the following values assigned to the record at index 0
    + condition1: PASS
    + newattr: PASS
    + condition3: PASS
+ will have the following values assigned to the record at index 1
    + condition1: PASS
    + newattr: FAIL
    + condition3: FAIL

### Example 2
The following shows a simple example of applying rules to data
where an attribute value of each record is an array.

```typescript
import { Model } from "rulessjs";

const def = {
    condition1: {
        "=": {
            attr: "col1",
            value: 1
        },
        output: {
            true: "PASS",
            false: "FAIL"
        }
    },
    condition2: {
        "any": {
            "=": {
                attr: "col2",
                value: 1
            }
        },
        output: {
            name: "newattr",
            true: "PASS",
            false: "FAIL"
        }
    },
    condition3: {
        "and" : [
            {
                "=": {
                    attr: "condition1",
                    value: "PASS"
                }
            },
            {
                "=": {
                    attr: "newattr",
                    value: "PASS"
                }
            }
        ],
        output: {
            true: "PASS",
            false: "FAIL"
        }
    }
};
const model = new Model(def);
const data = [
    {col1: 1, col2: [1, 2, 3], expect: "PASS"},
    {col1: 1, col2: [2, 3, 4], expect: "FAIL"}
];
const results = model.apply(data);
```

In this example we expect that *results*:
+ will have the same number of records as *data*
+ all records will have the following new attributes added to data
    + condition1
    + newattr
    + condition3
+ will have the following values assigned to the record at index 0
    + condition1: PASS
    + newattr: PASS
    + condition3: PASS
+ will have the following values assigned to the record at index 1
    + condition1: PASS
    + newattr: FAIL
        + This is because none of the elements of col2 are equal to 1
    + condition3: FAIL
