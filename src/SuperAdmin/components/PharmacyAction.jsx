import React, { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { PiDotsThreeCircle } from "react-icons/pi";
import ViewDetails from "./ViewDetails";
import useUpdateClinicStatus from "../hooks/useUpdateClinicStatus";
import { Archive } from "lucide-react";
import PharmacyDetails from "./PharmacyDetails";

const PharmacyAction = ({ pharma }) => {
  const { updateArchive } = useUpdateClinicStatus();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isArchive = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <PiDotsThreeCircle className="w-6 h-6 lg:w-6 lg:h-6 hover:text-primary" />
        </PopoverTrigger>
        <PopoverContent className="max-w-fit" align="center">
          <div className="flex flex-col gap-3 p-0">
            <PharmacyDetails pharma={pharma} />
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-2 px-2 py-1.5 text-sm hover:text-red-500"
              onClick={isArchive}
            >
              <Archive className="h-4 w-4 " />
              Archive
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            <AlertDialogTitle>
              Are you sure to archive this record.
            </AlertDialogTitle>
            <AlertDialogDescription className="flex gap-3">
              This action confirms that this record will be archived.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="hover:bg-red-500">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PharmacyAction;
