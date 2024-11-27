import { User } from "lucide-react";
import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const StaffProfile = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
          <User className="h-4 w-4" />
          <span className="text-xs lg:text-sm">Show Profile</span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default StaffProfile;
