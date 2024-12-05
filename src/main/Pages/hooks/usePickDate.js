import React, { useEffect, useState } from "react";

const usePickDate = () => {
  const [initialDate, setInitialDate] = useState(null);

  const dateObject = new Date(initialDate);
  const formattedDate = dateObject.toISOString().slice(0, 10);

  return {
    initialDate,
    setInitialDate,
    formattedDate,
  };
};

export default usePickDate;
