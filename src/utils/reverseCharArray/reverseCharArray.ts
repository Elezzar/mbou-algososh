import { TCharArray } from "../../types/types";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS, setDelay } from "../../constants/delays";

export const reverseCharArray = async (
  charArray: Array<TCharArray> | null, 
  setString: (newString: Array<TCharArray> | null ) => void
) => {

  if (charArray !== null) {
    let lastIndexElement: number = charArray.length - 1;
    for (let i: number = 0; i < charArray.length / 2; i++) {
      const temp: TCharArray = charArray[i];
      charArray[i] = {...charArray[i], state: "loading"};
      charArray[lastIndexElement] = {...charArray[lastIndexElement], state: "loading"};
      setString([...charArray]);

      await setDelay(SHORT_DELAY_IN_MS);

      charArray[i] = {...charArray[lastIndexElement], state: "load"};
      charArray[lastIndexElement] = {...temp, state: "load"};
      setString([...charArray]);

      await setDelay(DELAY_IN_MS);

      lastIndexElement--;        
    }
  }
}