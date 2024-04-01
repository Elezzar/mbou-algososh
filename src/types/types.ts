import { ElementStates } from "./element-states";

export type TCharArray = {
  string: string;
  state?: "loading" | "load" | undefined
}

export type TRandomNumberArray = {
  minLength: number;
  maxLength: number;
  minValue: number;
  maxValue: number;
}

export type TSorterItem = {
  value: number;
  state?: ElementStates
}

export type TStack = {
  element: string;
  state?: boolean | null;
}

export type TButtonState = {
  addElementButton: boolean;
  deleteElementButton: boolean;
  clearListButton: boolean;
}

export type TLoaderState = {
  addElementButton: boolean;
  deleteElementButton: boolean;
  clearListButton: boolean;
}

export type TQueue = {
  element?: string;
  state?: boolean | null;
}

export type TListElement = {
  value: string;
  loading: boolean;
  load: boolean;
  upperCircle: boolean;
  bottomCircle: boolean;
}

export type TLoaderListState = {
  addHeadElement: boolean;
  deleteHeadElement: boolean;
  addTailElement: boolean;
  deleteTailElement: boolean;
  addIndexElement: boolean;
  deleteIndexElement: boolean;
}

export type TButtonListState = {
  addElementButton: boolean;
  addIndexElementButton: boolean;
  deleteHeadTailElementButton: boolean;
  deleteIndexElementButton: boolean;
}

export enum SortMethod {
  Selection = "SELECTION",
  Bubble = "BUBBLE",
}