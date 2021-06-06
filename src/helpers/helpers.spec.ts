import * as helper from "./helpers";

describe("Test function replaceSpecialCharacters", () => {
  it("should replace special characters ", () => {
    let newString = helper.replaceSpecialCharacters(
      "&#39;",
      "This is a &#39; test"
    );
    expect(newString).toBe("This is a ' test");
  });
});

describe("Test function returnFilteredArrayFromString", () => {
  it("should return array with only 1 split if passed only 2 argument", () => {
    let filteredArray = helper.returnFilteredArrayFromString(
      "Hello,This,is,a,test",
      ","
    );
    expect(filteredArray).toEqual(["Hello", "This", "is", "a", "test"]);
  });
  it("should return array with 2 split if passed only 3 argument", () => {
    let filteredArray = helper.returnFilteredArrayFromString(
      "Hel;lo,Th;is,is,a,te;st",
      ",",
      ";"
    );
    expect(filteredArray).toEqual([
      "Hel",
      "lo",
      "Th",
      "is",
      "is",
      "a",
      "te",
      "st",
    ]);
  });
  it("should return array with 2 split and greater than length if passed all arguments", () => {
    let filteredArray = helper.returnFilteredArrayFromString(
      "Hel;lo,Th;is,is,a,te;st",
      ",",
      ";",
      1
    );
    expect(filteredArray).toEqual(["Hel", "lo", "Th", "is", "is", "te", "st"]);
  });
  it("should return array with 1 split and great than length", () => {
    let filteredArray = helper.returnFilteredArrayFromString(
      "Hello,This,is,a,test",
      ",",
      undefined,
      2
    );
    expect(filteredArray).toEqual(["Hello", "This", "test"]);
  });
});
