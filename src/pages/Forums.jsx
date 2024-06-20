
import React, { useState, useEffect } from 'react';
import { useUser } from '../utils/UserContext';
import { db } from '../firebase';
import { collection, getDocs, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import './Forums.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Forums = () => {
  const user = useUser();
  const [forums, setForums] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false); 

  useEffect(() => {
    const fetchForums = async () => {
      const querySnapshot = await getDocs(collection(db, 'forums'));
      const forumsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setForums(forumsList);
    };

    fetchForums();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCreateForum = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("No hay usuario autenticado.");
      return;
    }
    await addDoc(collection(db, 'forums'), {
      title,
      content,
      authorId: user.uid,
      author: user.displayName || user.email,
      createdAt: serverTimestamp(),
    });
    setTitle('');
    setContent('');
    closeModal();
    const querySnapshot = await getDocs(collection(db, 'forums'));
    const forumsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setForums(forumsList);
  };

  const handleDeleteForum = async (forumId) => {
    try {
      await deleteDoc(doc(db, 'forums', forumId));
      const updatedForums = forums.filter(forum => forum.id !== forumId);
      setForums(updatedForums);
    } catch (error) {
      console.error("Error al eliminar el foro:", error.message);
    }
  };

  if (!user) {
    return <div>No hay usuario autenticado.</div>;
  }

  return (
    <div className="forums-container">
      <div className="user-profile-link">
        <Link to="/profile">
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="user-avatar" />
          ) : (
            <div className="default-avatar">User</div>
          )}
        </Link>
      </div>
      <h1 className="header">Forums</h1>
      <button className="create-forum-button" onClick={openModal}>Create Forum</button>
      <div className="forums-list">
        {forums.length === 0 ? (
          <p>No forums yet.</p>
        ) : (
          forums.map(forum => (
            <div key={forum.id} className="forum-item">
              <h2>{forum.title}</h2>
              <p>{forum.content}</p>
              <p>Created by {forum.author} on {new Date(forum.createdAt?.seconds * 1000).toLocaleString()}</p>
              {user.uid === forum.authorId && (
                <button className="delete-button" onClick={() => handleDeleteForum(forum.id)}>
                  <RiDeleteBinLine className="delete-icon" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Forums;
