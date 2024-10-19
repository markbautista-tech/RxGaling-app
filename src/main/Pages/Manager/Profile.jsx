import ContentTitle from "../../PageContent/ContentTitle";
import ProfileManagementManager from "../ProfileManagement/Manager"

const Profile = () =>
{
  return (
    <>
      <div className="">
        <div className="py-4 ">
          <ContentTitle title="Profile management" />
        </div>
        <ProfileManagementManager />
      </div>
    </>
  )
}
export default Profile;