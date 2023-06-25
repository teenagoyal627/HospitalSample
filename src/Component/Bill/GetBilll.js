import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";

export default  async function GetAllBills(){

     const doc_refs=await getDocs(collection(db,"CreateBillDetails"))
    const result =[]
    doc_refs(bill=>{
        result.push({
            id:bill.id,
            ...bill.data()
        })
    })
    return result
}