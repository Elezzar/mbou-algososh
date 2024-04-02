export default function getFibonacciNumbers(index: number, memo: Record<number, number> = {0: 0, 1: 1}): number {
  // if (index < 0) {
  //   throw new Error('Index cannot be less than 0');
  // }
  // на случай, если 0 тоже нужно будет обрабатывать, включая его в вычисления
  // заменит index <= 1

  if (index <= 1) {
    return 1
  }

  if (!(index in memo)) {
    memo[index] = getFibonacciNumbers(index - 1, memo) + getFibonacciNumbers(index - 2, memo);
  }

    return memo[index];
}

