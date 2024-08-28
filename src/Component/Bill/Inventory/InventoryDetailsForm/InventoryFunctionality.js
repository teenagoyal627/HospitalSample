import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { db } from "../../../../Firebase";
import Navigation from "../../../Header/Navigation";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import InventoryFormFields from "./InventoryFormFields";
import { MessageBox } from "../../../MessageBox";
import {
  InventoryHandleChange,
  AddHandler,
  inventoryHandleConfirm,
} from "../InventoryUtility";

function InventoryForm() {
  const history = useHistory();
  const location = useLocation();
  const { inventoryData } = location.state || {};

  const [formData, setFormData] = useState({
    medicineName: "",
    quantity: "",
    price: "",
    mfgDate: "",
    expireDate: "",
    mg: "",
    company: "",
    composition: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });

  //this fetches the data when the user click on edit button of inventory page...
  useEffect(() => {
    const fetchInventory = async () => {
      if (inventoryData) {
        try {
          const inventoryDocRef = doc(db, "CreateInventory", inventoryData.id);
          const inventoryDocSnap = await getDoc(inventoryDocRef);

          if (inventoryDocSnap.exists()) {
            const data = inventoryDocSnap.data();
            setFormData({
              medicineName: data.MedicineName,
              quantity: data.Quantity,
              price: data.Price,
              mfgDate: data.MFGDate,
              expireDate: data.ExpireDate,
              mg: data.MG,
              company: data.Company,
              composition: data.Composition,
            });
          }
        } catch (error) {
          setModalContent({
            title: "Fetching Error",
            body: "Document not found.",
          });
          setShowModal(true);
        }
      }
    };
    fetchInventory();
  }, [inventoryData]);

  return (
    <div>
      <Navigation />
      <InventoryFormFields
        AddHandler={(e) =>
          AddHandler(
            e,
            inventoryData,
            formData,
            history,
            setModalContent,
            setShowModal
          )
        }
        formData={formData}
        InventoryHandleChange={(e) => InventoryHandleChange(e, setFormData)}
      />
      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() =>
          inventoryHandleConfirm(
            setShowModal,
            modalContent,
            history,
            setFormData
          )
        }
        title={modalContent.title}
        body={modalContent.body}
      />
    </div>
  );
}

export default InventoryForm;
