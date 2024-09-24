import React, { useEffect, useState } from "react";
import fetchRole from "../../../utils/data/fetch/fetchRole";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

import { TbFilter } from "react-icons/tb";

export const RoleFilter = () => {
  const [roleData, setRoleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const roles = await fetchRole();
        setRoleData(roles);
      } catch (error) {
        setFetchError("Failed to fetch roles.");
      } finally {
        setLoading(false);
      }
    };
    getRoles();
  }, []);

  return (
    <>
      <div>
        <Popover>
          <PopoverTrigger asChild className="w-[100px]">
            <Button
              variant=""
              className="flex items-center gap-2 bg-primary/50 text-black"
            >
              <TbFilter className="h-4 w-4" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-4 space-y-4">
            <h3 className="text-lg font-medium">Filter Options</h3>
            <div className="space-y-2">
              <Label htmlFor="role">Roles</Label>
              <Select id="role">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {roleData.map((roles, ids) => (
                      <div key={ids}>
                        <SelectItem value={roles.role}>{roles.role}</SelectItem>
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Reset</Button>
              <Button>Apply</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
