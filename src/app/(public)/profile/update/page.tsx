import EditProfileForm from "@/components/forms/EditProfileForm";
import React from "react";

type Props = {};

const UpdateProfile = (props: Props) => {
  return (
    <div className="common-container max-w-5xl mx-auto">
      <h3 className="h3-bold md:h2-bold w-full">Edit Profile</h3>
      <EditProfileForm />
    </div>
  );
};

export default UpdateProfile;
