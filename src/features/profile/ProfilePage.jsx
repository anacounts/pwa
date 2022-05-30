import React from "react";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import { PageLoader } from "../../components/Loader";

import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "./queries";

import "./ProfilePage.css";

function ProfilePage() {
  const { data, loading } = useQuery(GET_PROFILE);

  if (loading) return <PageLoader />;

  const {
    profile: { avatarUrl, displayName, email },
  } = data;

  return (
    <div className="profile-page">
      <div className="profile-page__display-info mb-4">
        <Avatar src={avatarUrl} alt="Your avatar" />
        <div>
          <span className="profile-page__display-name">{displayName}</span>
          <div>{email}</div>
        </div>
      </div>

      <Button to="/profile/edit" color="feature">
        Edit profile
      </Button>

      {/* TODO Revoke all auth tokens */}
    </div>
  );
}

export default ProfilePage;
