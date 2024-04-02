import { useState, FormEventHandler, useEffect, useCallback, Dispatch } from "react";

import Style from "./string.module.css";

import { TCharArray } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { reverseCharArray } from "../../utils/reverseCharArray/reverseCharArray";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<Array<TCharArray> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const setStringCallback: Dispatch<React.SetStateAction<Array<TCharArray> | null>> = useCallback(
    newString => {
      setString(newString);
    }, 
    [setString]
  );

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await reverseCharArray(string, setStringCallback);
    setLoading(false);
  };

  useEffect(() => {
    const newString: Array<TCharArray> | null = inputValue 
      ? inputValue.split("").map((char) => ({string: char, state: undefined}))
      : null;
      setString(newString);
  }, [inputValue]);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  }
  
  return (
    <SolutionLayout title="Строка">
      <section className={Style.section}>
        <form className={Style.form} onSubmit={submitHandler}>
          <Input 
            name="input"
            maxLength={11}
            isLimitText={true}
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            text="Развернуть"
            type="submit"
            isLoader={loading}
            disabled={inputValue === ""}
          />
        </form>
        <ul className={Style.list}>
          {string && string.map((letter , index) => (
            <li key={index} className={Style.item}>
              <Circle key={index} letter ={letter.string} 
                state={(letter.state === "loading") ? ElementStates.Changing 
                  : (letter.state === "load") ? ElementStates.Modified 
                  : ElementStates.Default} 
              />
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
