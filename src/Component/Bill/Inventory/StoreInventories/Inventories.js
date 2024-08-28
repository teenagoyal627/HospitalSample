import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Inventories.css";
import Navigation from "../../../Header/Navigation";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../Firebase";
import InventoriesTable from "./InventoriesTable";
import {
  editHandler,
  deleteFromFirestore,
  inventoryHandleConfirm,
} from "../InventoryUtility";
import { MessageBox } from "../../../MessageBox";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });
  const history = useHistory();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const userId = getAuth().currentUser.uid;
        const inventoryRef = collection(db, "CreateInventory");
        const q = query(inventoryRef, where("UserID", "==", userId));
        const querySnapshot = await getDocs(q);
        const inventoryData = [];
        querySnapshot.forEach((doc) => {
          inventoryData.push({ id: doc.id, ...doc.data() });
        });

        setInventory(inventoryData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <Navigation />
      {inventory.length === 0 ? (
        <div className="message-container">
          <div className="message">Add the inventories on the store</div>
        </div>
      ) : (
        <InventoriesTable
          inventory={inventory}
          editHandler={(medicine) => editHandler(medicine, history)}
          deleteHandler={(index, id) =>
            deleteFromFirestore(
              index,
              id,
              setModalContent,
              setShowModal,
              setInventory
            )
          }
        />
      )}
      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() =>
          inventoryHandleConfirm(setShowModal, modalContent, history)
        }
        title={modalContent.title}
        body={modalContent.body}
      />

      <div className="button-container">
        <Link to="/inventoryForm">
          <button type="submit" className="button">
            {inventory.length === 0 ? "Add Inventories" : "Add More "}
          </button>
        </Link>
        <Link to="/createBill">
          <button type="submit" className="button">
            Go to Create Bills of Patients
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Inventory;
