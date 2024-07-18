import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../Firebase";
import { getAuth } from "firebase/auth";

export async function GetAllBills() {
//  console.log("get all nill functin is call")
  try {
    const userId=getAuth().currentUser.uid;
    const billRef=collection(db,"CreateBillDetails")
    const q=query(billRef,where("UserID","==",userId))
    const querySnapshot=await getDocs(q)
    
    const result = [];
    querySnapshot.forEach((bill) => {
      result.push({
        id: bill.id,
        ...bill.data(),
      });
    });

    return result;
  } catch (error) {
    console.error("Error getting bills:", error);
    return [];
  }
}
