import getAddresses from "@/utils/data/fetch/getAddresses";
import getClinicDetails from "@/utils/data/fetch/getClinicDetails";
import getClinicOwner from "@/utils/data/fetch/getClinicOwner";
import React, { useEffect, useState } from "react";
import useAddresses from "./useAddresses";
import useClinicAddress from "./useClinicAddress";

export const useClinicRequestData = () => {
  const {
    getRegionName,
    getProvinceName,
    getCityMuniName,
    getBarangayName,
    regionName,
    provinceName,
    cityMuniName,
    barangayName,
  } = useAddresses();

  const {
    getClinicRegionName,
    getClinicProvinceName,
    getClinicCityMuniName,
    getClinicBarangayName,
    clinicRegion,
    clinicProvince,
    clinicCityMuni,
    clinicBarangay,
  } = useClinicAddress();

  const [ownerId, setOwnerId] = useState(null);
  const [clinicData, setClinicData] = useState([]);
  const [clinicDataName, setClinicDataName] = useState(null);
  const [dateReq, setDateReq] = useState(null);
  const [clinicAddressID, setClinicAddressID] = useState(null);
  const [clinicAddress, setClinicAddress] = useState(null);
  const [clinicLicense, setClinicLicense] = useState(null);
  const [clinicStatus, setClinicStatus] = useState(null);
  const [ownerFname, setOwnerFname] = useState(null);
  const [ownerLname, setOwnerLname] = useState(null);
  const [ownerMname, setOwnerMname] = useState(null);
  const [ownerEname, setOwnerEname] = useState(null);
  const [ownerGender, setOwnerGender] = useState(null);
  const [ownerContact, setOwnerContact] = useState(null);
  const [ownerEmail, setOwnerEmail] = useState(null);
  const [ownerBirthdate, setOwnerBirthdate] = useState(null);
  const [ownerAddress, setOwnerAddress] = useState(null);
  const [ownerAddressId, setOwnerAddressId] = useState(null);

  const getOwnerID = (id) => {
    setOwnerId(id);
  };

  useEffect(() => {
    const fetchClinicData = async () => {
      if (ownerId) {
        const clinic = await getClinicDetails(ownerId);

        if (clinic.length > 0) {
          setClinicData(clinic);
          setClinicStatus(clinic[0].status);
          setClinicLicense(clinic[0].license_num);
          setClinicDataName(clinic[0].name);
          setDateReq(clinic[0].created_at);
          setClinicAddressID(clinic[0].address_id);
        }
      }
    };

    const fetchOwnerData = async () => {
      if (ownerId) {
        const owner = await getClinicOwner(ownerId);

        if (owner.length > 0) {
          setOwnerFname(owner[0].first_name);
          setOwnerLname(owner[0].last_name);
          setOwnerMname(owner[0].middle_name);
          setOwnerEname(owner[0].suffix);
          setOwnerGender(owner[0].gender);
          setOwnerContact(owner[0].mobile_number);
          setOwnerEmail(owner[0].email);
          setOwnerBirthdate(owner[0].birthdate);
          setOwnerAddressId(owner[0].address_id);
        }
      }
    };

    fetchOwnerData();
    fetchClinicData();
  }, [ownerId]);

  useEffect(() => {
    const fetchClinicAddress = async () => {
      if (clinicAddressID) {
        const clinic_address = await getAddresses(clinicAddressID);
        setClinicAddress(clinic_address[0].address_line);

        await getClinicRegionName(clinic_address[0].region);
        await getClinicProvinceName(clinic_address[0].province);
        await getClinicCityMuniName(clinic_address[0].city);
        await getClinicBarangayName(clinic_address[0].barangay);
      }
    };

    const fetchOwnerAddress = async () => {
      if (ownerAddressId) {
        const owner_address = await getAddresses(ownerAddressId);
        setOwnerAddress(owner_address[0].address_line);

        await getRegionName(owner_address[0].region);
        await getProvinceName(owner_address[0].province);
        await getCityMuniName(owner_address[0].city);
        await getBarangayName(owner_address[0].barangay);
      }
    };

    fetchOwnerAddress();
    fetchClinicAddress();
  }, [clinicAddressID]);

  console.log();

  return {
    getOwnerID,
    clinicData,
    clinicDataName,
    setClinicData,
    setClinicDataName,
    clinicStatus,
    dateReq,
    regionName,
    provinceName,
    cityMuniName,
    barangayName,
    clinicRegion,
    clinicProvince,
    clinicCityMuni,
    clinicBarangay,
    clinicAddress,
    ownerFname,
    ownerLname,
    ownerMname,
    ownerEname,
    ownerContact,
    ownerEmail,
    ownerBirthdate,
    ownerGender,
    ownerAddress,
    clinicLicense,
  };
};
