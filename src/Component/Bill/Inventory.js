import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useHistory } from "react-router";
import { db } from "../../Firebase";
import Card from "../UI/Card";
import classes from './Inventory.module.css'
function Inventory() {
    
    const[MedicineName,setMedicineName]=useState("")
    const[Amount,setAmount]=useState("")
    const[Price,setPrice]=useState("")
    const[ExpireDate,setExpireDate]=useState("")
    const[Stoke,setStoke]=useState("")
    const history=useHistory()

    const SaveHandler=async(event)=>{
         event.preventDefault();
         setMedicineName('')
         setAmount('')
         setPrice('')
         setExpireDate('')
         setStoke('')

         try{
            await addDoc(collection(db,'CreateInventory'),
            {
                  MedicineName:MedicineName,
                  Amount:Amount,
                  Price:Price,
                  ExpireDate:ExpireDate,
                  Stoke:Stoke
            })
         }catch{
            history.replace('/signup')
         }
    }
    return (
     <Card>
            <form className={classes.form} onSubmit={SaveHandler}>
                <div className={classes.control}>
                    <label htmlFor="medicineName">Medicine Name</label>
                    <input type='text' 
                    required id='medicineName'
                    value={MedicineName}
                    onChange={(evnet)=>setMedicineName(evnet.target.value)} />
                </div>

                <div className={classes.control}>
                    <label htmlFor="number">Amount</label>
                    <input type='number' 
                    required id='amount'
                    value={Amount}
                    onChange={(evnet)=>setAmount(evnet.target.value)}
                     />
                </div>
                <div className={classes.control}>
                    <label htmlFor="price">Price </label>
                    <input type='number' min='1' 
                    required id='price' 
                    value={Price}
                    onChange={(evnet)=>setPrice(evnet.target.value)}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="expire">Expire Date</label>
                    <input type='date'
                     required id='expire'
                     value={ExpireDate}
                    onChange={(evnet)=>setExpireDate(evnet.target.value)} />
                </div>

                <div className={classes.control}>
                    <label htmlFor="stoke">Stoke </label>
                    <input type='number' 
                    required id='stoke'
                    value={Stoke}
                    onChange={(evnet)=>setStoke(evnet.target.value)}
                     />
                </div>
                <div className={classes.actions}>
                    <button type="submit">Save</button>
                </div>

            </form>
        </Card>
    )

}
export default Inventory;