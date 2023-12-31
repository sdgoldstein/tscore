import {ErrorNormalizingWrapper} from "@src/errorNormalizingWrapper";
import {beforeEach, expect, expectTypeOf, test} from "vitest";

let wrappedError: Error;
let wrapperToTest: ErrorNormalizingWrapper;

beforeEach(() => {
    wrappedError = new Error("Error message");
    wrappedError.name = "testName";

    wrapperToTest = new ErrorNormalizingWrapper(wrappedError);
});

test("ErrorNormalizingWrapper - test constructor", () => {
    // This seems useless?  Anything else we can verify?
    expectTypeOf(wrapperToTest).toEqualTypeOf<ErrorNormalizingWrapper>();
    expectTypeOf(wrapperToTest).toMatchTypeOf<Error>();
});

test("ErrorNormalizingWrapper - test getWrappedError",
     () => { expect(wrapperToTest.wrappedError).toBe(wrappedError); });

test("ErrorNormalizingWrapper - test get name", () => {
    // Test default behavior
    expect(wrapperToTest.name, "Default get name").toBe(wrappedError.name);

    // Test with object instead of an Error
    const object = {name : "ObjectTestName"};
    wrapperToTest = new ErrorNormalizingWrapper(object);
    expect(wrapperToTest.name, "Default get name from object").toBe(object.name);

    // Test if error object does not have a name property
    const anotherObject = {foo : "foo"};
    wrapperToTest = new ErrorNormalizingWrapper(anotherObject);
    expect(wrapperToTest.name, "Default get name from object with no name property").toBe(String(object));
});

test("ErrorNormalizingWrapper - test message and getErrorMessage", () => {
    // Test default behavior
    expect(wrapperToTest.message, "Default message").toEqual(wrappedError.message);
    expect(wrapperToTest.getErrorMessage(), "Default getErrorMessage").toEqual(wrappedError.message);

    // test when no messsage provided to original error
    const expectedMessage = "Unknown Error";
    wrappedError = new Error();
    wrapperToTest = new ErrorNormalizingWrapper(wrappedError);
    expect(wrapperToTest.message, "Default Unknown Error - .message").toEqual(expectedMessage);
    expect(wrapperToTest.getErrorMessage(), "Default Unknown Error - getErrorMessage").toEqual(expectedMessage);

    // Test with object instead of an Error
    let object = {message : "Object Message"};
    wrapperToTest = new ErrorNormalizingWrapper(object);
    expect(wrapperToTest.message, "From Object - .message").toEqual(object.message);
    expect(wrapperToTest.getErrorMessage(), "From Object - getErrorMessage").toEqual(object.message);

    object = {message : ""};
    wrapperToTest = new ErrorNormalizingWrapper(object);
    expect(wrapperToTest.message, "From Object empty message - .message").toEqual(expectedMessage);
    expect(wrapperToTest.getErrorMessage(), "From Object empty message - getErrorMessage").toEqual(expectedMessage);

    const objectNullMessage = {message : null};
    wrapperToTest = new ErrorNormalizingWrapper(objectNullMessage);
    expect(wrapperToTest.message, "From Object null message - .message").toEqual(expectedMessage);
    expect(wrapperToTest.getErrorMessage(), "From Object null message - getErrorMessage").toEqual(expectedMessage);

    // test when no messsage provided to original error
    const anotherObject = {foo : "foo"};
    wrapperToTest = new ErrorNormalizingWrapper(anotherObject);
    expect(wrapperToTest.message, "From Object no message - .message").toEqual(expectedMessage);
    expect(wrapperToTest.getErrorMessage(), "From Object no message - getErrorMessage").toEqual(expectedMessage);

    // Test providing default to getErrorMessage
    expect(wrapperToTest.getErrorMessage("Test Error Message"), "Passing default error messsage to getErrorMessage()")
        .toEqual("Test Error Message");
});

// FIXME - Error.stack is non-standard and overidding it does not seem to be working
test("ErrorNormalizingWrapper - test getStack", () => {
    // Test default behavior
    expect(wrapperToTest.stack, "Default stack").toEqual(wrappedError.stack);

    // Test with object instead of an Error
    let object = {stack : "Object Stack"};
    wrapperToTest = new ErrorNormalizingWrapper(object);
    expect(wrapperToTest.stack, "From Object").toEqual(object.stack);

    object = {stack : ""};
    wrapperToTest = new ErrorNormalizingWrapper(object);
    expect(wrapperToTest.message, "From Object empty stack").toBeUndefined();

    const objectNullMessage = {message : null};
    wrapperToTest = new ErrorNormalizingWrapper(objectNullMessage);
    expect(wrapperToTest.message, "From Object null stack").toBeUndefined();

    // test when no messsage provided to original error
    const anotherObject = {foo : "foo"};
    wrapperToTest = new ErrorNormalizingWrapper(anotherObject);
    expect(wrapperToTest.message, "From Object no stack").toBeUndefined();
});