import React, { useCallback, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { GET_PROFILE } from "./queries";

import Loader, { PageLoader } from "../../components/Loader";

import "./ProfilePage.css";
import Fab from "../../components/fab/Fab";
import SvgIcon from "../../components/SvgIcon";
import FabContainer from "../../components/fab/FabContainer";
import { UPDATE_PROFILE } from "./mutations";

function ProfilePage() {
  const [editMode, setEditMode] = useState(false);

  const { data, loading } = useQuery(GET_PROFILE);
  const [updateProfile, { loading: updateLoading }] = useMutation(
    UPDATE_PROFILE,
    { refetchQueries: [GET_PROFILE] }
  );

  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (editMode) return;

      const formData = new FormData(event.currentTarget);
      const displayName = formData.get("displayName");

      updateProfile({ variables: { displayName } });
    },
    [editMode, updateProfile]
  );

  if (loading) return <PageLoader />;

  const {
    profile: { avatarUrl, displayName, email },
  } = data;

  return (
    <form
      className="profile-page"
      onSubmit={handleFormSubmit}
      role={editMode ? undefined : "none"}
    >
      <div className="profile-page__display-info">
        <img
          className="profile-page__avatar"
          src={avatarUrl}
          alt="Your avatar"
          // TODO On click in edit mode, display a modal to send to gravatar
        />
        <div>
          <input
            name="displayName"
            className="profile-page__display-name"
            defaultValue={displayName ?? ""}
            placeholder="No name defined"
            readOnly={!editMode}
            tabIndex={editMode ? "0" : "-1"}
            required
          />
          {/* On click in edit mode, display modal, start change email process */}
          <div>{email}</div>
        </div>
      </div>
      {/* TODO Change password */}
      {/* TODO Revoke all auth tokens */}
      <FabContainer>
        <Fab
          onClick={() => setEditMode(!editMode)}
          type={editMode ? "submit" : undefined}
        >
          {updateLoading ? (
            <Loader color="contrast" size="sm" />
          ) : (
            <SvgIcon className="fab__icon">
              {editMode ? (
                // icon:content-save
                <path
                  fill="currentColor"
                  d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"
                />
              ) : (
                // icon:pencil
                <path
                  fill="currentColor"
                  d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                />
              )}
            </SvgIcon>
          )}
        </Fab>
      </FabContainer>
    </form>
  );
}

export default ProfilePage;
