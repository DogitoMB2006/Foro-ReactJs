
import React from 'react';

const ProfileView = ({ profile }) => {
  if (!profile) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-view">
      <img src={profile.photoURL || 'default-profile.png'} alt="Foto de perfil" className="profile-photo" />
      <h2>{profile.username || "Usuario"}</h2>
      <p>{profile.description || "Sin descripción"}</p>
    </div>
  );
};

export default ProfileView;
