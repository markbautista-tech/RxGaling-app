import { fetchAuth } from "@/utils/data/login";
import { fetchPharmacyAuth } from "@/utils/data/pharmacyLogin";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const usePharmacyUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [pharmacyUser, setPharmacyUser] = useState(null);
  const [pharmacyLoading, setPharmacyLoading] = useState(true);
  const [pharmacyRole, setPharmacyRole] = useState(null);
  const [pharmacyEmail, setPharmacyEmail] = useState(null);
  const [pharmacyOwnerId, setPharmacyOwnerId] = useState(null);
  const [pharmacyOwnerName, setPharmacyOwnerName] = useState(null);
  const [pharmacyId, setPharmacyId] = useState(null);
  const [pharmacyOwnerLname, setPharmacyOwnerLname] = useState(null);

  const getPharmacyAuth = async () => {
    setLoading(true);
    const auth = await fetchPharmacyAuth();
    console.log(auth);

    const name = `${auth.first_name} ${auth.middle_name} ${auth.last_name} ${auth.suffix}`;
    if (auth.error) {
      setPharmacyUser(null);
    } else {
      setPharmacyUser(auth);
      setPharmacyRole(auth.role ?? auth.user?.user_metadata?.role);
      setPharmacyEmail(auth.email);
      setPharmacyOwnerId(auth.id);
      setPharmacyOwnerName(name);
      setPharmacyId(auth.clinic_id);
      setPharmacyOwnerLname(auth.last_name);
    }
    setPharmacyLoading(false);
  };

  useEffect(() => {
    getPharmacyAuth();
  }, []);

  const value = {
    pharmacyUser,
    setPharmacyUser,
    pharmacyLoading,
    pharmacyRole,
    setPharmacyRole,
    pharmacyEmail,
    setPharmacyEmail,
    pharmacyOwnerId,
    pharmacyOwnerName,
    pharmacyId,
    pharmacyOwnerLname,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
