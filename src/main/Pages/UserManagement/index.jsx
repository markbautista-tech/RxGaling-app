import React, { useEffect, useState } from "react";
import ContentTitle from "../../PageContent/ContentTitle";

import SearchBar from "../components/Search";
import { SelectClinic } from "../components/SelectClinic";
import { TbMenu2, TbX } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import AddUser from "./components/AddUser";
import UserCard from "./components/userCard";
import { RoleFilter } from "../components/Filter";
import { Label } from "@/components/ui/label";
import
  {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
  } from "@/components/ui/select";
import fetchRole from "@/utils/data/fetch/fetchRole";
import { CiFilter } from "react-icons/ci";
import { useUser } from "@/context/UserContext";

const UserManagement = () =>
{
  const { user, setUser, role, email } = useUser();
  const [ showMenu, setShowMenu ] = useState(false);
  const [ roleData, setRoleData ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ fetchError, setFetchError ] = useState(null);


  const toggleMenu = () =>
  {
    setShowMenu(!showMenu);
  };

  useEffect(() =>
  {
    const getRoles = async () =>
    {
      try
      {
        const roles = await fetchRole();
        setRoleData(roles);
      } catch (error)
      {
        setFetchError("Failed to fetch roles.");
      }
    };
    getRoles();
  }, []);
  useEffect(() =>
  {
    const filter = roleData.filter(val => val.role !== role)
    setRoleData(filter)
  }, [ roleData ])

  return (
    <>
      <div className="">
        <div className="py-2 lg:py-4 flex justify-between items-center">
          <ContentTitle title={"User Management"} />
          <div className="relative flex ">
            <div className="flex items-center gap-2">
              {/* <SearchBar /> */}
              <div className="hidden lg:block">
                <div className="flex gap-3">
                  {
                    role === "admin" || role === 'Clinic Administrator' ? <AddUser /> : null
                  }

                  {/* <SelectClinic /> */}
                </div>
              </div>
              <div className="relative">
                {showMenu ? (
                  <TbX className="w-8 h-8 lg:hidden" onClick={toggleMenu} />
                ) : (
                  <TbMenu2 className="w-8 h-8 lg:hidden" onClick={toggleMenu} />
                )}

                {showMenu && (
                  <div className="bg-primary-foreground shadow-md p-3 rounded-b-md absolute top-10 right-0 flex flex-col gap-3">
                    <div className="w-full">
                      <AddUser />
                    </div>
                    {/* <div className="w-full">
                      <SelectClinic />
                    </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Separator orientation="horizontal" className="w-full" />
        <div className="lg:p-5 ">
          <div className="flex justify-end w-full py-3">
            {/* <RoleFilter /> */}
            <div className="space-y-2 w-44 flex items-center gap-3">
              <CiFilter className="w-7 h-7" />
              <Select id="role" className="">
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
          </div>
          <div className=" lg:p-5 max-h-full">
            <UserCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
