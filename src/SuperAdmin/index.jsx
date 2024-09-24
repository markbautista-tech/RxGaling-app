import React from "react";
import PageHeader from "../main/PageHeader";
import ContentTitle from "../main/PageContent/ContentTitle";

const SuperAdmin = () => {
  return (
    <>
      <div>
        <div>
          <PageHeader />
        </div>
        <div>
          <div className="px-6 py-6 lg:px-10">
            <ContentTitle title={"Clinics"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdmin;
