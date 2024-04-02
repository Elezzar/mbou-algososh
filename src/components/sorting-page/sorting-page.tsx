import { useEffect, useState } from "react";

import Style from "./sorting-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Column } from "../ui/column/column";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";

import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { TSorterItem, TRandomNumberArray, SortMethod } from "../../types/types";

import { generateRandomNumberArray } from "../../utils/generateRandomArray/generateRandomArray";
import { SHORT_DELAY_IN_MS, setDelay } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [array, setArray] = useState<TSorterItem[]>([]);
  const [sorting, setSorting] = useState<SortMethod>(SortMethod.Bubble);
  const [ activeButton, setActiveButton ] = useState<string | null>(null);

  const getRandomArray = () => {
    setArray(generateRandomNumberArray({
      minLength: 3,
      maxLength: 17,
      minValue: 0,
      maxValue: 100
    } as TRandomNumberArray).map((number: number): TSorterItem => {
      return {
        value: number,
        state: ElementStates.Default
      };
    }))};

  const swap = (array: TSorterItem[], firstElement: number, secondElement: number): void => {
    [array[firstElement], array[secondElement]] = [array[secondElement], array[firstElement]];
  };

  const compareItems = (direction: Direction, firstItem: number, secondItem: number): boolean => {
    return direction === Direction.Ascending ? firstItem > secondItem : firstItem < secondItem;
  };

  const bubbleSort = async (array: TSorterItem[], direction: Direction, setArray: React.Dispatch<React.SetStateAction<TSorterItem[]>>): Promise<void> => {
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

  const selectionSort = async (array: TSorterItem[], direction: Direction, setArray: React.Dispatch<React.SetStateAction<TSorterItem[]>>): Promise<void> => {
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
        if (index > i && index < elementIndex) {
          element.state = ElementStates.Default;
        }

        setArray([...array]);
      })
    }
  }

  const handleSort = async (direction: Direction) => {
    setActiveButton(direction);
    setLoading(true);
    if (sorting === SortMethod.Bubble) {
      await bubbleSort([...array], direction, setArray);
    } else {
      await selectionSort([...array], direction, setArray);
    }
    setLoading(false);
  }

  useEffect(() => {
    getRandomArray();
  }, []);


  return (
    <SolutionLayout title="Сортировка массива">
      <section>
        <form className={Style.form}>
          <div className={Style.containerInputs}>
            <RadioInput 
              label="Выбор"
              type="radio"
              checked={sorting === SortMethod.Selection}
              onChange={() => {setSorting(SortMethod.Selection)}}
            />
            <RadioInput 
              label="Пузырёк"
              type="radio"
              checked={sorting === SortMethod.Bubble}
              onChange={() => {setSorting(SortMethod.Bubble)}}           

            />
          </div>
          <div className={Style.containerButtons}>
            <Button 
              text="По возрастанию"
              type="button"
              sorting={Direction.Ascending}
              onClick={() => handleSort(Direction.Ascending)}
              isLoader={activeButton === Direction.Ascending && isLoading}
              disabled={isLoading && activeButton !== Direction.Ascending}
            />
            <Button 
              text="По убыванию"
              type="button"
              sorting={Direction.Descending}
              onClick={() => handleSort(Direction.Descending)}
              isLoader={activeButton === Direction.Descending && isLoading}
              disabled={isLoading && activeButton !== Direction.Descending}
            />
          </div>
            <Button 
              text="Новый массив"
              style={{ width: "205" }}
              onClick={getRandomArray}
            />
        </form>
        <ul className={Style.list}>
          {array.map((number, index) =>(
            <li className={Style.item} key={index}>
              <Column 
                index={number.value} 
                key={index} 
                state={number.state} />
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
