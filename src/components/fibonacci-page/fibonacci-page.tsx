import { useState, FormEventHandler, ChangeEvent } from "react";

import getFibonacciNumbers from "../../utils/fibonacci/fibonacci";
import { setDelay, SHORT_DELAY_IN_MS } from "../../constants/delays";

import Style from "./fibonacci-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [fibonacciValue, setFibonacciValue] = useState<number[]>([]);

  const calculateFibonacciNumber = async (index: number | undefined) => {
    setFibonacciValue([]);
    for (let i = 0; index && i <= index; i++) {
      const result = getFibonacciNumbers(i);
      setFibonacciValue(prev => [...prev, result]);
      await setDelay(SHORT_DELAY_IN_MS)
    }
  };

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await calculateFibonacciNumber(inputValue);
    setLoading(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section>
        <form className={Style.form} onSubmit={submitHandler}>
          <Input
            style={{width: 377, height: 60}} 
            type="number"
            isLimitText={true}
            maxLength={2}
            min={1}
            max={19}
            value={inputValue === 0 ? "" : inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(parseInt(e.target.value))}
            data-test="input"
          />
          <Button 
            style={{width: 300}}
            text="Рассчитать"
            type="submit"
            isLoader={loading}
            disabled={!inputValue || inputValue > 19}
            data-test="submit"
          />
        </form>
        <ul className={Style.list}>
          {fibonacciValue.map((number, index) => (
            <li className={Style.item} key={index}>
              <Circle key={index} index={index} letter={number.toString()} />
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
