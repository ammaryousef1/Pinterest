"use client"
import Image from 'next/image'
import Header from './Components/Header'
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PinList from './Components/Pin/PinList'
import { db } from './firebaseConfig'
import { useAuth } from './Context/ContextAuth'
export default function Home() {
  const [listOfPins, setListOfPins] = useState([]);
  const {user} = useAuth()
  
  const getUserPins = async () => {
    const querySnapshot = await getDocs(collection(db, 'pinterest-post'));
    const pins = querySnapshot.docs.map((doc) => doc.data() , user);
    setListOfPins(pins);
  };

  useEffect(() => {
    getUserPins();
  }, [listOfPins]);

  return (
    <div className='pb-10 px-10'>
      <PinList  listOfPins={listOfPins} />
    </div>
   
  )
}

