import React from "react";
import classes from './AllBill.module.css'
import ShopData from "./ShopData";
const DownloadPdfContent = ({
  records,
  currentIndex,
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
            .filter((item, index) => index === currentIndex)
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
 
        <div className="table-responsive" style={{marginLeft:"2rem",width:"55rem"}} >
          <table className="table">
            <thead>
            <tr>
            <th>Medicine Name</th>
              <th> Quantity</th>
              <th>Duration</th>
              <th>Unit Price</th>
              <th>Price</th>
              <th>Instructions</th>
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
                      <td>{medicine.duration} days</td>
                      <td>{medicine.price/medicine.quantity}</td>
                      <td>{medicine.price}</td>
                      <td>{medicine.instructions}</td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
        <hr style={{marginLeft:"2rem",width:"55rem"}}/>
      <h5 className={classes.totalAmount}>Total Amount: {totalAmount()}</h5>
      <hr style={{marginLeft:"2rem",width:"55rem"}}/>
      </form>
    </div>
  );
};

export default DownloadPdfContent;
