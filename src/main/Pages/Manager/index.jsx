import { useEffect } from "react";
import CMRoutes from "./CMRoutes";
import { Route, Link, Routes, useLocation } from 'react-router-dom'
import ContentWrapper from "./components/ContentWrapper";
const ClinicManager = () =>
{
  const location = useLocation();
  const { hash, pathname, search } = location;
  useEffect(() =>
  {
    console.log({ hash, pathname, search, location })
  }, [])
  return (
    <>
      <div className="grid grid-cols-5 gap-x-0.5 h-full w-full ">
        <div className=" ">
          <nav className="h-screen bg-primary/50">
            <ul className="text-center ">
              <li className="font-extrabold text-xl ">
                <Link to="/clinic-manager/schedule-doctor">
                  <span>
                    Doctor
                  </span>
                </Link>
              </li>
              <li className="font-extrabold text-xl ">
                <Link to="/clinic-manager/schedule-staff">
                  <span>
                    Staff
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
          <div className="col-span-4 border-2 h-full w-full bg-gray-50 px-4 py-4 overflow-auto">
        {/* <ContentWrapper > */}
            <CMRoutes />
        {/* </ContentWrapper> */}
          </div>
      </div>
    </>
  )
}

export default ClinicManager;