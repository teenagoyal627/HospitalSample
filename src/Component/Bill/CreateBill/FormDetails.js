import React from "react";
import classes from "./CreateBill.module.css";
import { AiFillDelete } from "react-icons/ai";
import Bill from "../../UI/Bill";

const FormDetails = ({
  currentDate,
  createBillDetails,
  createHandler,
  CreateBillHandleChange,
  medicineData,
  handleMedicineNameChange,
  handleTableChange,
  medicineNames,
  removeFields,
  addFields,
  warning,
  error
}) => {

    console.log(createBillDetails)
  return (
    <Bill>
      <p className={classes.date}>Date: {currentDate}</p>
      <hr />{" "}
      <div>
        <h1 className={classes.heading}>Create Bill</h1>
      </div>
      <form className={classes.form} onSubmit={createHandler}>
        <div className={classes.control}>
          <label>Patient Name</label>
          <input
            type="text"
            required
            name="patientName"
            value={createBillDetails.patientName}
            onChange={CreateBillHandleChange}
          />
        </div>
        <div className={classes.control}>
          <label>Hospital Name</label>
          <input
            type="text"
            required
            name="hospitalName"
            value={createBillDetails.hospitalName}
            onChange={CreateBillHandleChange}
          />
        </div>
        <div className={classes.control}>
          <label>Doctor Name</label>
          <input
            type="text"
            required
            name="doctorName"
            value={createBillDetails.doctorName}
            onChange={CreateBillHandleChange}
          />
        </div>
        <div className={classes.control}>
          <label> Mobile Number</label>
          <input
            type="number"
            required
            name="mobileNumber"
            value={createBillDetails.mobileNumber}
            onChange={CreateBillHandleChange}
          />
        </div>
        <label>Medicines Entries</label>
        {medicineData.map((input, index) => (
          <div key={index}>
            <div className={classes.medicalData}>
              <input
                type="text"
                style={{ padding: ".2rem", margin: ".2rem", width: "13rem" }}
                placeholder="medicineName"
                value={input.medicineName}
                onChange={(e) => {
                  handleTableChange(index, "medicineName", e.target.value);
                  handleMedicineNameChange(index, e.target.value);
                }}
                // list="medicineOptions"
                list={`medicineOptions-${index}`}
              />
              <datalist
                id={`medicineOptions-${index}`}
                className={classes.datalistOptions}
              >
                {medicineNames.map((name, index) => (
                  <option key={index} value={name} />
                ))}
              </datalist>
              <input
                type="number"
                style={{ padding: ".2rem", margin: ".2rem", width: "13rem" }}
                placeholder="quantity"
                value={input.quantity}
                onChange={(e) =>
                  handleTableChange(index, "quantity", e.target.value)
                }
              />
              <input
                type="number"
                style={{ padding: ".2rem", margin: ".2rem", width: "13rem" }}
                placeholder="Price"
                value={input.price}
                onChange={(e) =>
                  handleTableChange(index, "price", e.target.value)
                }
              />
              <input
                type="text"
                style={{ padding: ".2rem", margin: ".2rem", width: "13rem" }}
                placeholder="Instructions"
                value={input.instructions}
                onChange={(e) =>
                  handleTableChange(index, "instructions", e.target.value)
                }
              />
              <input
                type="number"
                style={{ padding: ".2rem", margin: ".2rem", width: "13rem" }}
                placeholder="Duration"
                value={input.duration}
                onChange={(e) =>
                  handleTableChange(index, "duration", e.target.value)
                }
              />
              <p className={classes.remove} onClick={() => removeFields(index)}>
                <AiFillDelete size={30} style={{ marginTop: ".2rem" }} />
              </p>
            </div>
          </div>
        ))}
        {warning && <p className={classes.warning}>{warning}</p>}
        <button
          style={{ marginTop: "1rem", width: "10rem", marginLeft: ".2rem" }}
          type="button"
          onClick={addFields}
        >
          Add more
        </button>
        <button>Create Bill</button>
      </form>
      {error && (
        <div style={{ color: "red" }}>
          <p>Enter a valid 10 digit number </p>
        </div>
      )}
    </Bill>
  );
};

export default FormDetails;
