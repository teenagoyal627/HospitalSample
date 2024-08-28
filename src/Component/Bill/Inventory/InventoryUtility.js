import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase";
import { getAuth } from "firebase/auth";

export const InventoryHandleChange = (e, setFormData) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const AddHandler = async (
  e,
  inventoryData,
  formData,
  history,
  setModalContent,
  setShowModal
) => {
  e.preventDefault();

  if (inventoryData) {
    const inventoryDocRef = doc(db, "CreateInventory", inventoryData.id);
    try {
      await updateDoc(inventoryDocRef, {
        MedicineName: formData.medicineName,
        Quantity: formData.quantity,
        Price: formData.price,
        MFGDate: formData.mfgDate,
        ExpireDate: formData.expireDate,
        MG: formData.mg,
        Company: formData.company,
        Composition: formData.composition,
      });
      setModalContent({
        title: "Success",
        body: "Successfully Medicines updated in the inventory.",
      });
      setShowModal(true);
    } catch {
      setModalContent({
        title: "Error",
        body: "Please fill all and correct medicines data",
      });
      setShowModal(true);
    }
  } else {
    try {
      const userId = getAuth().currentUser.uid;

      await addDoc(collection(db, "CreateInventory"), {
        MedicineName: formData.medicineName,
        Quantity: formData.quantity,
        Price: formData.price,
        MFGDate: formData.mfgDate,
        ExpireDate: formData.expireDate,
        MG: formData.mg,
        Company: formData.company,
        Composition: formData.composition,
        UserID: userId,
      });
      setModalContent({
        title: "Success",
        body: "Successfully Medicines upload in the inventory",
      });
      setShowModal(true);
    } catch {
      setModalContent({
        title: "Error",
        body: "Please fill all and correct medicines data",
      });
      setShowModal(true);
      alert("Please fill all and correct medicines data");
    }
  }
};

export const inventoryHandleConfirm = (
  setShowModal,
  modalContent,
  history,
) => {
  setShowModal(false);
  if (modalContent.title === "Success") {
    history.replace("/inventory");
  } else {
    history.replace("/inventory");
  }
};

export const editHandler=(inventoryData,history)=>{
    console.log("edit button is clicked")
    history.replace({
        pathname:"/inventoryForm",
        state:{inventoryData},})
}


export const deleteFromFirestore=async(index,id,setModalContent,setShowModal,setInventory)=>{
    try{
        await deleteDoc(doc(db,"CreateInventory",id));
        setModalContent({
          title:"Success",
          body:"Medicine deleted successfully"
        })
        setShowModal(true)
        setInventory((prev)=>prev.filter((_,idx)=>idx!== index));
    }catch(error){
      setModalContent({
        title:"Error",
        body:"Error occur when deleting the medicine"
      })
      setShowModal(true)
    }
}
