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
import { bubbleSort, selectionSort} from "../../utils/sortingArray/sortingArray"

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
