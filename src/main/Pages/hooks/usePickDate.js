import React, { useEffect, useState } from "react";

const usePickDate = () => {
  const [selected, setSelected] = useState(new Date());

  return {
    selected,
    setSelected,
  };
};

export default usePickDate;
