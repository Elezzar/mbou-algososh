import { bubbleSort, selectionSort } from "./sortingArray";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { TSorterItem } from "../../types/types";

describe('Алгоритмы сортировки', () => {
  const createArray = (numbers: number[]): TSorterItem[] => 
    numbers.map(value => ({ value, state: ElementStates.Default }));

  const mockSetArray = jest.fn();

  beforeEach(() => {
    mockSetArray.mockClear();
  });

  const testSorting = (func: typeof bubbleSort | typeof selectionSort, method: string) => {
    describe(`Сортировка методом ${method}`, () => {
      it.each([
        {direction: Direction.Ascending, arr: [], sorted: []},
        {direction: Direction.Ascending, arr: [1], sorted: [1], state: ElementStates.Modified},
        {direction: Direction.Ascending, arr: [3, 1, 2], sorted: [1, 2, 3], state: ElementStates.Modified},
        {direction: Direction.Descending, arr: [1], sorted: [1], state: ElementStates.Modified},
        {direction: Direction.Descending, arr: [1, 3, 2], sorted: [3, 2, 1], state: ElementStates.Modified},
      ])('для массива %s работает корректно', async ({direction, arr, sorted, state}) => {
        const array = createArray(arr);

        await func(array, direction, mockSetArray);

        const result = array.map(item => item.value);
        expect(result).toEqual(sorted);
        
        if (arr.length > 0) {
          expect(array[0].state).toEqual(state);
        }
      })
    }) 
  }

  testSorting(bubbleSort, 'Bubble');
  testSorting(selectionSort, 'Selection');  
})  