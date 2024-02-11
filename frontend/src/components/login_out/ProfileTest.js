import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileTest = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        {user.nickname && <p>Nickname: {user.nickname}</p>}
        {user.given_name && <p>Given Name: {user.given_name}</p>}
        {user.family_name && <p>Family Name: {user.family_name}</p>}
        {user.locale && <p>Locale: {user.locale}</p>}
        {user.zoneinfo && <p>Time Zone: {user.zoneinfo}</p>}
        {user.updated_at && <p>Last Update: {new Date(user.updated_at).toLocaleString()}</p>}
        {user.address && <p>Address: {user.address}</p>}
        {user.phone_number && <p>Phone: {user.phone_number}</p>}
      </div>
    )
  );
};

export default ProfileTest;
