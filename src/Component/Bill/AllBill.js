import React, { useEffect, useState } from 'react'
import './AllBill.module.css'
// import GetAllBills from '../GetBill';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import 'firebase/firestore'
import GetAllBills from './Get';
import { useRadioGroup } from '@mui/material';


const AllBill = () =>
 {
  let currentUser=null;
    const [loading,setLoading]=useState(false);
    const [bill,setBill]=useState([]);
    console.log(typeof(bill))
    const [medicineDialog, setMedicineDialog] = useState({
        visible: false,
        billIndex: 0,
      });
      const [modeldata,setModeldata]=useState({
        id:'',
        Patient:'',
        Hospital:'',
        Date:''
    })

      const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

      const handleClose = () => {
        setMedicineDialog((prev) => ({ ...prev, visible: false }));
      };
        function viewHandler(index){
        setMedicineDialog({
          visible:true,
          billIndex:index
        })
          
      }
      
    async function fetchData(){
        setLoading(true);
        const result=await GetAllBills();
         setBill([...result]);
        setLoading(false);
    }
    useEffect( ()=>{
        fetchData()
    },[]);
      return (
    <div>
       {loading && <p>Loading..</p>}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Hospital</th>
              <th>Medicine Details</th>
            </tr>
          </thead>
         <tbody>
            {bill.map((allbill,index)=>(
                <tr key={allbill.id}>
                  <th>{index}</th>
                  <td>{allbill.PatientName}</td>
                  <td>{allbill.Date}</td>
                  <td>{allbill.HospitaName}</td>
                  <td><Button variant="outlined" onClick={()=>viewHandler(currentUser=index)}>view bills</Button></td>
                </tr>))}
         </tbody>
          </table>
          </div>

          {/* this is for show the model */}
          {medicineDialog.visible && (
          <Dialog  fullScreen open={medicineDialog.visible} onClose={handleClose} TransitionComponent={Transition}>
           <AppBar sx={{ position: "relative" }}>
             <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
              </IconButton>
              <Button sx={{ ml: 2 }} variant="h6" component="div">Print</Button>
              <Button autoFocus color="inherit" onClick={handleClose}>Download</Button>
             </Toolbar>
            </AppBar>
            {/* <div>
              <h1>HospitaName</h1>
              <h5>Patient Name:</h5>
             
             
            </div> */}
            <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                    <th>Patient name</th>
                    <th>Hospital name</th>
                    <th>Date</th>
                </tr>
             </thead>
             
             <tbody>
             {/* {bill.map((modeldata)=>(
                <tr key={modeldata.id}>
                   {console.log(modeldata.id)}
                    <td>{modeldata.PatientName}</td>
                    <td>{modeldata.HospitaName}</td>
                    {console.log(modeldata.PatientName)}

                </tr>
                ))} */}
                {currentUser.filter((modeldata)=>modeldata.id===bill.id).map(filterdata=>(
                 <tr>
                 <td>{filterdata.PatientName}</td>
                 {console.log(filterdata.PatientName)}
                 </tr>
                  
                ))}
                </tbody>
            </table>
       </div>yess
            <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th> Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {bill.length > 0 &&
                  bill[medicineDialog.billIndex].MedicineEntries.map(
                    (medicine) => (
                      <tr key={medicine.id}>
                        <td>{medicine.medicineName}</td>
                        <td>{medicine.quantity}</td>
                        <td>{medicine.price}</td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
           </Dialog>
          )}
         
    </div>
  )
}

export default AllBill
