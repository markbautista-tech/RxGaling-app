import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUser } from "lucide-react";

const PharmacyRequest = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="rounded-md bg-primary text-white text-xs lg:text-[16px] py-3 px-4 shadow-md flex gap-3 items-center">
          <FileUser className="w-5 h-5" />
          <span className="hidden sm:block">Pharmacy Request</span>
        </DialogTrigger>
        <DialogContent className="lg:max-w-[70%] p-2 lg:p-10">
          <DialogHeader>
            <DialogTitle className="font-bold text-sm lg:text-2xl">
              Pharmacy Request
            </DialogTitle>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PharmacyRequest;
