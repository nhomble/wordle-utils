import { words } from "./words";

const millisInDay = 864e5;
const today = new Date()

function solutionId(date: Date): number {
  const start = new Date(2021, 5, 19, 0, 0, 0, 0);
  const diff = date.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
  return Math.round(diff / millisInDay);
}

export const solution = function (date: Date = today): string {
  const id = solutionId(date);
  const idx = id % words.length;
  return words[idx];
};

export type GuessResult = {
  correct: number[];
  reorder: number[];
}

export const testWord = function (guess: string, goal: string = null): GuessResult {
  if (goal === null) {
    goal = solution();
  }
  if ( !guess || guess.length > 5) {
    return {
      correct: [],
      reorder: []
    };
  }

  const freq = new Map();
  for (var i = 0; i < goal.length; i++) {
    var n = freq.get(goal.charAt(i));
    n = n === undefined ? 1 : n + 1;
    freq.set(goal.charAt(i), n);
  }

  const correct = [];
  const reorder = [];
  for (var i = 0; i < goal.length; i++) {
    if (goal.charAt(i) === guess.charAt(i)) {
      correct.push(i);
      var n = freq.get(guess.charAt(i));
      n -= 1;
      freq.set(guess.charAt(i), n);
    } else {
      var n = freq.get(guess.charAt(i));
      n = n === undefined ? 0 : n;
      if (n > 0) {
        reorder.push(i);
      }
      n -= 1;
      freq.set(guess.charAt(i), n);
    }
  }

  return {
    correct: correct,
    reorder: reorder
  }
};