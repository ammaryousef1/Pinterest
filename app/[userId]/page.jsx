"use client"
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import UserProfile from '../Components/UserProfile';
import PinList from '../Components/Pin/PinList'
import { useAuth } from '../Context/ContextAuth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const Profile = (Props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [listOfPins, setListOfPins] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    
    if (Props.params) {
      getUserInfo(Props.params.userId.replace('%40', '@'));
    }
  }, [Props.params]);

  const getUserInfo = async (email) => {
    const docRef = doc(db, 'user', email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data() ;
      setUserInfo(userData);
    } else {
      console.error('No such document!');
    }
  };

  const getUserPins = async () => {
    const querySnapshot = await getDocs(collection(db, 'pinterest-post'));
    const pins = querySnapshot.docs.map((doc) => doc.data() );

    setListOfPins(pins);
  };

  useEffect(() => {
    getUserPins();
  }, [listOfPins.length]);

  return (
    <div>
      {userInfo ? <UserProfile userInfo={userInfo} /> : null}
      <PinList listOfPins={listOfPins} />
    </div>
  );
};

export default Profile;