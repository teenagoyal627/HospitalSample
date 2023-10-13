import { useEffect, useState } from "react";
import classes from "./CreateBill.module.css";
import { CiCircleRemove } from "react-icons/ci";
import { useHistory } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../Firebase";
import Card from "../../UI/Card";
import Navigation from "../../Header/Navigation";
function CreateBill1() {
  const history = useHistory();

  const [patientName, setPatientName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [medicineData, setMedicineData] = useState([
    { medicineName:"", quantity:"", price:"" },
  ]);
  const [medicineNames, setMedicineNames] = useState([]);
  const [warning,setWarning]=useState(null)
  const [availableQuantities,setAvailableQuantities]=useState({})
  //this is for fetch the data from firesotre when the page is render
 
  useEffect(() => {
    const fetchMedicineNames = async () => {
      // Fetch medicine names from Firestore collection
      const querySnapshot = await getDocs(collection(db, "CreateInventory"));
      const names = querySnapshot.docs.map((doc) => doc.data().MedicineName);
      const quantity = querySnapshot.docs.map((doc) => doc.data().Quantity);
      setMedicineNames(names);
      console.log(names)
      console.log(quantity)
    };

    fetchMedicineNames();
  }, []);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toDateString()); //return the date only not time
  }, []);

  const addFields = () => {
    setMedicineData((prev) => [
      ...prev,
      { medicineName: "", quantity: "", price: "" },
    ]);
    // This is the new array that will replace the previous state. The spread operator ...prev is used to create a new array with all the elements from the previous state.
  };

  const removeFields = (index) => {
    setMedicineData((prev) => prev.filter((_, idx) => idx !== index));
    //when this condition is false means when the deletefieldindex is equal to specific index   then element is remove from field means jab hum dekehenge ki remove button pe click karne wala index agr prev array me se equal hota hai toh voo yha se delete ho jayega
    //DeleteFieldIndex !== index: This condition checks if the index of the current element is not equal to the specified index. If the condition is true, the element is included in the new array. If the condition is false (i.e., the index matches the specified index), the element is excluded from the new array.
    //  _ this indicates that we know that  from filter function we pass parameter so as an element parameter we not wants to pass anything
  };

  const handleTableChange = async(index, field, value) => {
    const updatedInputFields = [...medicineData];
    updatedInputFields[index][field] = value;

    if(field ==='quantity'){
      const price=updatedInputFields[index].price;
      console.log("price is ",price)
      const quantity= value ? parseInt(value) :0;
      console.log("quantity is ",quantity)
      if(quantity>0){
        const medicineName=updatedInputFields[index].medicineName;
       
        const querySnapshot = await getDocs(
          query(
            collection(db, "CreateInventory"),
            where("MedicineName", "==", medicineName)
          ));

          if(!querySnapshot.empty){
            const docData = querySnapshot.docs[0].data();
            // console.log("backend data",docData.Quantity)
            const availabelQunatity=docData.Quantity;
            
            console.log("data form backend ",availabelQunatity)
            
           if(quantity>availabelQunatity){
              updatedInputFields[index].price=console.error("please entered ");;
              setWarning("Entered quantity exceeds available quantity ")
              return ;
            }
            else if(quantity<=availabelQunatity){
              setWarning("")
            }
          
        if (quantity !== '' || 0) 
        {
          const newQuantity=parseInt(quantity);
          console.log("new qunatity",newQuantity);
          if(!isNaN (newQuantity)){
            const priceOnBackend=docData.Price;
            console.log(priceOnBackend)
            const initialPrice=priceOnBackend;
            console.log( "intital price",initialPrice);
          const totalPrice = initialPrice * newQuantity;
          updatedInputFields[index].price = totalPrice.toString();
          console.log("total price",totalPrice)
          }
        }
        else{
          setWarning("")
        }
      }
        // else{
        //   // const totalPrice = price * quantity;
        //   // updatedInputFields[index].price = totalPrice ||"";
        //   setWarning('ll');    
        //     }
      
    } 
      
      // if(value ===""){
      //   setWarning("")
      //   setMedicineData(updatedInputFields)
      // }

      
      // else{
      //     const totalPrice=price*quantity;
      //     updatedInputFields[index].price=totalPrice;
      //         setWarning("");
      //   }
      // }
      
      
     
      

    }
    setMedicineData(updatedInputFields);
  };

  //  const handleQuantityChange =async(index,value)=>{
  //   if(value===""){
  //     setWarning("")
  //     return;
  //   }
  //   const querySnapshot =await getDocs(
  //     query(
  //       collection(db,"CreateInventory"),
  //       where("MedicineName","==" , value)
  //     )
  //   )
  //   const docData = querySnapshot.docs[0].data();
  //     console.log(docData.Quantity);
  //     const updatedInputFields = [...medicineData];
  //     updatedInputFields[index].quantity = docData.Quantity;
      
  //     const availabelQunatity=docData.Quantity;
  //     console.log("quantity available on backend",availabelQunatity)
  //     const quantity=updatedInputFields[index].quantity;
  //     console.log("user entered quantity",quantity)
  //     if(quantity<availabelQunatity)
  //     {
  //       console.log("qunatity  availabale")
  //     }
  //     else{
  //       console.log("medicine is more than availabel")
  //     }
  //  }

  const handleMedicineNameChange = async (index, value) => {
    if(value===""){
      setWarning("")
      return;
    }
    const querySnapshot = await getDocs(
      query(
        collection(db, "CreateInventory"),
        where("MedicineName", "==", value)
      )
    );
    // console.log(querySnapshot)
    
    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      // console.log(docData.Quantity);
      const updatedInputFields = [...medicineData];
      updatedInputFields[index].quantity = 0;
      updatedInputFields[index].price = docData.Price;
      setMedicineData(updatedInputFields);
      setWarning("")
    }
    
    else{
      setWarning("This medicine is not present in stock ")
    }
    

  };

  const createHandler = async (event) => {
    event.preventDefault();

    const docRef = await addDoc(collection(db, "CreateBillDetails"), {
      PatientName: patientName,
      MobileNumber: mobileNumber,
      DoctorName: doctorName,
      HospitalName: hospitalName,
      MedicineEntries: medicineData,
      Date: currentDate,
    });
    console.log(docRef.id);
    history.replace("/allBill");
    // Reset form fields
    setPatientName("");
    setMobileNumber("");
    setDoctorName("");
    setHospitalName("");
    setMedicineData([{ medicineName: "", quantity: "", price: "" }]);
  };

  return (
    <div>
      <Navigation />
      <Card>
        <p className={classes.date}>Date: {currentDate}</p>
        <div>
          <h1 className={classes.heading}>Create Bill</h1>
        </div>
        <form className={classes.form} onSubmit={createHandler}>
          <div className={classes.control}>
            <label>Patient Name</label>
            <input
              type="text"
              required
              id="PatientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label>Hospital Name</label>
            <input
              type="text"
              required
              id="hospitalName"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label>Doctor Name</label>
            <input
              type="text"
              required
              id="doctorName"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label> Mobile Number</label>
            <input
              type="number"
              required
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          {/* Input fields */}
          <label>Medicines Entries</label>
           
          {medicineData.map((input, index) => (
            <div key={index} className={classes.form}>
              <div className={classes.medicalData}>
                <input
                  type="text"
                  placeholder="medicineName"
                  value={input.medicineName}
                  onChange={(e) => {
                    handleTableChange(index, "medicineName", e.target.value);
                    handleMedicineNameChange(index, e.target.value);
                  }}
                  list="medicineOptions"
                />
                <datalist id="medicineOptions">
                  {medicineNames.map((name, index) => (
                    <option key={index} value={name} />
                  ))}
                </datalist>
                <input
                  type="number"
                  placeholder="quantity"
                  value={input.quantity}
                  onChange={(e) =>{
                    handleTableChange(index, "quantity", e.target.value)
                    // handleQuantityChange(index, e.target.value);
                  }
                  }
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={input.price}
                  onChange={(e) =>
                    handleTableChange(index, "price", e.target.value)
                  }
                />
                <p
                  className={classes.remove}
                  onClick={() => removeFields(index)}
                >
                  <CiCircleRemove size={25} />
                </p>
              </div>
            </div>
          ))}
          {warning && <p className={classes.warning}>{warning}</p>}
          <button type="button" onClick={addFields}>
            Add more
          </button>

          <button style={{ marginTop: "1rem", width: "30rem" }}>
            Create Bill
          </button>
        </form>
      </Card>
      {/* <Sample/> */}
    </div>
  );
}

export default CreateBill1;
// Implement Autocomplete: Use a library or build your own autocomplete functionality for the medicine name input field in the createbill form. This will help users select medicine names from the available inventory.
