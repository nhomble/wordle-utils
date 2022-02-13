import { solution, testWord, GuessResult as WordleResult } from "./wordle"
import { miss, reorder, correct } from "./fonts"
export const wordleSolution = solution
export const wordleTest = testWord
export const fonts = {
    "miss": miss,
    "reorder": reorder,
    "correct": correct
};