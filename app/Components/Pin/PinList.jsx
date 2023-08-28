import React, { useEffect } from 'react';
import { db } from '../../firebaseConfig'
import Image from 'next/image';
import PinItem from './PinItem';
const PinList = ({ listOfPins }) => {
  
  return (
    <div className='mt-7 px-2 md:px-5
     columns-2 md:columns-3 lg:col-span-4 
     xl:columns-3 space-y-6 mx-auto' >
      {listOfPins.map((pin) => (
         <PinItem pin={pin} />
      ))}
    </div>
  );
};

export default PinList;