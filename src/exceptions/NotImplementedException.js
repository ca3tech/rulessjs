"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementedException = void 0;
/**
 * An exception that can be raised when a given
 * operation has not be implemented
 */
class NotImplementedException extends Error {
    constructor(message) {
        super(message);
        this.name = "NotImplementedException";
    }
}
exports.NotImplementedException = NotImplementedException;
