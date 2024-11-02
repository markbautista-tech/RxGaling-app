import React from "react";

const LoadingUI = () => {
  return (
    <div className="fixed top-0 left-0 flex-center-all bg-white/30 backdrop-blur-sm z-50 w-screen h-screen">
      <div className="flex space-x-2 justify-center items-center h-screen dark:invert">
        <span className="sr-only">PLease wait...</span>
        <div className="h-5 w-5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-5 w-5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-5 w-5 bg-primary rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default LoadingUI;
