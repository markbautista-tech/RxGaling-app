import React from "react";

const DoctorCard = ({ profile, name, specialty }) => {
  return (
    <>
      <div className="bg-primary">
        <div>
          <img src={profile} alt="" />
        </div>
        <div>
          <span>{name}</span>
          <span>{specialty}</span>
        </div>
      </div>
    </>
  );
};

export default DoctorCard;
