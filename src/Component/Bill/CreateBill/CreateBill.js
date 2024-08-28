import { useEffect, useState } from "react";
import classes from "./CreateBill.module.css";
import { AiFillDelete } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../Firebase";
import Navigation from "../../Header/Navigation";
import { getAuth } from "firebase/auth";
import Bill from "../../UI/Bill";
import { CreateBillHandleChange,addFields,PatientMobValidation,removeFields,handleTableChange,handleMedicineNameChange,createHandler } from "./CreateBillUtilities";
import FormDetails from "./FormDetails";
import { MessageBox } from "../../MessageBox";


const CreateBill1=() =>{
  const history = useHistory();

const[createBillDetails,setCreateBillDetails]=useState({
  patientName:"",
  mobileNumber:"",
  doctorName:"",
  hospitalName:"",
})
const [medicineData, setMedicineData] = useState([
  {
    medicineName: "",
    quantity: "",
    price: "",
    duration: "",
    instructions: "",
  },
]);
  const [currentDate, setCurrentDate] = useState("");
  const [medicineNames, setMedicineNames] = useState([]);
  const[showModal,setShowModal]=useState(false)
  const[modalContent,setModalContent]=useState({
    title:"",
    body:""
  })
  const [warning, setWarning] = useState(null);
  const [error, setError] = useState(false);

  //this is for fetch the data from firestone when the page is render
  useEffect(() => {
    const fetchMedicineNames = async () => {
      // Fetch medicine names from Firestone collection
      try {
        const userId = getAuth().currentUser.uid;
        const createBillRef = collection(db, "CreateInventory");
        const q = query(createBillRef, where("UserID", "==", userId));
        const querySnapshot = await getDocs(q);
        const names = querySnapshot.docs.map((doc) => doc.data().MedicineName);
        setMedicineNames(names);
      } catch (error) {
        alert(error);
        setModalContent({
          title:"Error",
          body:"Error while fetching the medicines names in the form of dropdown..."
        })
        setShowModal(true)
      }
    };
    fetchMedicineNames();
  }, []);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toDateString()); 
  }, []);

  // const addFields = () => {
  //   setMedicineData((prev) => [
  //     ...prev,
  //     {
  //       medicineName: "",
  //       quantity: "",
  //       price: "",
  //       duration: "",
  //       instructions: "",
  //     },
  //   ]);
  // };

  // const validation = () => {
  //   const isValidPhoneNumber = /^\d{10}$/.test(createBillDetails.mobileNumber);
  //   if (!isValidPhoneNumber) {
  //     setError(true);
  //   } else {
  //     setError(false);
  //   }
  // };

  // const removeFields = (index) => {
  //   setMedicineData((prev) => prev.filter((_, idx) => idx !== index));
  //   //when this condition is false means when the deletefieldindex is equal to specific index   then element is remove from field means jab hum dekehenge ki remove button pe click karne wala index agr prev array me se equal hota hai toh voo yha se delete ho jayega
  //   //DeleteFieldIndex !== index: This condition checks if the index of the current element is not equal to the specified index. If the condition is true, the element is included in the new array. If the condition is false (i.e., the index matches the specified index), the element is excluded from the new array.
  //   //  _ this indicates that we know that  from filter function we pass parameter so as an element parameter we not wants to pass anything
  // };

  // const handleTableChange = async (index, field, value) => {
  //   const updatedInputFields = [...medicineData];
  //   updatedInputFields[index][field] = value;

  //   if (field === "quantity") {
  //     const quantity = value ? parseInt(value) : 0;
  //     //now we check that the entered quantity is not more than availble quantity
  //     if (quantity > 0) {
  //       const UserMedicineName = updatedInputFields[index].medicineName;
  //       //now get the data form database for quantity check
  //       const querySnapShot = await getDocs(
  //         query(
  //           collection(db, "CreateInventory"),
  //           where("MedicineName", "==", UserMedicineName)
  //         )
  //       );
  //       if (!querySnapShot.empty) {
  //         const docData = querySnapShot.docs[0].data();
  //         const availableQuantity = docData.Quantity;
  //         if (availableQuantity === "0") {
  //           setWarning("This medicine is out of stock");
  //         } else if (quantity > availableQuantity) {
  //           setWarning("Entered Quantity is more than available quantity");
  //           updatedInputFields[index].price = "";
  //           return;
  //         } else if (quantity <= availableQuantity || quantity === "") {
  //           setWarning("");
  //         }
  //         if (quantity !== "" || 0) {
  //           const newQuantity = parseInt(quantity);
  //           if (!isNaN(newQuantity)) {
  //             const backendPrice = docData.Price;
  //             const totalPrice = backendPrice * newQuantity;
  //             updatedInputFields[index].price = totalPrice.toString();
  //           }
  //         } else setWarning("");
  //       }
  //     }
  //   }
  //   setMedicineData(updatedInputFields);
  // };

  // const handleMedicineNameChange = async (index, value) => {
  //   if (value === "") {
  //     setWarning("");
  //     return;
  //   }
  //   const querySnapshot = await getDocs(
  //     query(
  //       collection(db, "CreateInventory"),
  //       where("MedicineName", "==", value)
  //     )
  //   );
  //   if (!querySnapshot.empty) {
  //     const docData = querySnapshot.docs[0].data();
  //     const updatedInputFields = [...medicineData];
  //     updatedInputFields[index].quantity = 0;
  //     updatedInputFields[index].price = docData.Price;
  //     setMedicineData(updatedInputFields);
  //     setWarning("");
  //   } else {
  //     setWarning("This medicine is not present in stock ");
  //   }
  // };

  // const createHandler = async (event) => {
  //   event.preventDefault();
  //   PatientMobValidation();
  //   if (!error) {
  //     const userId = getAuth().currentUser.uid;
  //     await addDoc(collection(db, "CreateBillDetails"), {
  //       PatientName: createBillDetails.patientName,
  //       MobileNumber: createBillDetails.mobileNumber,
  //       DoctorName: createBillDetails.doctorName,
  //       HospitalName: createBillDetails.hospitalName,
  //       MedicineEntries: medicineData,
  //       Date: currentDate,
  //       UserID: userId,
  //     });
  //     history.replace("/allBill");
  //     setCreateBillDetails({
  //       patientName:"",
  //       mobileNumber:"",
  //       doctorName:"",
  //       hospitalName:""
  //     })
     
  //     setMedicineData([
  //       {
  //         medicineName: "",
  //         quantity: "",
  //         price: "",
  //         duration: "",
  //         instructions: "",
  //       },
  //     ]);
  //   }
  // };

  return (
    <div>
      <Navigation />
      <FormDetails
  currentDate={currentDate}
  createBillDetails={createBillDetails}
  createHandler={(event)=>createHandler(event,createBillDetails,medicineData,currentDate,setCreateBillDetails,setMedicineData,history)}
  CreateBillHandleChange={(e)=>CreateBillHandleChange(e,setCreateBillDetails)}
  medicineData={medicineData}
  handleMedicineNameChange={(index,value)=>handleMedicineNameChange(index, value,setMedicineData,setShowModal,setModalContent,medicineData)}
  handleTableChange={(index,field,value)=>handleTableChange(index, field, value,medicineData,setShowModal,setModalContent,setMedicineData)}
  medicineNames={medicineNames}
  removeFields={(index)=>removeFields(index,setMedicineData)}
  addFields={()=>addFields(setMedicineData)}
  warning={warning}
  error={error}

      />

<MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        // handleConfirm={() =>
        //   inventoryHandleConfirm(
        //     setShowModal,
        //     modalContent,
        //     history,
        //     setFormData
        //   )
        // }
        title={modalContent.title}
        body={modalContent.body}
      />
      {/* <Bill>
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
              id="patientName"
              value={createBillDetails.patientName}
              onChange={CreateBillHandleChange}
            />
          </div>
          <div className={classes.control}>
            <label>Hospital Name</label>
            <input
              type="text"
              required
              id="hospitalName"
              value={createBillDetails.hospitalName}
              onChange={CreateBillHandleChange}
            />
          </div>
          <div className={classes.control}>
            <label>Doctor Name</label>
            <input
              type="text"
              required
              id="doctorName"
              value={createBillDetails.doctorName}
              onChange={CreateBillHandleChange}
            />
          </div>
          <div className={classes.control}>
            <label> Mobile Number</label>
            <input
              type="number"
              required
              id="mobileNumber"
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
                <datalist id={`medicineOptions-${index}`} className={classes.datalistOptions}>
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
                <p
                  className={classes.remove}
                  onClick={() => removeFields(index)}
                >
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
      </Bill> */}
      {/* <Sample/> */}
    </div>
  );
}

export default CreateBill1;
