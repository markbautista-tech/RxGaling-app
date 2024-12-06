import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import usePharmacyDetails from "@/PharmacyApp/hooks/usePharmacyDetails";
import { SkeletonLoading } from "@/main/components/Skeleton";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import addPharmacyClinic from "@/utils/data/add/addPharmacyClinic";
import { selectPharmaClinic } from "@/utils/data/fetch/fetchPharmacyClinic";

const getRegionName = async (regionId) => {
  try {
    const response = await fetch(`https://psgc.cloud/api/regions/${regionId}`);
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getProvinceName = async (provinceId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/provinces/${provinceId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getCityMuniName = async (cityMuniId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/cities-municipalities/${cityMuniId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getBarangayName = async (barangayId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/barangays/${barangayId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const fetchAddressData = async (pharma) => {
  try {
    const [barangay, cityMuni, province, region] = await Promise.all([
      getBarangayName(pharma.users?.addresses?.barangay),
      getCityMuniName(pharma.users?.addresses?.city),
      getProvinceName(pharma.users?.addresses?.province),
      getRegionName(pharma.users?.addresses?.region),
    ]);

    return `${barangay || "Unknown Barangay"}, ${cityMuni || "Unknown City"}, ${province || "Unknown Province"}, ${region || "Unknown Region"}`;
  } catch (err) {
    console.error("Error fetching address data:", err);
    return "Unknown Address";
  }
};

const AddPartnerPharmacy = () => {
  const { clinicId } = useUser();
  const { pharmacyDetails, loading } = usePharmacyDetails();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [addressMap, setAddressMap] = useState({});
  const [existingPharmacies, setExistingPharmacies] = useState(new Set());
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [addLoading, setAddLoading] = useState(false);

  // Fetch pharmacies already associated with the clinic
  useEffect(() => {
    const fetchExistingPharmacies = async () => {
      try {
        const response = await selectPharmaClinic(pharmacyDetails[0].id);
        if (response) {
          // Assuming response is an array of pharmacy IDs
          setExistingPharmacies(new Set(response.map((pharma) => pharma.id)));
        }
      } catch (error) {
        console.error("Error fetching existing pharmacies:", error);
      }
    };

    fetchExistingPharmacies();
  }, [clinicId]);

  // Fetch and map addresses
  useEffect(() => {
    if (pharmacyDetails.length) {
      const fetchAddresses = async () => {
        const addresses = {};
        for (const pharma of pharmacyDetails) {
          addresses[pharma.id] = await fetchAddressData(pharma);
        }
        setAddressMap(addresses);
      };

      fetchAddresses();
    }
  }, [pharmacyDetails]);

  // Filter pharmacies to exclude those already associated with the clinic
  const filteredAndSortedPharmacy = useMemo(() => {
    let filteredPharmacy = Array.isArray(pharmacyDetails)
      ? pharmacyDetails.filter((pharma) => {
          const isNotExisting = !existingPharmacies.has(pharma.id);
          const matchesSearch = pharma.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          return isNotExisting && matchesSearch;
        })
      : [];

    if (sortConfig.key) {
      filteredPharmacy.sort((a, b) => {
        const aValue = a[sortConfig.key]?.toLowerCase() ?? "";
        const bValue = b[sortConfig.key]?.toLowerCase() ?? "";
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filteredPharmacy;
  }, [pharmacyDetails, searchTerm, sortConfig, existingPharmacies]);

  const handleConfirm = (pharma) => {
    setSelectedPharmacy(pharma);
    setOpenDialog(true);
  };

  const addPharmacy = async () => {
    if (!selectedPharmacy) return;
    setAddLoading(true);

    const ids = {
      clinic_id: clinicId,
      pharmacy_id: selectedPharmacy.id,
    };

    try {
      const response = await addPharmacyClinic(ids);

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Pharmacy added successfully.");
        setOpenDialog(false);

        // Update existing pharmacies to exclude the added one
        setExistingPharmacies(
          (prev) => new Set([...prev, selectedPharmacy.id])
        );
      }
    } catch (error) {
      toast.error("An error occurred while adding the pharmacy.");
      console.error(error);
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>Add Pharmacy</Button>
        </DialogTrigger>
        <DialogContent className="w-full lg:w-[70%] lg:bottom-10">
          <DialogHeader>
            <DialogTitle>Add Partner Pharmacy from RxGaling</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Search pharmacy name..."
            className="text-xs lg:text-sm w-full lg:w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="h-screen lg:px-5">
            <div className="mt-3">
              {loading ? (
                <SkeletonLoading />
              ) : filteredAndSortedPharmacy.length > 0 ? (
                filteredAndSortedPharmacy.map((pharma) => (
                  <div
                    className="w-full bg-secondary px-3 py-4 rounded-md shadow-md"
                    key={pharma.id}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xl">{pharma.name}</span>
                        <Button
                          onClick={() => handleConfirm(pharma)}
                          disabled={addLoading}
                        >
                          <PlusCircle />
                          <span className="hidden lg:block">Add</span>
                        </Button>
                      </div>
                      <div className="flex flex-col lg:flex-row lg:justify-between">
                        <div>
                          <p className="text-sm">Owner:</p>
                          <span>
                            Dr. {pharma.users?.first_name}{" "}
                            {pharma.users?.middle_name?.charAt(0)}.{" "}
                            {pharma.users?.last_name} {pharma.users?.suffix}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm">Address:</p>
                          <span>{addressMap[pharma.id] || "Loading..."}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No pharmacy found</p>
              )}
            </div>
          </div>
        </DialogContent>

        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm add partner Pharmacy?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={addPharmacy}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Dialog>
    </>
  );
};

export default AddPartnerPharmacy;
