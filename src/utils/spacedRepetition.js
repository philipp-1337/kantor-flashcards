// Spaced Repetition Algorithmus
export function calculateNextInterval(difficulty, currentInterval, easeFactor) {
  let newInterval = currentInterval;
  let newEaseFactor = easeFactor;

  switch (difficulty) {
    case 0: // Wieder
      newInterval = 1;
      newEaseFactor = Math.max(1.3, easeFactor - 0.2);
      break;
    case 1: // Schwer
      newInterval = Math.max(1, Math.round(currentInterval * 1.2));
      newEaseFactor = Math.max(1.3, easeFactor - 0.15);
      break;
    case 2: // Gut
      newInterval = Math.round(currentInterval * easeFactor);
      break;
    case 3: // Einfach
      newInterval = Math.round(currentInterval * easeFactor * 1.3);
      newEaseFactor = easeFactor + 0.15;
      break;
    default:
      break;
  }

  return { newInterval, newEaseFactor };
}
