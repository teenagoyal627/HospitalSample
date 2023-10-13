import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../Firebase";

export async function GetAllBills() {
 
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "CreateBillDetails"), 
      orderBy("Date"))
    );

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
