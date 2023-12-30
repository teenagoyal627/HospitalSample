import React from "react";
import classes from './AllBill.module.css'
const SearchDialogBoxContent = ({ records, searchCurrentUser, bill, currentUser, medicineDialog }) => {
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
    {bill
      .filter((item) =>  item.id === searchCurrentUser)
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

  <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th>Medicine Name</th>
          <th> Quantity</th>
          <th>Unit Price</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {/* {console.log("enter in tobody of meidcine entiries")}
        {console.log("medicinedialog", medicineDialog.billIndex)}
        {console.log("bill", bill)}
        {console.log("MedicineEntries", bill[medicineDialog.billIndex]?.MedicineEntries)}*/}
        {bill.length > 0 &&
          searchCurrentUser !== null &&
          records.find((record)=>record.id===searchCurrentUser)?.MedicineEntries.map((medicine) => {
            return (
              <tr key={medicine.id}>
                <td>{medicine.medicineName}</td>
                <td>{medicine.quantity}</td>
                <td>{medicine.price / medicine.quantity}</td>
                <td>{medicine.price}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  </div>
  <hr />
  <h5 className={classes.totalAmount}>Total Amount: {totalAmount()}</h5>
</form>
);
};

export default SearchDialogBoxContent;

