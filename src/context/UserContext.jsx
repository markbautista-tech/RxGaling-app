import { fetchAuth } from "@/utils/data/login";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [ownerName, setOwnerName] = useState(null);

  const getAuth = async () => {
    setLoading(true);
    const auth = await fetchAuth();

    const name = `${auth.first_name} ${auth.middle_name} ${auth.last_name} ${auth.suffix}`;
    if (auth.error) {
      setUser(null);
    } else {
      setUser(auth);
      setRole(auth.role);
      setEmail(auth.email);
      setOwnerId(auth.id);
      setOwnerName(name);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAuth();
  }, []);

  const value = {
    user,
    loading,
    setUser,
    role,
    email,
    setRole,
    setEmail,
    ownerId,
    ownerName,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
