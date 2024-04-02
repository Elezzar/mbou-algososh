export const DELAY_IN_MS = 1000;
export const SHORT_DELAY_IN_MS = 500;

export const setDelay = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
