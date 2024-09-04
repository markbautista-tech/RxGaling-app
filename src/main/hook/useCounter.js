import React, { useState } from "react";

const useCounter = () => {
  const [count, setCount] = useState(1);
  const add = () => {
    setCount(count + 1);
  };

  return {
    count,
    setCount,
    add,
  };
};

export default useCounter;
