import React, { useState } from "react";

const useSignUp = async () => {
  const [error, setError] = useState(null);
  const onSubmit = async (data) => {
    setError(null);
    try {
      // Here you would typically send the data to your API
      console.log("Form submitted:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Show success message or perform another action
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return {
    onSubmit,
    error,
  };
};

export default useSignUp;
