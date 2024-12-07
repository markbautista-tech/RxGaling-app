import fetchPharmacyClinic, {
  selectPharmaClinic,
} from "@/utils/data/fetch/fetchPharmacyClinic";
import getPharmacyDetails from "@/utils/data/fetch/getPharmacyDetails";
import React, { useEffect, useState } from "react";

const verifyAddedPharma = () => {
  const [partnerPharmacy, setPartnerPharmacy] = useState({});
  const [initialPharmacy, setInitialPharmacy] = useState({});
  const [filteredPharmacy, setFilteredData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const pharmacyInitial = async () => {
    setIsLoading(true);
    const initial = await getPharmacyDetails();
    const partner = await fetchPharmacyClinic();
    setInitialPharmacy(initial);
    setPartnerPharmacy(partner);
  };

  const getPharmacyId = async (id) => {
    const response = await selectPharmaClinic(id);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    if (response) {
      const filtered = initialPharmacy.filter((item) => item.id === id);
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    pharmacyInitial();
  }, []);

  return {
    getPharmacyId,
    filteredPharmacy,
  };
};

export default verifyAddedPharma;
