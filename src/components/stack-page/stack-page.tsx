import { useState, useEffect } from "react";

import Style from "./stack-page.module.css";
import Stack from "./stack";

import { SHORT_DELAY_IN_MS, setDelay } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TStack, TButtonState, TLoaderState } from "../../types/types";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StackPage: React.FC = () => {
  const [stack] = useState(new Stack<string>());
  const [stackElement, setStackElement] = useState<TStack[]>(stack.elements.map((element) =>
  ({element, state: false})));
  const [inputValue, setInputValue] = useState<string>("");
  const [buttonState, setButtonState] = useState<TButtonState>({
    addElementButton: true,
    deleteElementButton: true,
    clearListButton: true,
  });
  const [loaderState, setLoaderState] = useState<TLoaderState>({
    addElementButton: false,
    deleteElementButton: false,
    clearListButton: false,
  });

  useEffect(() =>{
    setButtonState({
      addElementButton: inputValue.trim().length === 0,
      deleteElementButton: stackElement.length === 0,
      clearListButton: stackElement.length === 0,
    })
  }, [inputValue, stackElement]);

  const handleButtonClick = async (buttonType: "addElementButton" | "deleteElementButton" | "clearListButton") => {
    const buttonState = {...loaderState};
    buttonState[buttonType] = true;
    setLoaderState(buttonState);

    if (buttonType === "addElementButton") {
      stack.push(inputValue);
    } else if (buttonType === "deleteElementButton") {
      stack.pop();
    } else {
      stack.clear();
    }

    const newStackElement: TStack[] = stack.elements.map((element, index) => 
    ({element, 
      state: index === stack.elements.length - 1}));

    setStackElement(newStackElement);
    await setDelay(SHORT_DELAY_IN_MS);

    setStackElement((prevElement) => prevElement.map((element) => 
    ({...element, color: false})));

    setInputValue("");

    const loaderStateAfterCopy = {...loaderState};
    loaderStateAfterCopy[buttonType] = false;
    setLoaderState(loaderStateAfterCopy);
  }

  const clearSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  }

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  }

  return (
    <SolutionLayout title="Стек">
      <section>
        <form className={Style.form} onSubmit={clearSubmit}>
          <div className={Style.container}>
            <Input 
              value={inputValue}
              maxLength={4}
              isLimitText={true}
              onChange={handleInputChange}
            />
            <Button 
              text="Добавить"
              type="submit"
              onClick={() => handleButtonClick("addElementButton")}
              disabled={buttonState.addElementButton}
              isLoader={loaderState.addElementButton}
            />
            <Button 
              text="Удалить"
              onClick={() => handleButtonClick("deleteElementButton")}
              disabled={buttonState.deleteElementButton}
              isLoader={loaderState.deleteElementButton}
            />
          </div>
          <Button 
            text="Очистить"
            onClick={() => handleButtonClick("clearListButton")}
            disabled={buttonState.clearListButton}
          />
        </form>
        <ul className={Style.list}>
          {stackElement.map(({element, state }, index) => (
            <li className={Style.item} key={index}>
              <Circle
                key={index}
                index={index}
                letter={element}
                head={index === stackElement.length - 1 ? "top" : ""}
                state={state ? ElementStates.Changing : ElementStates.Default}
              />
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
