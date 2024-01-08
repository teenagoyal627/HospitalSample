import React from "react";
import classes from './AllBill.module.css'
const DialogBoxContent = ({ records, searchCurrentUser, bill, currentUser, medicineDialog }) => {
        //console.log(searchCurrentUser)
        //console.log("records are ",records)
       // console.log("the current user of allbill",currentUser)
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
  // const custiemr = records[medicineDialog.billIndex];
  // console.log(custiemr)
  return (
    <form className={classes.form}>
      <div>
        {records
          .filter((item, index) =>  index === currentUser || item.id === searchCurrentUser)
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
      <div className="table-responsive" style={{marginLeft:"2rem",width:"55rem"}} >
        <table className="table" >
          <thead>
            <tr style={{backgroundColor:"skyblue"}}>
              <th>Medicine Name</th>
              <th> Quantity</th>
              <th>Duration</th>
              <th>Unit Price</th>
              <th>Price</th>
              <th>Instructions</th>
            </tr>
          </thead>
          <tbody>
            {console.log("enter in tobody of meidcine entiries")}
            {console.log("medicinedialog", medicineDialog.billIndex)}
            {console.log("bill", bill)}
            {console.log("MedicineEntries", bill[medicineDialog.billIndex]?.MedicineEntries)}          
            {bill.length > 0 &&
              medicineDialog.billIndex !== null &&
              records[medicineDialog.billIndex]?.MedicineEntries.map((medicine) => {
                console.log("Current Medicine", medicine);
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
      <hr style={{marginLeft:"2rem",width:"55rem"}}/>
      <h5 className={classes.totalAmount}>Total Amount: {totalAmount()}</h5>
      <hr style={{marginLeft:"2rem",width:"55rem"}}/>
    </form>
  );
};

export default DialogBoxContent;
