import React, { useCallback, useState } from "react";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Loader, { PageLoader } from "../../components/Loader";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle,
} from "../../components/Modal";
import { CloseIcon } from "../../components/SvgIcon";

import { useMutation, useQuery } from "@apollo/client";
import { GET_PROFILE } from "./queries";
import { UPDATE_PROFILE } from "./mutations";

import "./ProfileEditPage.css";

function ProfileEditPage() {
  const { data, loading } = useQuery(GET_PROFILE);
  const [updateProfile, { loading: updateLoading, data: updateData }] =
    useMutation(UPDATE_PROFILE, { refetchQueries: [GET_PROFILE] });

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const displayName = formData.get("displayName");

      updateProfile({ variables: { attrs: { displayName } } });
    },
    [updateProfile]
  );

  if (loading) return <PageLoader />;

  const {
    profile: { avatarUrl, displayName, email },
  } = data;

  return (
    <form className="profile-edit-page" onSubmit={handleOnSubmit}>
      <ProfileAvatar src={avatarUrl} />
      <div className="mb-4">
        <Button color="feature" className="mr-4">
          Save profile
        </Button>
        {updateLoading && <Loader size="sm" />}
        {updateData && <span>Profile successfully updated !</span>}
      </div>
      <label>
        Display name
        <input
          name="displayName"
          defaultValue={displayName ?? ""}
          placeholder="John Doe"
          required
        />
      </label>

      <label>
        {/* TODO On click, start email change process */}
        Email address
        <input
          name="email"
          defaultValue={email ?? ""}
          placeholder="john.doe@example.com"
          disabled={true}
        />
      </label>

      <label>
        {/* TODO On click, start password change process */}
        Password
        <input
          type="password"
          defaultValue="I love anacounts !"
          disabled={true}
        />
      </label>
    </form>
  );
}

function ProfileAvatar({ src }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      <Button color="invisible" onClick={() => setOpen(true)}>
        <Avatar src={src} alt="Your avatar" />
      </Button>

      <Modal open={open} onBackdropClick={() => setOpen(false)}>
        <ModalHeader>
          <ModalTitle>Edit your avatar</ModalTitle>
          <CloseIcon onClick={() => setOpen(false)} />
        </ModalHeader>
        <ModalBody>
          <p>
            Anacounts uses{" "}
            <a href="https://gravatar.com/" target="_blank" rel="noreferrer">
              Gravatar
            </a>{" "}
            to display user avatars.
            <br />
            Gravatar is a service for providing globally unique avatars
          </p>
          <p>
            To edit your avatar, create{" "}
            <a
              href="https://gravatar.com/connect/"
              target="_blank"
              rel="noreferrer"
            >
              an account
            </a>{" "}
            and{" "}
            <a
              href="https://gravatar.com/emails/"
              target="_blank"
              rel="noreferrer"
            >
              personalize your Gravatar
            </a>
            .
          </p>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ProfileEditPage;