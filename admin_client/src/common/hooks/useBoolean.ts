import { useState } from "react";

function useBoolean(initialValue = false) {
  const [value, setValue] = useState<boolean>(initialValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((prev) => !prev);

  return { value, setTrue, setFalse, toggle };
}

export default useBoolean;
