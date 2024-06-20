// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../utils/UserContext';
import useProfile from '../utils/useProfile';
import ProfileView from '../components/ProfileView';
import ProfileModal from '../components/ProfileModal';
import './Profile.css';

const Profile = () => {
  const { userId } = useParams();
  const user = useUser();
  const { profile, loading, error, updateProfile } = useProfile(userId || user?.uid);
  const [isEditing, setIsEditing] = useState(false); 

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const isOwner = user && user.uid === userId;

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      {isOwner && (
        <button onClick={handleEditProfile}>Editar Perfil</button>
      )}
      {isEditing && (
        <ProfileModal isOpen={isEditing} onClose={handleCloseModal} profile={profile} updateProfile={updateProfile} />
      )}
      {isOwner ? (
        <ProfileView profile={profile} />
      ) : (
        <ProfileView profile={profile} />
      )}
    </div>
  );
};

export default Profile;
