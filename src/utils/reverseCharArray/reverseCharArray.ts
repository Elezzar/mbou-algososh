import { TCharArray } from "../../types/types";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS, setDelay } from "../../constants/delays";

import { ElementStates } from "../../types/element-states";

export const reverseCharArray = async (
  charArray: Array<TCharArray> | null, 
  setString: (newString: Array<TCharArray> | null ) => void
) => {

  if (charArray !== null) {
    let lastIndexElement: number = charArray.length - 1;
    for (let i: number = 0; i < charArray.length / 2; i++) {
      const temp: TCharArray = charArray[i];
      charArray[i] = {...charArray[i], state: ElementStates.Changing};
      charArray[lastIndexElement] = {...charArray[lastIndexElement], state: ElementStates.Changing};
      setString([...charArray]);

      await setDelay(SHORT_DELAY_IN_MS);

      charArray[i] = {...charArray[lastIndexElement], state: ElementStates.Modified};
      charArray[lastIndexElement] = {...temp, state: ElementStates.Modified};
      setString([...charArray]);

      await setDelay(DELAY_IN_MS);

      lastIndexElement--;        
    }
  }
}