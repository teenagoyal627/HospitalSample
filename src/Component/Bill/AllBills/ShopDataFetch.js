import { getAuth } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../Firebase'

const ShopDataFetch = () => {
    const [shopData, setShopData] = useState(null);
          const userId=getAuth().currentUser.uid
      useEffect(()=>{
        async function fetchShopDetails(){
          try{
            if(userId){
            const querySnapshot=await getDocs(
             query(
               collection(db
                ,"ShopDetails"), where('UserID','==', userId)))
            
            const shopDetails=querySnapshot.docs.map((doc)=>doc.data());
              setShopData(shopDetails)
              if (shopDetails.length > 0) {
                setShopData(shopDetails[0]); // Set the first shop detail from the array
              } 
             }
            }catch{
                console.log("error")

            }
        }
    fetchShopDetails()
    })
      
   return shopData;
}

export default ShopDataFetch
