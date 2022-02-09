import { words } from "./words";

const millisInDay = 864e5;
const today = new Date()

function solutionId(date: Date = today): number {
  const start = new Date(2021, 5, 19, 0, 0, 0, 0);
  const diff = date.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
  return Math.round(diff / millisInDay);
}

export const solution = function (date: Date): string {
  const id = solutionId(date);
  const idx = id % words.length;
  return words[idx];
};
