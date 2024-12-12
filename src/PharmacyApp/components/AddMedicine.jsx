import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFetchMedicines from "../hooks/useFetchMedicines";
import addMedicine from "@/utils/data/add/addMedicine";
import { toast } from "sonner";

const AddMedicine = () => {
  const { pharID } = useFetchMedicines();
  const [formData, setFormData] = useState({
    genericName: "",
    brandName: "",
    dosage: "",
    quantity: "",
    expiry_date: "",
    sellingPrice: "",
    transferCost: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const meds = {
      pharmacy_id: pharID[0].pharmacy_id,
      generic_name: formData.genericName,
      brand_name: formData.brandName,
      quantity: formData.quantity,
      selling_price: formData.sellingPrice,
      transfer_cost: formData.transferCost,
    };
    console.log("Medicine Data Submitted:", meds);

    try {
      const response = await addMedicine(meds);

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Medicine Added Successfully");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error);
    }

    setFormData({
      genericName: "",
      brandName: "",
      quantity: "",
      sellingPrice: "",
      transferCost: "",
    });
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1); // [1, 2, ..., 31]
  const years = Array.from(
    { length: 101 },
    (_, i) => new Date().getFullYear() - i
  ); // Last 100 years

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="shadow-md">
          Add Medicine
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full lg:w-[60%]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Medicine</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new medicine.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4">
              <div>
                <Label>Generic Name</Label>
                <Input
                  name="genericName"
                  value={formData.genericName}
                  onChange={handleChange}
                  placeholder="Generic Name"
                  required
                />
              </div>
              <div>
                <Label>Brand Name</Label>
                <Input
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  placeholder="Brand Name"
                  required
                />
              </div>
              <div>
                <Label>Dosage</Label>
                <Input
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  placeholder="Brand Name"
                  required
                />
              </div>
              <div className="grid grid-flow-row lg:grid-flow-col lg:gap-4">
                <div>
                  <Label>Quantity</Label>
                  <Input
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                    required
                  />
                </div>
                <div>
                  <Label>Selling Price (PHP)</Label>
                  <Input
                    name="sellingPrice"
                    type="number"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    placeholder="Enter selling price"
                    required
                  />
                </div>
                <div>
                  <Label>Transfer Cost (PHP)</Label>
                  <Input
                    name="transferCost"
                    type="number"
                    value={formData.transferCost}
                    onChange={handleChange}
                    placeholder="Enter transfer cost"
                    required
                  />
                </div>
              </div>
            </div>
            <Label>Expiration Date</Label>
            <div className="flex gap-4">
              {/* Month Select */}
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Month</SelectLabel>
                    {months.map((month, index) => (
                      <SelectItem key={index} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Day Select */}
              <Select>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Day</SelectLabel>
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Year Select */}
              <Select>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-5">
              {loading ? "Adding..." : "Add Medicine"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMedicine;
