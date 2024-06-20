
import React, { useState } from 'react';
import './ProfileEdit.css'; 

const ProfileEdit = ({ profile, updateProfile }) => {
  const [username, setUsername] = useState(profile.username || '');
  const [photoURL, setPhotoURL] = useState(profile.photoURL || '');
  const [description, setDescription] = useState(profile.description || '');
  const [imagePreview, setImagePreview] = useState(profile.photoURL || null);
  const [imageFile, setImageFile] = useState(null); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (imageFile) {
      const uploadTask = uploadProfileImage(imageFile); 
      uploadTask.then((url) => {
        updateProfile({ username, photoURL: url, description });
      }).catch((error) => {
        console.error("Error al subir la imagen:", error);
      });
    } else {
   
      updateProfile({ username, photoURL, description });
    }
  };

  const uploadProfileImage = async (file) => {

    return new Promise((resolve, reject) => { // una simulacion sigo manana
      setTimeout(() => {
        const url = `https://via.placeholder.com/150?text=Uploaded+Image`;
        resolve(url);
      }, 2000); 
    });
  };

  return (
    <div className="profile-edit">
      <form onSubmit={handleSubmit}>
        <div className="image-preview-container">
          <img src={imagePreview || (profile.photoURL || 'default-profile.png')} alt="Preview" className="image-preview" />
        </div>
        <label>
          Nombre de usuario:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Subir foto de perfil:
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </label>
        <label>
          Descripción:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
