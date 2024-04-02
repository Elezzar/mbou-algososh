import { useState, useEffect } from "react";

import Style from "./queue-page.module.css";

import Queue from "./queue";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { TQueue, TButtonState, TLoaderState } from "../../types/types";

import { SHORT_DELAY_IN_MS, setDelay } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue<string>(7));
  const [queueElement, setQueueElement] = useState<(TQueue | undefined)[]>(queue.elements().map((element) =>
  ({ element, state: false })));

  const [inputValue, setInputValue] = useState<string>("");
  const [headElementIndex, setHeadElementIndex] = useState<number | null>(null);
  const [tailElementIndex, setTailElementIndex] = useState<number | null>(null);
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

  useEffect(() => {
    setButtonState({
      addElementButton: inputValue.trim().length === 0,
      deleteElementButton: queueElement.length === 0,
      clearListButton: queueElement.length === 0,
    });
  }, [inputValue, queueElement]);

  const handleButtonClick = async (action: () => void, buttonType: "addElementButton" | "deleteElementButton" | "clearListButton") => {
    setLoaderState((prevLoader) => ({...prevLoader, [buttonType]: true }));
    action();
    await setDelay(SHORT_DELAY_IN_MS);
    setLoaderState((prevLoader) => ({...prevLoader, [buttonType]: false }));
  }

  const renderQueueElements = async (button: "addElementButton" | "deleteElementButton", value?: string) => {
    if (button === "addElementButton" && value) {
      queue.enqueue(value);
    };

    const newQueue: TQueue[] = [
      ...queue.getElements().map((element) => ({ element, state: false })),
    ]

    if (button === "addElementButton" && value) {
      newQueue[queue.getTail() -1] = {...newQueue[queue.getTail() -1], state: true };
    } else {
      newQueue[queue.getHead()] = {...newQueue[queue.getHead()], state: true };
    }

    setQueueElement(newQueue);

    await setDelay(SHORT_DELAY_IN_MS);

    if (button === "addElementButton" && value) {
      setInputValue("");
    } else {
      queue.dequeue();
    }

    if (button === "addElementButton" && value) {
      setQueueElement((prevState) => prevState.map((element) => ({...element, state: false })));
      setTailElementIndex(queue.isEmpty()? null : queue.getTail() - 1);
    } else {
      const tempData: TQueue[] = [...queue.getElements().map((element) => ({ element, state: false }))];
      setQueueElement(tempData);
      setTailElementIndex(queue.isEmpty() ? null : queue.getTail() -1);
    }

    setHeadElementIndex(queue.isEmpty() ? null : queue.getHead());
  }

  const clearSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  }

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  }

  const addQueueElement = async () => {
    handleButtonClick(() => {
      renderQueueElements("addElementButton", inputValue);
    }, "addElementButton");
    setInputValue("");
    }

  const deleteQueueElement = async () => {
    handleButtonClick(async() => {
      renderQueueElements("deleteElementButton");
    }, "deleteElementButton");
  }
  
  const clearQueue = () => {
    queue.clear();
    setQueueElement([...queue.getElements().map((element) => ({ element, state: false }))]);
    setHeadElementIndex(null);
    setTailElementIndex(null);
  }

  return (
    <SolutionLayout title="Очередь">
      <section>
        <form className={Style.form} onSubmit={clearSubmit}>
          <div className={Style.container}>
            <Input 
              placeholder="Введите значение"
              value={inputValue}
              maxLength={4}
              isLimitText={true}
              onChange={handleInputChange}
            />
            <Button 
              text="Добавить"
              type="submit"
              onClick={addQueueElement}
              disabled={tailElementIndex === 6 || buttonState.addElementButton}
              isLoader={loaderState.addElementButton}
            />
            <Button 
              text="Удалить"
              onClick={deleteQueueElement}
              disabled={buttonState.deleteElementButton}
              isLoader={loaderState.deleteElementButton}
            />
          </div>
          <Button 
            text="Очистить"
            onClick={clearQueue}
            disabled={buttonState.clearListButton}
          />
        </form>
        <ul className={Style.list}>
          {queueElement.map((element, index) => (
            <li key={index} className={Style.item}>
              <Circle 
                key={index}
                index={index}
                letter={element?.element}
                head={headElementIndex === index ? "head" : ""}
                tail={tailElementIndex === index && !queue.isEmpty() ? "tail" : ""}
                state={element?.state ? ElementStates.Changing : ElementStates.Default}
              />
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
