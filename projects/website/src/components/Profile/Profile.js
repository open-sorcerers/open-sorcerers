import React from 'react';
import { getUser } from '@services/auth';

export const Profile = ({}) => {
  const user = getUser();
  return (
    <>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {user.name}</li>
        <li>E-mail: {user.email}</li>
      </ul>
    </>
  );
};
export default Profile;
