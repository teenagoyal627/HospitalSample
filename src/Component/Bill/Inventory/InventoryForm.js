import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useHistory } from "react-router";
import { db } from "../../../Firebase";
import Card from "../../UI/Card";
import classes from "./InventoryForm.module.css";
import Navigation from "../../Header/Navigation";
import { getAuth } from "firebase/auth";
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

  const AddHandler = async (e) => {
    e.preventDefault();
    try {
      const userId=getAuth().currentUser.uid;
     const dataRef= await addDoc(collection(db, "CreateInventory"), {
        MedicineName: medicineName,
        Quantity: quantity,
        Price: price,
        MFGDate: mfgDate,
        ExpireDate: expireDate,
        MG: mg,
        Company: company,
        Composition: composition,
        UserId:userId
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
