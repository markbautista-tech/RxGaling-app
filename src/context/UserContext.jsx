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
  const [clinicId, setClinicId] = useState(null);
  const [ownerLname, setOwnerLname] = useState(null);

  const getAuth = async () => {
    setLoading(true);
    const auth = await fetchAuth();

    console.log(auth);

    const name = `${auth.first_name} ${auth.middle_name} ${auth.last_name} ${auth.suffix}`;
    if (auth.error) {
      setUser(null);
    } else {
      setUser(auth);
      setRole(auth.role ?? auth.user?.user_metadata?.role);
      setEmail(auth.email);
      setOwnerId(auth.id);
      setOwnerName(name);
      setClinicId(auth.clinic_id);
      setOwnerLname(auth.last_name);
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
    clinicId,
    ownerLname,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
