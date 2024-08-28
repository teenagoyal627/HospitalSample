import React from 'react'
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import './Inventories.css'
const InventoriesTable = ({inventory,editHandler,deleteHandler}) => {
  return (      
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
                <td className='edit' onClick={()=>editHandler(medicine)}>{<AiFillEdit/>}</td>
                <td className='delete' onClick={()=>deleteHandler(index,medicine.id)}>{<AiFillDelete/>}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
  )
}

export default InventoriesTable
