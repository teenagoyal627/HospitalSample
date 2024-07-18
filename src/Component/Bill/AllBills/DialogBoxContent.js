import React from "react";
import classes from './AllBill.module.css'
const DialogBoxContent = ({ records, searchCurrentUser, bill, currentIndex, medicineDialog }) => {
       
  const totalAmount = () => {
    if (bill.length > 0 && medicineDialog.billIndex !== null) {
      const currentBill = records[medicineDialog.billIndex];
      return currentBill.MedicineEntries.reduce(
        (total, medicine) => total + medicine.price * 1,
        0
      );
    }
    return 0;
  };
 
  return (
    <form className={classes.form}>
      <div>
        {records
          .filter((item, index) =>  index === currentIndex || item.id === searchCurrentUser)
          .map((filterdata) => 
          (
            <div key={filterdata.id}>
              <h3>Medical Invoice</h3>
              <div className={classes.container}>

                <div className={classes.leftData}>
                  <p>Date: {filterdata.Date}</p>
                  <p>Hospital Name: {filterdata.HospitalName}</p>
                  <p>Doctor Name: {filterdata.DoctorName}</p>
                </div>
                  
                <div className={classes.rightData}>
                  <p>Patient Name: {filterdata.PatientName}</p>
                  <p>Mobile Number:{filterdata.MobileNumber}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
       <br/><br/>
      <div className="table-responsive" >
        <table className="table" style={{marginLeft:"5rem",width:"90%"}}>
          <thead >
            <tr style={{ backgroundColor: "#1b3e5a",color:"white"}}>
              <th >Medicine Name</th>
              <th> Quantity</th>
              <th>Duration</th>
              <th>Unit Price</th>
              <th>Price</th>
              <th>Instructions</th>
            </tr>
          </thead>
          <tbody>
            {bill.length > 0 &&
              medicineDialog.billIndex !== null &&
              records[medicineDialog.billIndex]?.MedicineEntries.map((medicine) => {
                return (
                  <tr key={medicine.id}>
                    <td>{medicine.medicineName}</td>
                    <td>{medicine.quantity}</td>
                    <td>{medicine.duration} days</td>
                    <td>{medicine.price / medicine.quantity}</td>
                    <td>{medicine.price}</td>
                    <td>{medicine.instructions}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <hr style={{marginLeft:"5rem",width:"90%"}}/>
      <h5 className={classes.totalAmount}>Total Amount: {totalAmount()}</h5>
      <hr style={{marginLeft:"5rem",width:"90%"}}/>
    </form>
  );
};

export default DialogBoxContent;
