/**
 * An exception that can be raised when a given
 * operation has not be implemented
 */
export class NotImplementedException extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "NotImplementedException";
    }
}