import React, { useState } from "react";

const useActiveLink = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleMenuClick = (link) => {
    setActiveLink(null);
    setActiveLink(link);
  };

  return {
    activeLink,
    handleMenuClick,
  };
};

export default useActiveLink;
