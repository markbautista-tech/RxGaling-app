import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import userDetails from "../../../../utils/data/userDetails";
import fetchSpecialty from "../../../../utils/data/fetch/fetchSpecialty";

const UserCard = () => {
  const [userData, setUserData] = useState([]);
  const [userSpecialization, setUserSpecialization] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const userDataToDisplay = await userDetails();
        const userSpecialty = await fetchSpecialty();
        setUserData(userDataToDisplay);
        setUserSpecialization(userSpecialty);
        // console.log(userSpecialty);
      } catch (error) {
        setFetchError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const getUserSpecialty = (userId) => {
    const userSpec = userSpecialization.find(
      (specialty) => specialty.user_id === userId
    );
    return userSpec ? userSpec.specialty : "No Specialty";
  };

  return (
    <>
      <div className="space-y-3">
        {userData.map((users, ids) => (
          <div key={ids}>
            <div className="rounded-sm lg:rounded-md border border-primary shadow-lg hover:scale-105 transition-all p-5 flex cursor-pointer">
              <div>
                <p className="text-md font-bold lg:text-lg">
                  {users.last_name}
                </p>
                <p>{users.first_name}</p>
                <p>{getUserSpecialty(users.id)}</p>
              </div>
              <div>
                <p>Schedule:</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserCard;
