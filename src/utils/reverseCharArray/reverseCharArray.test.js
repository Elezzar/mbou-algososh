import { reverseCharArray } from "./reverseCharArray";
import { ElementStates } from "../../types/element-states";

const rendering = (string, reversedString) => {
    const array = string.split('').map(char => ({ char, state: ElementStates.Default }));
    const reversedArray = reversedString.split('').map(char => ({ char, state: ElementStates.Modified }));
    return { array, reversedArray };
}

describe('Алгоритмы разворота строки работают корректно', () => {
  const setString =  jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Строка с четным количеством символов разворачивается корректно', async() => {
    const { array, reversedArray } = rendering('abcd', 'dcba');
    await reverseCharArray(array, setString);
    expect(setString).toHaveBeenCalledWith(reversedArray);
  });

  it('Строка с нечетным количеством символов разворачивается корректно', async() => {
    const { array, reversedArray } = rendering('abcde', 'edcba');
    await reverseCharArray(array, setString);
    expect(setString).toHaveBeenCalledWith(reversedArray);
  });

  it('Строка с одним символом разворачивается корректно', async() => {
    const { array, reversedArray } = rendering('a', 'a');
    await reverseCharArray(array, setString);
    expect(setString).toHaveBeenCalledWith(reversedArray);
  });

  it('Строка с пустой строкой разворачивается корректно', async() => {
    const string = '';
    const array = string.split('').map(char => ({ char, state: ElementStates.Default }));
    await reverseCharArray(array, setString);
    expect(setString).not.toHaveBeenCalled();
  });
})