import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import SearchBar from "../components/Search";
import ContentTitle from "../../PageContent/ContentTitle";
import CreatePartnerPharmacy from "./create";
import AddPartnerPharmacy from "../../../PharmacyApp/Pages/AddPartnerPharmacy";
// import CreateClinicDoctors from "./create";

const Pharmacy = () => {
  return (
    <>
      <div className="py-2 lg:py-4 flex justify-between items-center no-scrollbar">
        <ContentTitle title={"Partner Pharmacy"} />
        <div>
          <AddPartnerPharmacy />
        </div>
      </div>
      <div>
        <Separator />
      </div>
      <div></div>
    </>
  );
};

export default Pharmacy;
