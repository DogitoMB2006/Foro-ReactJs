import React from 'react';
import { useUser } from '../utils/UserContext';
import useProfile from '../utils/useProfile';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';

const Profile = ({ userId }) => {
  const user = useUser();
  const { profile, loading, error, updateProfile } = useProfile(userId);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const isOwner = user && user.uid === userId;

  return (
    <div className="profile-container">
      {isOwner ? (
        <ProfileEdit profile={profile} updateProfile={updateProfile} />
      ) : (
        <ProfileView profile={profile} />
      )}
    </div>
  );
};

export default Profile;
