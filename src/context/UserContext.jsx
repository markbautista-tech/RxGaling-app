import { fetchAuth } from "@/utils/data/login";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);

  const getAuth = async () => {
    setLoading(true);
    const auth = await fetchAuth();

    if (auth.error) {
      setUser(null);
    } else {
      setUser(auth);
      setRole(auth.role);
      setEmail(auth.email);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAuth();
  }, []);

  const value = { user, loading, setUser, role, email, setRole, setEmail };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
