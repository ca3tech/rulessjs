import { FunctionFactory } from "./FunctionFactory";
import {TestValue} from "./TestContracts";

export class TestFunctionFactory extends FunctionFactory {
    constructor() {
        super({
            "=": equal,
            "!=": notequal,
            ">": greater,
            ">=": greaterOrEqual,
            "<": lesser,
            "<=": lesserOrEqual
        });
    }
}

function equal(obj : any, attr : string, expect : TestValue) : boolean {
    if(expect instanceof Date) {
        return obj[attr].getTime() == expect.getTime();
    }
    return obj[attr] == expect;
}

function notequal(obj : any, attr : string, expect : TestValue) : boolean {
    return ! equal(obj, attr, expect);
}

function greater(obj : any, attr : string, expect : TestValue) : boolean {
    if(expect instanceof Date) {
        return obj[attr].getTime() > expect.getTime();
    }
    return obj[attr] > expect;
}

function greaterOrEqual(obj : any, attr : string, expect : TestValue) : boolean {
    return greater(obj, attr, expect) || equal(obj, attr, expect);
}

function lesser(obj : any, attr : string, expect : TestValue) : boolean {
    return ! (greater(obj, attr, expect) || equal(obj, attr, expect));
}

function lesserOrEqual(obj : any, attr : string, expect : TestValue) : boolean {
    return lesser(obj, attr, expect) || equal(obj, attr, expect);
}