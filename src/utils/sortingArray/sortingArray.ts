import { TSorterItem } from "../../types/types";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS, setDelay } from "../../constants/delays";

const swap = (array: TSorterItem[], firstElement: number, secondElement: number): void => {
  [array[firstElement], array[secondElement]] = [array[secondElement], array[firstElement]];
};

const compareItems = (direction: Direction, firstItem: number, secondItem: number): boolean => {
  return direction === Direction.Ascending ? firstItem > secondItem : firstItem < secondItem;
};

export const bubbleSort = async (array: TSorterItem[], direction: Direction, setArray: React.Dispatch<React.SetStateAction<TSorterItem[]>>): Promise<void> => {
  let arrayLength = array.length;
  for (let i = 0; i < arrayLength; i++) {
    for (let j = 0; j < arrayLength - i - 1; j++) {
      array[j].state = ElementStates.Changing;
      array[j + 1].state = ElementStates.Changing;
      setArray([...array]);

      await setDelay(SHORT_DELAY_IN_MS);

      if (compareItems(direction, array[j].value, array[j + 1].value)) {
        swap(array, j, j + 1);
      }
      array[j].state = ElementStates.Default;
      array[j + 1].state = ElementStates.Default;
    }
    array[arrayLength - i - 1].state = ElementStates.Modified;
    setArray([...array]);
  }
}

export const selectionSort = async (array: TSorterItem[], direction: Direction, setArray: React.Dispatch<React.SetStateAction<TSorterItem[]>>): Promise<void> => {
  let arrayLength = array.length;
  for (let i = 0; i < arrayLength - 1; i++) {
    let elementIndex = i;
    array[elementIndex].state = ElementStates.Changing;

    for (let j = i + 1; j < arrayLength; j++) {
      array[j].state = ElementStates.Changing;
      setArray([...array]);
      await setDelay(SHORT_DELAY_IN_MS);

      if (j > i +1) array[j - 1].state = ElementStates.Default;

      if (compareItems(direction, array[j].value, array[elementIndex].value)) {
        array[elementIndex].state = ElementStates.Default;
        elementIndex = j;
        array[elementIndex].state = ElementStates.Changing;
      }
    }

    if (i !== elementIndex) {
      swap(array, i, elementIndex);
    }
    
    array[i].state = ElementStates.Modified;

    if (elementIndex !== i) array[elementIndex].state = ElementStates.Default;

    array.forEach((element, index) => {
      if (index > i && index !== elementIndex) {
        element.state = ElementStates.Default;
      }

      setArray([...array]);
    })
  }

  array.forEach(el => el.state = ElementStates.Modified);
  setArray([...array]); 
} 