import React from "react";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import { PageLoader } from "../../components/Loader";

import RootLayout from "../../layouts/RootLayout";

import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "./queries";

import { useAuth } from "../auth/context";

import "./ProfilePage.css";

function ProfilePage() {
  const { disconnect } = useAuth();
  const { data, loading } = useQuery(GET_PROFILE);

  if (loading) return <PageLoader />;

  const {
    profile: { avatarUrl, displayName, email },
  } = data;

  return (
    <RootLayout className="profile-page">
      <div className="profile-page__display-info mb-4">
        <Avatar src={avatarUrl} alt="Your avatar" />
        <div>
          <span className="profile-page__display-name">{displayName}</span>
          <div>{email}</div>
        </div>
      </div>

      <Button to="/profile/edit">Edit profile</Button>
      <Button onClick={() => disconnect()} className="ml-4">
        Disconnect
      </Button>

      {/* TODO Revoke all auth tokens */}
    </RootLayout>
  );
}

export default ProfilePage;
