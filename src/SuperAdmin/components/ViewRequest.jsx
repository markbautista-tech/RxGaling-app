import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import getClinicDetails from "../../utils/data/fetch/getClinicDetails";
import getClinicOwner from "../../utils/data/fetch/getClinicOwner";
import DisplayRequestForm from "./DisplayRequestForm";

const ViewRequestDetails = ({ givenID }) => {
  const [clinicData, setClinicData] = useState([]);
  const [clinicOwner, setClinicOwner] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const clinicDetails = await getClinicDetails();
      const ownerDetails = await getClinicOwner();

      setClinicData(clinicDetails);
      setClinicOwner(ownerDetails);
    };

    getData();
  }, []);

  const getClinicName = (ownerId) => {
    if (!clinicData || clinicData.length === 0) {
      return "No Clinic";
    }

    const clinicName = clinicData.find((name) => name.owner_id === ownerId);
    return clinicName ? clinicName.name : "No Clinic";
  };

  const getOwnerName = (ownerId) => {
    if (!clinicOwner || clinicOwner.length === 0) {
      return "No Owner";
    }

    const clinicOwnerName = clinicOwner.find((owner) => owner.id === ownerId);

    const { first_name, middle_name, last_name, ext_name } = clinicOwnerName;

    return `${first_name || ""} ${middle_name || ""} ${last_name || ""} ${ext_name || ""}`.trim();
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="secondary">View Details</Button>
        </DialogTrigger>
        <DialogContent className="lg:w-[80%]">
          <DialogHeader>
            <DialogTitle>Clinic Details</DialogTitle>
            <DialogDescription>
              Informations below are the clinic details provided.
            </DialogDescription>
          </DialogHeader>
          <div className="p-5">
            <DisplayRequestForm />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewRequestDetails;
