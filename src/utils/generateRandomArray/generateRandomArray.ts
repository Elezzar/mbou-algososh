import { TRandomNumberArray } from "../../types/types";

export function generateRandomNumberArray({minLength, maxLength, minValue, maxValue}: TRandomNumberArray): number[] {
  const length: number = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  
  const array: number[] = [];
  
  for (let i: number = 0; i < length; i++) {
    const randomValue: number = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    array.push(randomValue); 
  }

  return array;
}