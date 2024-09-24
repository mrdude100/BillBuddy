import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, onValue, push } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export const FirebaseContext = createContext();
export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(`Error signing up: ${error.message}`);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(`Error logging out: ${error.message}`);
    }
  };

  const [data, setData] = useState({});

  const addData = async (key, newData) => {
    try {
      const dataRef = ref(database, key);
      await push(dataRef, newData); // Push the new data to the database
    } catch (error) {
      throw new Error(`Error adding data to Firebase: ${error.message}`);
    }
  };

  const fetchData = (key) => {
    return new Promise((resolve, reject) => {
      const dataRef = ref(database, key);
      onValue(
        dataRef,
        (snapshot) => {
          if (snapshot.exists()) {
            resolve(snapshot.val());
          } else {
            reject(new Error("Data not found"));
          }
        },
        (error) => {
          reject(new Error(`Error fetching data: ${error.message}`));
        }
      );
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        data,
        addData,
        fetchData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
