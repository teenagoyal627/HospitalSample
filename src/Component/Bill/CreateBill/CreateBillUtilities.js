import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../Firebase";
import { getAuth } from "firebase/auth";

export const CreateBillHandleChange = (e, setCreateBillDetails) => {
    const { name, value } = e.target;
    setCreateBillDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  export const addFields = (setMedicineData) => {
    setMedicineData((prev) => [
      ...prev,
      {
        medicineName: "",
        quantity: "",
        price: "",
        duration: "",
        instructions: "",
      },
    ]);
  };

  export const PatientMobValidation = (createBillDetails) => {
    const isValidPhoneNumber = /^\d{10}$/.test(createBillDetails.mobileNumber);
    return isValidPhoneNumber
    // if (!isValidPhoneNumber) {
    //   setError(true);
    // } else {
    //   setError(false);
    // }
  };

  export const removeFields = (index,setMedicineData) => {
    setMedicineData((prev) => prev.filter((_, idx) => idx !== index));
    //when this condition is false means when the deletefieldindex is equal to specific index   then element is remove from field means jab hum dekehenge ki remove button pe click karne wala index agr prev array me se equal hota hai toh voo yha se delete ho jayega
    //DeleteFieldIndex !== index: This condition checks if the index of the current element is not equal to the specified index. If the condition is true, the element is included in the new array. If the condition is false (i.e., the index matches the specified index), the element is excluded from the new array.
    //  _ this indicates that we know that  from filter function we pass parameter so as an element parameter we not wants to pass anything
  };


  export const handleTableChange = async (index, field, value,medicineData,setShowModal,setModalContent,setMedicineData) => {
    const updatedInputFields = [...medicineData];
    updatedInputFields[index][field] = value;

    if (field === "quantity") {
      const quantity = value ? parseInt(value) : 0;
      //now we check that the entered quantity is not more than availble quantity
      if (quantity > 0) {
        const UserMedicineName = updatedInputFields[index].medicineName;
        //now get the data form database for quantity check
        const querySnapShot = await getDocs(
          query(
            collection(db, "CreateInventory"),
            where("MedicineName", "==", UserMedicineName)
          )
        );
        if (!querySnapShot.empty) {
          const docData = querySnapShot.docs[0].data();
          const availableQuantity = docData.Quantity;
          if (availableQuantity === "0") {
            setModalContent({
                title:"Error",
                body:"This medicine is out of stock"
            })
            setShowModal(true)
            // setWarning("This medicine is out of stock");
          } else if (quantity > availableQuantity) {
            setModalContent({
                title:"Error",
                body:"Entered Quantity is more than available quantity"
            })
            setShowModal(true)
            // setWarning("Entered Quantity is more than available quantity");
            updatedInputFields[index].price = "";
            return;
          } else if (quantity <= availableQuantity || quantity === "") {
            // setWarning("");
          }
          if (quantity !== "" || 0) {
            const newQuantity = parseInt(quantity);
            if (!isNaN(newQuantity)) {
              const backendPrice = docData.Price;
              const totalPrice = backendPrice * newQuantity;
              updatedInputFields[index].price = totalPrice.toString();
            }
          } 
        //   else setWarning("");
        }
      }
    }
    setMedicineData(updatedInputFields);
  };

  export const handleMedicineNameChange = async (index, value,setMedicineData,setShowModal,setModalContent,medicineData) => {
    if (value === "") {
      return;
    }
    const querySnapshot = await getDocs(
      query(
        collection(db, "CreateInventory"),
        where("MedicineName", "==", value)
      )
    );
    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      const updatedInputFields = [...medicineData];
      updatedInputFields[index].quantity = 0;
      updatedInputFields[index].price = docData.Price;
      setMedicineData(updatedInputFields);
    } else {
        setModalContent({
            title:"Error",
            body:"This medicine is not present in stock "
        })
        setShowModal(true)
    //   setWarning("This medicine is not present in stock ");
    }
  };


  export  const createHandler = async (event,createBillDetails,medicineData,currentDate,setCreateBillDetails,setMedicineData,history) => {
    event.preventDefault();
    // PatientMobValidation();
    if (PatientMobValidation(createBillDetails)) {
      const userId = getAuth().currentUser.uid;
      await addDoc(collection(db, "CreateBillDetails"), {
        PatientName: createBillDetails.patientName,
        MobileNumber: createBillDetails.mobileNumber,
        DoctorName: createBillDetails.doctorName,
        HospitalName: createBillDetails.hospitalName,
        MedicineEntries: medicineData,
        Date: currentDate,
        UserID: userId,
      });
      history.replace("/allBill");
    //   setCreateBillDetails({
    //     patientName:"",
    //     mobileNumber:"",
    //     doctorName:"",
    //     hospitalName:""
    //   })
     
    //   setMedicineData([
    //     {
    //       medicineName: "",
    //       quantity: "",
    //       price: "",
    //       duration: "",
    //       instructions: "",
    //     },
    //   ]);
    }
  };
