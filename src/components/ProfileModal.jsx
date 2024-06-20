import React, { useState } from 'react';
import Modal from 'react-modal'; 
import './ProfileModal.css'; 

Modal.setAppElement('#root'); 

const ProfileModal = ({ isOpen, onClose, profile, updateProfile }) => {
  const [username, setUsername] = useState(profile.username || '');
  const [photoURL, setPhotoURL] = useState(profile.photoURL || '');
  const [description, setDescription] = useState(profile.description || '');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ username, photoURL, description });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="profile-modal">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de usuario:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Foto de perfil:
          <input type="file" onChange={handleFileChange} accept="image/*" />
          {photoURL && (
            <img src={photoURL} alt="Preview" className="photo-preview" />
          )}
        </label>
        <label>
          Descripción:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </label>
        <button type="submit">Guardar Cambios</button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
