import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { db } from "../../../Firebase";
import Card from "../../UI/Card";
import classes from "./InventoryForm.module.css";
import Navigation from "../../Header/Navigation";
import { getAuth } from "firebase/auth";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
function InventoryForm() {
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [mfgDate, setMfgDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [mg, setMg] = useState("");
  const [company, setCompany] = useState("");
  const [composition, setComposition] = useState("");
  const history = useHistory();

  const location=useLocation();
  const {inventoryData}=location.state || {};
   console.log("the inventory form data is ",inventoryData)

//    const [formData,setFormData]=useState({
//     medicineName:'',
//     quantity:'',
//     price:'',
//     mfgDate:'',
//     expireDate:'',
//     mg:'',
//     company:'',
//     composition:'',
// })

// useEffect(()=>{
//   const fetchInventory=async()=>{
//     if(inventoryData){
//       try{
//         const inventoryDocRef =doc(db,'CreateInventory',inventoryData.id);
//         const inventoryDocSnap=await getDoc(inventoryDocRef);

//         if(inventoryDocSnap.exists()){
//           setFormData(inventoryDocSnap.data());
//         }else{
//           console.log('Document not found')
//         }
//       }catch(error){
//         console.log("Error fetching inventory data: ",error)
//       }
//     }
//   }
//   fetchInventory();
//   console.log(fetchInventory)
// },[inventoryData])

// const handleChange =(e)=>{
//   const{name,value}=e.target;
//   setFormData((prevData)=>({
//       ...prevData,
//       [name]:value,
//   }))
// }
  const AddHandler = async (e) => {
    e.preventDefault();
  if(inventoryData){
    const inventoryDocRef=doc(db,"CreateInventory",inventoryData.id)
    try{
      await updateDoc(inventoryDocRef,{
        MedicineName: medicineName,
        Quantity: quantity,
        Price: price,
        MFGDate: mfgDate,
        ExpireDate: expireDate,
        MG: mg,
        Company: company,
        Composition: composition,
      })
    
      alert("Successfully  Medicines  added in stock")
      history.replace('/inventory')
      setMedicineName("");
      setQuantity("");
      setPrice("");
      setMfgDate("");
      setExpireDate("");
      setMg("");
      setCompany("");
      setComposition("");
    } catch{
      alert("Please fill all and correct medicines data")
    }
  }else{

    try {
      const userId=getAuth().currentUser.uid;
      console.log(userId)
     const dataRef= await addDoc(collection(db, "CreateInventory"), {
        MedicineName: medicineName,
        Quantity: quantity,
        Price: price,
        MFGDate: mfgDate,
        ExpireDate: expireDate,
        MG: mg,
        Company: company,
        Composition: composition,
        UserID:userId
      });
      alert("Successfully  Medicines  added in stock")
      history.replace('/inventory')
      console.log(dataRef)
      console.log(dataRef.id)
      setMedicineName("");
      setQuantity("");
      setPrice("");
      setMfgDate("");
      setExpireDate("");
      setMg("");
      setCompany("");
      setComposition("");
    } catch{
      alert("Please fill all and correct medicines data")
    }
  }
    
  };
  return (
    <div>
      <Navigation/>
   
    <Card>
      <form className={classes.form} onSubmit={AddHandler}>
        <div>
          <h1 className={classes.heading}>Inventory Form</h1>
        </div>
        <div className={classes.control}>
          <label>Medicine Name</label>
          <input
            type="text"
            required
            id="medicineName"
            value={medicineName}
            // onChange={handleChange}
            onChange={(e) => setMedicineName(e.target.value)}

          />
        </div>

        <div className={classes.control}>
          <label>Quantity</label>
          <input
            type="number"
            required
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label>Price(per Medicine) </label>
          <input
            type="number"
            min="1"
            required
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label>Mfg. Date</label>
          <input
            type="date"
            required
            id="mfg"
            value={mfgDate}
            onChange={(e) => setMfgDate(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label>Expire Date</label>
          <input
            type="date"
            required
            id="expire"
            value={expireDate}
            onChange={(e) => setExpireDate(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label>MG</label>
          <input
            type="number"
            required
            id="mg"
            value={mg}
            onChange={(e) => setMg(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label>Campany </label>
          <input
            type="text"
            required
            id="campany"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label>Composition </label>
          <input
            type="text"
            required
            id="composition"
            value={composition}
            onChange={(e) => setComposition(e.target.value)}
          />
        </div>
        
        <button type="submit">Save</button>
      </form>
    </Card>
    </div>
  );
}
export default InventoryForm;
