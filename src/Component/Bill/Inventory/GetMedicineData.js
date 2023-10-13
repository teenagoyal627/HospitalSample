import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../Firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const GetMedicineData = async() => {
 const auth=getAuth();
 onAuthStateChanged(auth,async(user)=>{
  const userId=user.uid;
  console.log(userId)
 })
 
  const doc_refs=await getDocs(collection(db,"CreateInventory"));
  const result =[];
  // console.log(doc_refs)
  doc_refs.forEach((medicineData)=>{
    result.push({
      id:medicineData.id,
      ...medicineData.data()
    })
  })
  return result;
}

export default GetMedicineData
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { doc, getDoc, getDocs } from 'firebase/firestore';
// import React from 'react'
// import { db } from '../../../Firebase';

// const GetMedicineData = async() => {
//   const auth=getAuth();
//   onAuthStateChanged(auth,async(user)=>{
//     if(user){
//       const userId=user.uid;
//       console.log(userId);
//      const docRef= doc(db,"CreateInventory",userId);
//       const docSnap= await getDoc(docRef);
//       const result =[];
//       docSnap.forEach((medicineData)=>{
//         result.push({ 
//                 id:medicineData.id,
//                 ...medicineData.data()
//               })
//               return result;

//       })
//     }
//   })

// }
// export default GetMedicineData
