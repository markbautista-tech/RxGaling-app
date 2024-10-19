import ContentTitle from "../../../PageContent/ContentTitle"
import SearchBar from "../../components/Search"
import UsersCard from "../../UserManagement/components/UsersCard2"

const SchedulingStaff = () =>
{
  return (
    <>
      <div className="">
        <div className="py-4 flex justify-between items-center">
          <div className="">
            <ContentTitle title="Scheduling Staff" />
          </div>
          <div className="flex justify-center items-center ">
            <div className="">
              <SearchBar />
            </div>
            <div className="">
              {/* <AddUser /> */}
            </div>
          </div>
        </div>

        <UsersCard />
      </div>
    </>
  )
}
export default SchedulingStaff