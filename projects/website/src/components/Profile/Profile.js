import React from 'react'
import Auth from '@services/auth'

const auth = Auth()

export const Profile = ({}) => {
  const { getUser } = auth
  const user = getUser()
  return (
    <>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {user.name}</li>
        <li>E-mail: {user.email}</li>
      </ul>
    </>
  )
}
export default Profile
