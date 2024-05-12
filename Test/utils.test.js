
 import { calculate } from "../js/utils";



describe("Unit Test claculate", () => {
    it("adds two numbers correctly", () => {
      expect(calculate(1, 1, '+')).toBe(2);
    });
});
describe("Unit Test claculate", () => {
    it("menys two numbers correctly", () => {
      expect(calculate(1, 1, '-')).toBe(0);
    });
});
describe("Unit Test claculate", () => {
    it("multip two numbers correctly", () => {
      expect(calculate(1, 1, '*')).toBe(1);
    });
});
describe("Unit Test claculate", () => {
    it("div two numbers correctly", () => {
      expect(calculate(1, 1, '/')).toBe(1);
    });
});
describe("Unit Test claculate", () => {
    it("div two numbers correctly", () => {
      expect(calculate(1, 1, '=')).toBe(undefined);
    });
});

 