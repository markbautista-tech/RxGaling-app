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
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import usePharmacyDetails from "@/PharmacyApp/hooks/usePharmacyDetails";
import { SkeletonLoading } from "@/main/components/Skeleton";
import { PlusCircle } from "lucide-react";
import { FcOk } from "react-icons/fc";

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

const AddPartnerPharmacy = () => {
  const { pharmacyDetails, loading } = usePharmacyDetails();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [openDialog, setOpenDialog] = useState(false);

  const [region, setRegion] = useState(null);
  const [province, setProvince] = useState(null);
  const [cityMuni, setCityMuni] = useState(null);
  const [barangay, setBarangay] = useState(null);

  useEffect(() => {
    const fetchAddress = async (pharma) => {
      const bar = await getBarangayName(pharma.users?.addresses?.barangay);
      const city = await getCityMuniName(pharma.users?.addresses?.city);
      const prov = await getProvinceName(pharma.users?.addresses?.province);
      const reg = await getRegionName(pharma.users?.addresses?.region);

      setBarangay(bar);
      setCityMuni(city);
      setProvince(prov);
      setRegion(reg);
    };

    if (pharmacyDetails.length) {
      fetchAddress(pharmacyDetails[0]); // Assuming you need to fetch for the first pharmacy initially
    }
  }, [pharmacyDetails]);

  const filteredAndSortedPharmacy = useMemo(() => {
    let filteredPharmacy = Array.isArray(pharmacyDetails)
      ? pharmacyDetails.filter((pharma) => {
          const matchesSearch = pharma.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          return matchesSearch;
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
  }, [pharmacyDetails, searchTerm, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleConfirm = () => {
    setOpenDialog(true);
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
                filteredAndSortedPharmacy.map((pharma, index) => (
                  <div
                    className="w-full bg-secondary px-3 py-4 rounded-md shadow-md"
                    key={index}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xl">{pharma.name}</span>
                        <Button className="" onClick={() => handleConfirm()}>
                          <PlusCircle />
                          <span className="hidden lg:block">Add</span>
                        </Button>
                      </div>
                      <div className="flex flex-col lg:flex-row lg:justify-between">
                        <div>
                          <p className="text-sm">Owner:</p>
                          <span>
                            Dr. {pharma.users?.first_name}{" "}
                            {pharma.users?.middle_name?.charAt(0)}
                            {". "}
                            {pharma.users?.last_name} {pharma.users?.suffix}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm">Address:</p>
                          <span>
                            {barangay}, {cityMuni}, {province}, {region}
                          </span>
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
          {/* <AlertDialogTrigger asChild>
                  <Button
                    type="submit"

                    className="w-full lg:w-32"
                    disabled={!termsAccepted}
                  >
                    Register
                  </Button>
                </AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm submission?</AlertDialogTitle>
              <AlertDialogDescription className="flex gap-3">
                {/* <HiMiniBellAlert className="w-10 h-10 text-primary" /> */}
                This confirms that the following information are correct and
                accepted the Terms and Condition.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Dialog>
    </>
  );
};

export default AddPartnerPharmacy;
