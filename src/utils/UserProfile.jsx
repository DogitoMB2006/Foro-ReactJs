
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const useProfile = (userId) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "profiles", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          setError("Profile not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const updateProfile = async (newProfileData) => {
    try {
      const docRef = doc(db, "profiles", userId);
      await updateDoc(docRef, newProfileData);
      setProfile({ ...profile, ...newProfileData });
    } catch (err) {
      setError(err.message);
    }
  };

  return { profile, loading, error, updateProfile };
};

export default useProfile;
