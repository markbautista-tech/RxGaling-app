import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import
{
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import regForm from '../hooks/regForm'
import { useEffect, useState } from "react"
import UsersCard from "../../UserManagement/components/UsersCard2"
import ContentTitle from "../../../PageContent/ContentTitle"
import SearchBar from "../../components/Search"
import AddUser from "../../UserManagement/components/AddUser"
const SchedulingDoctor = () =>
{
  const form = regForm();
  // const [ date, setDate ] = useState(new Date())

  // useEffect(()=>{console.log(date)},[date])
  return (
    <>
      <div className="">
        <div className="py-4 flex justify-between items-center">
          <div className="">
            <ContentTitle title="Scheduling Doctor" />
          </div>
          <div className="flex justify-center items-center">
            <div className="">
              <SearchBar />
            </div>
            <div className="">
              <AddUser />
            </div>
          </div>
        </div>

        <UsersCard />
      </div>
    </>
  )
}
export default SchedulingDoctor