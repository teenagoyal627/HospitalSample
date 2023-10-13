import React, { useEffect, useState } from 'react'
import GetMedicineData from './GetMedicineData';
import {Link} from 'react-router-dom'
import './Inventories.css'
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import Navigation from '../../Header/Navigation';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Inventory = () => {
    const[loading,setLoading]=useState(false);
    const[medicineData,setMedicineData]=useState([])
    const history=useHistory();

    const editHandler=()=>{
        history.replace("/inventoryForm")
    }
    const deleteHandler=()=>{
        console.log("delete button")
    }
    async function fetchMedicineData(){
        setLoading(true)
        const result=await GetMedicineData();
        setMedicineData([...result]);
        setLoading(false);
    }
    useEffect(()=>{
        fetchMedicineData();
    },[]);
  return (
    <div>
    <Navigation/>
   {loading && <p>Loading...</p>}
   {/* <div className="table-responsive"> */}
   <div >
   <table class="table caption-top">
        <thead  >
            <tr>
                <th>MedicineName</th>
                <th>Quantity</th>
                <th>Price(per_Medicine)</th>
                <th>ManufactureDate</th>
                <th>ExpireDate</th>
                <th>MG</th>
                <th>Company</th>
                <th>Composition</th>
                <th>Edit</th>
                <th>Delete</th>

            </tr>
        </thead>
        <tbody>
        {medicineData.map((medicine,index)=>(
            <tr key={medicine.id}>
                <td>{medicine.MedicineName}</td>
                <td>{medicine.Quantity}</td>
                <td>{medicine.Price}</td>
                <td>{medicine.MFGDate}</td>
                <td>{medicine.ExpireDate}</td>
                <td>{medicine.MG}</td>
                <td>{medicine.Company}</td>
                <td>{medicine.Composition}</td>
                <td onClick={editHandler}>{<AiFillEdit/>}</td>
                <td onClick={deleteHandler}>{<AiFillDelete/>}</td>
            </tr>
        ))}
        </tbody>
    </table>
   </div>
   <Link to ='/inventoryForm' >
   <button type='submit' className="button">Add More</button>
   </Link>
   <Link to ='/createBill' >
   <button type='submit' className='button'>Save Changes</button>
   </Link>

    </div>
  )
}

export default Inventory
