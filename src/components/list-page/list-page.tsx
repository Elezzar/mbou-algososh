import { useState, useEffect } from "react";

import Style from "./list-page.module.css";

import { LinkedList } from "./linked-list";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

import { ElementStates } from "../../types/element-states";
import { generateRandomNumberArray } from "../../utils/generateRandomArray/generateRandomArray";
import { TRandomNumberArray, TListElement, TButtonListState, TLoaderListState } from "../../types/types";
import { SHORT_DELAY_IN_MS, setDelay } from "../../constants/delays";

export const ListPage: React.FC = () => {
  const getRandomArray = generateRandomNumberArray({
      minLength: 4,
      maxLength: 6,
      minValue: 0,
      maxValue: 100
    } as TRandomNumberArray).map((item): TListElement => ({
        value: item.toString() as string,
        loading: false,
        load: false,
        upperCircle: false,
        bottomCircle: false
    }));

    const [list, setList] = useState(new LinkedList<TListElement>(getRandomArray));
    const [inputValue, setInputValue] = useState<string>("");
    const [indexValue, setIndexValue] = useState<string>("");
    const [buttonState, setButtonState] = useState<TButtonListState>({
      addElementButton: true,
      addIndexElementButton: true,
      deleteHeadTailElementButton: true,
      deleteIndexElementButton: true,
    });
    const [loaderState, setLoaderState] = useState<TLoaderListState>({
      addHeadElement: false,
      deleteHeadElement: false,
      addTailElement: false,
      deleteTailElement: false,
      addIndexElement: false,
      deleteIndexElement: false
    });

    const buttonsEnabled = list.toArray().length > 0 && buttonState.deleteHeadTailElementButton;
    
    useEffect(() =>{
      const value = inputValue.trim().length === 0;
      setButtonState((prevLoaders) => ({...prevLoaders, addElementButton: (value)}));
      const arrayLength = list.toArray().length;
      const validation = parseInt(indexValue) >= 0 && parseInt(indexValue) <= arrayLength - 1;
      setButtonState((prevLoaders) => ({ ...prevLoaders, addIndexElementButton: (!validation || value) }));
      setButtonState((prevLoaders) => ({ ...prevLoaders, deleteHeadTailElementButton: (buttonsEnabled) }));
      setButtonState((prevLoaders) => ({ ...prevLoaders, deleteIndexElementButton: (arrayLength !== 0 && !validation) }));
    }, [inputValue, indexValue, list]);

    const updateArray = (newArray: LinkedList<TListElement>, updates: {[key: string]: boolean}) => {
      const updatedArray = new LinkedList<TListElement>(
        newArray.toArray().map((element) => ({
          ...element,
          ...updates
        }))
      );
      return updatedArray;
    };

    const addHeadElement = async () => {
      setLoaderState((prevLoaders) => ({...prevLoaders, addHeadElement: true }));
      
      const newListElement = new LinkedList<TListElement>();
      const firstNode = list.getFirstNode();

      if (firstNode) {
        firstNode.value.upperCircle = true;
      }

      await setDelay(SHORT_DELAY_IN_MS);

      newListElement.prepend({
        value: inputValue,
        loading: false,
        load: true,
        upperCircle: false,
        bottomCircle: false
      })

      const currentArray = list.toArray();

      for (const item of currentArray) {
        newListElement.append(item);
        item.upperCircle = false;
      }

      setInputValue("");

      await setDelay(SHORT_DELAY_IN_MS);
      setList(newListElement);

      await setDelay(SHORT_DELAY_IN_MS);
      setList(prevList => new LinkedList<TListElement>(prevList.toArray().map((element) => ({
      ...element,
        loading: false,
        load: false,
      }))));
      setLoaderState((prevLoaders) => ({...prevLoaders, addHeadElement: false }));
    }

    const deleteHeadElement = async () => {
      setLoaderState((prevLoaders) => ({...prevLoaders, deleteHeadElement: true }));
      list.getFirstNode()?.value && (list.getFirstNode()!.value.bottomCircle = true);

      await setDelay(SHORT_DELAY_IN_MS);

      list.deleteHead();
      setList(updateArray(list, { bottomCircle: false }));
      setLoaderState((prevLoaders) => ({...prevLoaders, deleteHeadElement: false }));
    }

    const addTailElement = async () => {
      setLoaderState((prevLoaders) => ({...prevLoaders, addTailElement: true }));
      
      const newListElement = new LinkedList<TListElement>(list.toArray());

      newListElement.getLastNode()?.value && (newListElement.getLastNode()!.value.upperCircle = true);

      await setDelay(SHORT_DELAY_IN_MS);

      const newList = new LinkedList<TListElement>();
      const currentArray = list.toArray();

      for (const item of currentArray) {
        newList.append(item);
        item.upperCircle = false;
      }

      newList.append({
        value: inputValue,
        loading: false,
        load: true,
        upperCircle: false,
        bottomCircle: false
      });

      setInputValue("");

      await setDelay(SHORT_DELAY_IN_MS);

      setList(newList);
      await setDelay(SHORT_DELAY_IN_MS);

      setList((prevList: LinkedList<TListElement>) => { 
        return updateArray(prevList, { loading: false, load: false, });
      });

      setLoaderState((prevLoaders) => ({...prevLoaders, addTailElement: false }));
    }

    const deleteTailElement = async () => {
      setLoaderState((prevLoaders) => ({...prevLoaders, deleteTailElement: true }));
      list.getLastNode()?.value && (list.getLastNode()!.value.bottomCircle = true);

      await setDelay(SHORT_DELAY_IN_MS);

      list.deleteTail();
      setList(updateArray(list, { bottomCircle: false }));
      setLoaderState((prevLoaders) => ({...prevLoaders, deleteTailElement: false }));
    }

    const addElementByIndex = async () => {
      setLoaderState((prevLoaders) => ({...prevLoaders, addIndexElement: true }));
      const newList = new LinkedList<TListElement>(list.toArray());
      const index = parseInt(indexValue);

      for (let i = 0; i <= index; i++) {
        setList((prevList: LinkedList<TListElement>) => {
          const newList = new LinkedList<TListElement>(prevList.toArray());
          const currentNode = newList.getNodeByIndex(i);
          const lastNode = newList.getNodeByIndex(i - 1);

          if (currentNode) {
            currentNode.value = {
              ...currentNode.value,
              upperCircle: true
            }
          }

          if (lastNode) {
            lastNode.value = {
            ...lastNode.value,
            loading: true,
            upperCircle: false
            }
          }
          
          return newList;
        })

      await setDelay(SHORT_DELAY_IN_MS);
      }

      if (!isNaN(index)) {
        newList.addByIndex(
          {
            value: inputValue,
            loading: false,
            load: true,
            upperCircle: false,
            bottomCircle: false
          }, index
        )

        setInputValue("");
        setIndexValue("");
      }

      setList(updateArray(newList, { loading: false, upperCircle: false }));

      await setDelay(SHORT_DELAY_IN_MS);
      setList((prevList: LinkedList<TListElement>) => {
        const addedElement = prevList.getNodeByIndex(index);
        if (addedElement) addedElement.value.load = false;
        return prevList;
      })

      setLoaderState((prevLoaders) => ({...prevLoaders, addIndexElement: false }));
    }

    const deleteElementByIndex = async () => {
      setLoaderState((prevLoaders) => ({...prevLoaders, deleteIndexElement: true }));
      const index = parseInt(indexValue);
      const setLoadingState = (list: LinkedList<TListElement>, index: number, loading: boolean) => {
        const newList = new LinkedList<TListElement>(list.toArray());
        const currentNode = newList.getNodeByIndex(index);
        currentNode?.value && (currentNode.value.loading = loading);
        return newList;
      }

      for (let i = 0; i < index; i++) {
        setList((prevList) => {
          const updatedList = setLoadingState(prevList, i, true);
          return updatedList;
        })
        await setDelay(SHORT_DELAY_IN_MS);
      }

      setList((prevList) => {
        const updatedList = setLoadingState(prevList, index, true);
        return updatedList;
      })

      await setDelay(SHORT_DELAY_IN_MS);

      setList((prevList) => {
        const updatedList = setLoadingState(prevList, index, false);
        const currentNode = updatedList.getNodeByIndex(index);
        currentNode?.value && (currentNode.value.bottomCircle = true);
        return updatedList;
      })

      await setDelay(SHORT_DELAY_IN_MS);

      if (!isNaN(index)) {
        setList((prevList) => {
          const newList = new LinkedList<TListElement>(prevList.toArray());
          newList.deleteByIndex(index);
          setIndexValue("");
          return newList;
        })
      }

      setList((prevList) => updateArray(prevList, { loading: false }));
      setLoaderState((prevLoaders) => ({...prevLoaders, deleteIndexElement: false }));
    }

    const handleInputValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(evt.target.value);
    }

    const handleInputIndexChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setIndexValue(evt.target.value);
    }

  return (
    <SolutionLayout title="Связный список">
      <section>
        <form>
          <div className={Style.containerHeadTail}>
            <Input 
              style={{width: 205, height: 60}}
              placeholder="Введите значение"
              value={inputValue}
              maxLength={4}
              isLimitText={true}
              onChange={handleInputValueChange}
            />
            <Button 
              text="Добавить в head"
              onClick={addHeadElement}
              disabled={buttonState.addElementButton}
              isLoader={loaderState.addHeadElement}
              linkedList="small"
            />
            <Button 
              text="Добавить в tail"
              onClick={addTailElement}
              disabled={buttonState.addElementButton}
              isLoader={loaderState.addTailElement}
              linkedList="small"
            />
            <Button 
              text="Удалить из head"
              onClick={deleteHeadElement}
              disabled={!buttonsEnabled}
              isLoader={loaderState.deleteHeadElement}
              linkedList="small"
            />
            <Button 
              text="Удалить из tail"
              onClick={deleteTailElement}
              disabled={!buttonsEnabled}
              isLoader={loaderState.deleteTailElement}
              linkedList="small"
            />
          </div>
          <div className={Style.containerIndex}>
            <Input 
              style={{width: 205, height: 60}}
              placeholder="Введите индекс"
              value={indexValue}
              type="number"
              min={0}
              max={list.toArray().length}
              onChange={handleInputIndexChange}
            />
            <Button 
              text="Добавить по индексу"
              onClick={addElementByIndex}
              disabled={buttonState.addIndexElementButton}
              isLoader={loaderState.addIndexElement}
              linkedList="big"
            />
            <Button 
              text="Удалить по индексу"
              onClick={deleteElementByIndex}
              disabled={buttonState.deleteIndexElementButton}
              isLoader={loaderState.deleteIndexElement}
            />
          </div>
        </form>
        <ul className={Style.list}>
          {list.toArray().map(({ value, loading, load, upperCircle, bottomCircle }, index) => (
            <li className={Style.item} key={index}>
              <Circle
                letter={bottomCircle ? "" : value}
                index={index}
                state={
                  load ? ElementStates.Modified
                    : loading ? ElementStates.Changing
                    : ElementStates.Default
                }
                head={
                  upperCircle ? (
                    <Circle
                      isSmall
                      letter={inputValue}
                      state={ElementStates.Changing}
                    />
                  ) : index === 0 ? (
                    "head"
                  ) : (
                    ""
                  )
                }
                tail={
                  bottomCircle ? (
                    <Circle
                      isSmall
                      letter={value}
                      state={ElementStates.Changing}
                    />
                  ) : (bottomCircle && index === 0) ||
                    (bottomCircle &&
                      index === list.toArray().length - 1) ? (
                    <Circle
                      isSmall
                      letter={value}
                      state={ElementStates.Changing}
                    />
                  ) : index === list.toArray().length - 1 ? (
                    "tail"
                  ) : (
                    ""
                  )
                }
              />
              {index !== list.toArray().length - 1 && <ArrowIcon />}
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
