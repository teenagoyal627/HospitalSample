//this file is not in use i make this for experiment
import { getAuth } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../Firebase'
// import ShopData from './ShopData'


const useShopDataFetch = () => {
    const[userUid,setUserUid]=useState()
    const [shopData, setShopData] = useState(null);
   console.log("shop dataFetch wale funciton me entry ho gyi hai ")
    useEffect(()=>{
        //function to fetch the authentication user's uid
        const fetchUserUid=()=>{
          //get the currently authenticated user
          const auth=getAuth();
          const user=auth.currentUser;
          console.log(user)
          if(user){
            setUserUid(user.uid)
            console.log(user.uid)
          }
        }
          fetchUserUid();
      },[])

      console.log("fetch kr sha hai shop details ko ")
      useEffect(()=>{
        async function fetchShopDetails(){
          try{
            if(userUid){
            //   console.log(userUid)
              //use useruid as a filter to fetch the shop details for the current user
            const querySnapshot=await getDocs(
             query(
               collection(db
                ,"ShopDetails"), where('UserID','==', userUid)))
            
            const shopDetails=querySnapshot.docs.map((doc)=>doc.data());
              setShopData(shopDetails)
              console.log("shop details of currently logged in users", shopDetails);
              if (shopDetails.length > 0) {
                setShopData(shopDetails[0]); // Set the first shop detail from the array
                console.log("shop details of currently logged in users", shopDetails[0]);
              } else {
                console.log("No shop details found for the current user.");
              }
             }
            }catch{
                console.log("error")

            }
        }
    fetchShopDetails()
    },[userUid])
      
   return shopData;
}

export default useShopDataFetch
