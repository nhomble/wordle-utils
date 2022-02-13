import { it } from "@jest/globals";
import { solution } from "./wordle";

describe("previous solution", () => {
  it("solution for 2/8 is elder", () => {
    const d = new Date("08 Feb 2022 00:00:00 GMT");
    expect(solution(d)).toBe("elder");
  });
});
