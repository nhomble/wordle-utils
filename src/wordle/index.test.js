import { it } from "@jest/globals";
import { wordleTest, wordleSolution, isValidGuess } from "./index";

describe("2/8/22 game", () => {
  // elder
  const d = new Date("08 Feb 2022 00:00:00 GMT");
  const goal = wordleSolution(d);
  it("solution is elder", () => {
    expect(goal).toBe("elder");
  });
  it("total miss", () => {
    const out = wordleTest("aaaaa", goal);
    expect(out.correct).toHaveLength(0);
    expect(out.reorder).toHaveLength(0);
  });
  it("today on target", () => {
    const out = wordleTest(wordleSolution());
    expect(out.correct).toEqual([0, 1, 2, 3, 4]);
    expect(out.reorder).toHaveLength(0);
  });
  it("1 reorder", () => {
    const out = wordleTest("looks", goal);
    expect(out.correct).toHaveLength(0);
    expect(out.reorder).toEqual([0]);
  });
  it("reorder exhausted", () => {
    const out = wordleTest("lolll", goal);
    expect(out.correct).toHaveLength(0);
    expect(out.reorder).toEqual([0]);
  });
  it("mix", () => {
    const out = wordleTest("lllll", goal);
    expect(out.correct).toEqual([1]);
    expect(out.reorder).toEqual([0]);
  });

  it("the solution must be a valid guess", () => {
    expect(isValidGuess(goal)).toBeTruthy();
  });
  it("12345 cannot be a valid guess", () => {
    expect(isValidGuess("12345")).toBeFalsy();
  });
});

describe("nyt migration", () => {
  const d = new Date("15 Feb 2022 00:00:00 EST");
  const goal = wordleSolution(d);
  it("solution is aroma", () => {
    expect(goal).toBe("aroma");
  });
});
