import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './Inventories.css'
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import Navigation from '../../Header/Navigation';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../Firebase';

const Inventory = () => {
    
    const[inventory,setInventory]=useState([]);
    // const[hasInventory,setHasInventory]=useState(false);
    const history=useHistory();

    
    const editHandler=(inventoryData)=>{
        console.log("edit button is clicked")
        history.replace({
            pathname:"/inventoryForm",
            state:{inventoryData},})
    }

    const deleteFromFirestore=async(id)=>{
        try{
            await deleteDoc(doc(db,"CreateInventory",id));
            alert("Medicine deleted successfully")
            //console.log("document successfully deleted from firestore")
        }catch(error){
            alert("Error occur when deleting the medicine",error)
        }
    }
    const deleteHandler=async(index,id)=>{
        //console.log("delete button clicked");
        await deleteFromFirestore(id);
        setInventory((prev)=>prev.filter((_,idx)=>idx!== index));
    }
    
    useEffect(() => {
        const fetchInventory = async () => {
            try{
          const userId = getAuth().currentUser.uid; 
          //console.log("the user id in inventory",userId)
          const inventoryRef = collection(db, "CreateInventory");
          //console.log("the inventory Ref in inventory is ",inventoryRef)
          const q = query(inventoryRef, where("UserID", "==", userId));
          //console.log("the data in q are ",q)
          const querySnapshot = await getDocs(q);
          //console.log(querySnapshot)

          const inventoryData = [];
          querySnapshot.forEach((doc) => {
            inventoryData.push({ id: doc.id, ...doc.data() });
          });
    
          setInventory(inventoryData);
         // console.log("inventory data are ",inventoryData)
        //   setHasInventory(inventoryData.length>0)
        }catch(error){
            console.log(error)
        }
        };
    
        fetchInventory();
        //console.log("the fetched data re ",data)
      }, []);
  return (
    <div>
    <Navigation/>
    {(inventory.length === 0) ? (
      <div className='message-container'>
        <div className="message">
          Add the inventories on the store
        </div>
    
      </div>
    ) : (
   <div class="table-responsive">
   <table class="table caption-top ">
        <thead>
            <tr>
                <th>MedicineName</th>
                <th>Quantity</th>
                <th>Price(per_medicine)</th>
                <th>MfgDate</th>
                <th>ExpDate</th>
                <th>MG</th>
                <th>Company</th>
                <th>Composition</th>
                <th>Edit</th>
                <th>Delete</th>

            </tr>
        </thead>
        <tbody>
        {inventory.map((medicine,index)=>(
            <tr key={medicine.id}>
                <td>{medicine.MedicineName}</td>
                <td>{medicine.Quantity}</td>
                <td>{medicine.Price}</td>
                <td>{medicine.MFGDate}</td>
                <td>{medicine.ExpireDate}</td>
                <td>{medicine.MG}</td>
                <td>{medicine.Company}</td>
                <td>{medicine.Composition}</td>
                <td onClick={()=>editHandler(medicine)}>{<AiFillEdit/>}</td>
                <td onClick={()=>deleteHandler(index,medicine.id)}>{<AiFillDelete/>}</td>
            </tr>
        ))}
        </tbody>
    </table>
   </div>
    )
   }
   <Link to ='/inventoryForm' >
   {console.log(inventory)}
   <button type='submit' style={{marginLeft:"15rem",marginTop:"3rem"}} className="button">{(inventory.length===0)? 'Add Inventories':'Add More '}</button>
   </Link>
   <Link to ='/createBill' >
   <button type='submit' style={{width:"20rem"}} className='button'>Go to Create Bills of Patients</button>
   </Link>
   
    </div>
  )
}

export default Inventory
