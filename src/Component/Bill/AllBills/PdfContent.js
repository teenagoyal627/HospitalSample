import React from "react";
import classes from './AllBill.module.css'
import ShopData from "./ShopData";
const PdfContent = ({
  records,
  currentUser,
  bill,
  medicineDialog,
  shopData,
  showShopDetails,
  pdfContentRef,
}) => {
  const totalAmount = () => {
    if (bill.length > 0 && medicineDialog.billIndex !== null) {
      const currentBill = bill[medicineDialog.billIndex];
      return currentBill.MedicineEntries.reduce(
        (total, medicine) => total + medicine.price * 1,
        0
      );
    }
    return 0;
  };
  
  if (!shopData) {
    return <p>shop data is not comes </p>;
  }
  return (
    <div ref={pdfContentRef} style={{ width: "100%" }}>
    
      {showShopDetails && <ShopData shopDetails={shopData} />}
      {/* <p>pdf content ka shopdata</p> */}
      <form className={classes.form}>
        <div>
          {records
            .filter((item, index) => index === currentUser)
            .map((filterdata,index) => (
              <div key={index}>
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
              {bill.length > 0 &&
                bill[medicineDialog.billIndex].MedicineEntries.map(
                  (medicine,index) => (
                    <tr key={index}>
                      <td>{medicine.medicineName}</td>
                      {console.log(medicine.medicineName)}
                      <td>{medicine.quantity}</td>
                      <td>{medicine.price/medicine.quantity}</td>
                      <td>{medicine.price}</td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
        <hr />
        <h5 className={classes.totalAmount}>Total Amount: {totalAmount()}</h5>
      </form>
    </div>
  );
};

export default PdfContent;
