import React from "react";
import Sidebar from "../Sidebar";
import PageHeader from "../PageHeader";
import ContentRouter from "../ContentRouter/router";

const PageTemplate = () => {
  return (
    <>
      <div className="lg:flex w-screen h-screen no-scrollbar">
        <Sidebar />
        <div className="w-full">
          <PageHeader />
          <div className="lg:pt-12 lg:px-10 lg:ml-[250px] h-full pt-10 px-5 mb-10 no-scrollbar">
            <ContentRouter />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageTemplate;
