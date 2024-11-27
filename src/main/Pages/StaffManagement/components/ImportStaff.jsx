import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { FolderInput } from "lucide-react";

const ImportStaff = () => {
  return (
    <>
      <div className="w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-md flex justify-start items-center w-full"
            >
              <FolderInput className="w-6 h-6" />
              <span className="">Import Existing Staff</span>{" "}
            </Button>
          </DialogTrigger>
          <DialogContent className=" rounded-md lg:w-[60%]">
            <DialogHeader>
              <DialogTitle>Import existing Staff to your Clinic</DialogTitle>
              <DialogDescription>
                Select Doctor to add to clinic.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ImportStaff;
