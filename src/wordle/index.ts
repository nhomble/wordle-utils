import {
  solution,
  testWord,
  GuessResult as WordleResult,
  isValidGuess,
} from "./wordle";
import { miss, reorder, correct } from "./fonts";
export const wordleSolution = solution;
export const wordleTest = testWord;
export { isValidGuess };
export const fonts = {
  miss: miss,
  reorder: reorder,
  correct: correct,
};
