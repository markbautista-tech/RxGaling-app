import React, { useEffect, useState } from "react";

import
{
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import userDetails from "../../../../utils/data/userDetails";
import fetchSpecialty from "../../../../utils/data/fetch/fetchSpecialty";
import EditBtn from "../../Forms/components/Buttons/EditBtn";
import DeleteBtn from "../../Forms/components/Buttons/DeleteBtn";
import DoctorSchedule from "../../Forms/components/FormDialog/DoctorSchedule";
import InorOut from "../../Forms/components/FormDialog/InorOut";
import { Checkbox } from "@/components/ui/checkbox"


const UsersCard = () =>
{
  const [ userData, setUserData ] = useState([]);
  const [ userSpecialization, setUserSpecialization ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ fetchError, setFetchError ] = useState(null);

  useEffect(() =>
  {
    const getData = async () =>
    {
      try
      {
        const userDataToDisplay = await userDetails();
        // const userSpecialty = await fetchSpecialty();
        setUserData(userDataToDisplay);
        // setUserSpecialization(userSpecialty);
        // console.log(userSpecialty);
      } catch (error)
      {
        setFetchError("Failed to fetch user data.");
      } finally
      {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // const getUserSpecialty = (userId) => {
  //   const userSpec = userSpecialization.find(
  //     (specialty) => specialty.user_id === userId
  //   );
  //   return userSpec ? userSpec.specialty : "No Specialty";
  // };
  const handleEdit = (payload) =>
  {
    console.log(payload)
  }
  const handleDelete = (payload) =>
  {
    console.log(payload)
  }
  return (
    <>
      <div className="space-y-4 h-96  ">
        {userData.map((user, index) => (
          <div key={user.id} className="bg-transparent border-2 border-primary hover:bg-primary hover:border-none hover:text-white  rounded-lg shadow-xl  transition-all delay-100 cursor-pointer px-6 py-2">
            <div className=" flex justify-between items-end ">
              <div className="">
                <div className="capitalize font-bold text-xl">
                  {user.last_name} {user.first_name}
                </div>
                <div className="capitalize">
                  <p className="italic text-base">
                    ROLE HERE
                  </p>
                </div>
                <div className="italic text-sm">
                  {user.Specialty.length === 0 ? <><b>Specialty Not Applicable</b></> : <>
                    <div className="font-bold text-sm">
                      Specialties:
                    </div>
                    <ul className="flex text-xs list-disc px-4">
                      {user.Specialty.map((special, index) =>
                      {
                        return (
                          <>
                            <li className="pr-4" key={index}>

                              {special.specialty}
                            </li>
                          </>
                        )
                      })}
                    </ul>
                  </>}
                </div>
                <div className="italic text-sm">
                  {user.Specialty.length === 0 ? <><b>Specialty Not Applicable</b></> : <>
                    <div className="font-bold text-sm">
                      Schedule/s:
                    </div>
                    <ul className="flex text-xs list-disc space-x-4 mx-4">
                      <li className="pr-4">
                        <Toggle aria-label="Toggle bold">

                          Monday 8am - 3 pm
                        </Toggle>
                      </li>
                      <li className="pr-4">
                        <Toggle aria-label="Toggle bold">

                          wednesday 8am - 3 pm
                        </Toggle>
                      </li>
                      <li className="pr-4">
                        <Toggle aria-label="Toggle bold">

                          Saturday 8am - 3 pm
                        </Toggle>
                      </li>
                    </ul>
                  </>}
                </div>
              </div>
              <div className="">
                {/* <EditBtn tooltip="Edit Schedule" handleClick={() => handleEdit(user)} /> */}
                <InorOut />
                <DoctorSchedule />
                <DeleteBtn handleClick={() => handleDelete(user)} />
              </div>
            </div>
            {/* <div className="flex space-x-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="id" />
                <label
                  htmlFor="in"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  In
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="out" />
                <label
                  htmlFor="out"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Out
                </label>
              </div>
              <Button variant="outlined">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                </svg>
                Save Changes
              </Button>
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersCard;
