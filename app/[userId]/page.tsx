'use client';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import UserProfile from '../Components/UserProfile';
import PinList from '../Components/Pin/PinList';
import { useAuth } from '../Context/ContextAuth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const Profile = (props) => {
  const [userInfo, setUserInfo] = useState();
  const [listOfPins, setListOfPins] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (props.params) {
      getUserInfo(props.params.userId.replace('%40', '@'));
    }
  }, [props.params]);

  const getUserInfo = async (email) => {
    const docRef = doc(db, 'user', email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserInfo(docSnap.data(), user);
    } else {
      console.error('No such document!');
    }
  };

  const getUserPins = async () => {
    const querySnapshot = await getDocs(collection(db, 'pinterest-post'));
    const pins = querySnapshot.docs.map((doc) => doc.data(), user);
    setListOfPins(pins);
  };

  useEffect(() => {
    getUserPins();
  }, [listOfPins]);

  return (
    <div>
      {userInfo ? <UserProfile userInfo={userInfo} /> : null}
      <PinList listOfPins={listOfPins} />
    </div>
  );
};

export default Profile;
