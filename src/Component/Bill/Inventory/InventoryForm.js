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
  const history = useHistory();
  const location = useLocation();
  const { inventoryData } = location.state || {};
  console.log("the inventory form data is  ", inventoryData)

  const [formData, setFormData] = useState({
    medicineName: "",
    quantity: "",
    price: "",
    mfgDate: "",
    expireDate: "",
    mg: "",
    company: "",
    composition: "",
  });

  useEffect(()=>{
    const fetchInventory=async()=>{
      if(inventoryData){
        try{
          const inventoryDocRef =doc(db,'CreateInventory',inventoryData.id);
          const inventoryDocSnap=await getDoc(inventoryDocRef)
  
          if(inventoryDocSnap.exists()){
            const data=inventoryDocSnap.data();
            setFormData({
              medicineName:data.MedicineName,
              quantity:data.Quantity,
              price:data.Price,
              mfgDate:data.MFGDate,
              expireDate:data.ExpireDate ,
              mg:data.MG,
              company:data.Company,
              composition:data.Composition

            })
            // console.log(inventoryDocSnap.data().MedicineName)
            // console.log(inventoryData.MedicineName)
          }else{
            console.log('Document not found')
          }
        }catch(error){
          console.log("Error fetching inventory data: ",error)
        }
      }
    }
    fetchInventory();
  },[inventoryData])
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const AddHandler = async (e) => {
    e.preventDefault();

    if (inventoryData) {
      const inventoryDocRef = doc(db, "CreateInventory", inventoryData.id);
      try {
        await updateDoc(inventoryDocRef, {
          MedicineName: formData.medicineName,
          Quantity: formData.quantity,
          Price: formData.price,
          MFGDate: formData.mfgDate,
          ExpireDate: formData.expireDate,
          MG: formData.mg,
          Company: formData.company,
          Composition: formData.composition,
        });

        alert("Successfully Medicines updated in the stock");
        history.replace("/inventory");
      } catch {
        alert("Please fill all and correct medicines data");
      }
    } else {
      // This is an add operation....
      try {
        const userId = getAuth().currentUser.uid;

        const dataRef = await addDoc(collection(db, "CreateInventory"), {
          MedicineName: formData.medicineName,
          Quantity: formData.quantity,
          Price: formData.price,
          MFGDate: formData.mfgDate,
          ExpireDate: formData.expireDate,
          MG: formData.mg,
          Company: formData.company,
          Composition: formData.composition,
          UserID: userId,
        });
        alert("Successfully  Medicines  added in stock")
      history.replace('/inventory')
      console.log(dataRef)
      console.log(dataRef.id)
      } catch {
        alert("Please fill all and correct medicines data");
      }
    }
  };

  return (
    <div>
      <Navigation />
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
              value={formData.medicineName}
              onChange={handleChange}
              name="medicineName"
            />
          </div>

          <div className={classes.control}>
          <label>Quantity</label>
          <input
            type="number"
            required
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            name="quantity"
          />
        </div>
        <div className={classes.control}>
          <label>Price(per Medicine) </label>
          <input
            type="number"
            min="1"
            required
            id="price"
            value={formData.price}
            onChange={handleChange}
            name="price"
          />
        </div>
        <div className={classes.control}>
          <label>Mfg. Date</label>
          <input
            type="date"
            required
            id="mfg"
            value={formData.mfgDate}
            onChange={handleChange}
            name="mfgDate"
          />
        </div>
        <div className={classes.control}>
          <label>Expire Date</label>
          <input
            type="date"
            required
            id="expire"
            value={formData.expireDate}
            onChange={handleChange}
            name="expireDate"
          />
        </div>
        <div className={classes.control}>
          <label>MG</label>
          <input
            type="number"
            required
            id="mg"
            value={formData.mg}
            onChange={handleChange}
            name="mg"
          />
        </div>
        <div className={classes.control}>
          <label>Campany </label>
          <input
            type="text"
            required
            id="campany"
            value={formData.company}
            onChange={handleChange}
            name="company"
          />
        </div>
        <div className={classes.control}>
          <label>Composition </label>
          <input
            type="text"
            required
            id="composition"
            value={formData.composition}
            onChange={handleChange}
            name="composition"
          />
        </div>

          <button type="submit">Save</button>
        </form>
      </Card>
    </div>
  );
}

export default InventoryForm;
