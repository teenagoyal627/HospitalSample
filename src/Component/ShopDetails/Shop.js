import { useState } from "react";
import { useHistory } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navigation from "../Header/Navigation";
import { ShopConfirmHandler,shopFormDataInputChangeHandler,addressHandler,ShopDetailsSubmitHandler } from "./ShopDetailsUtility";
import ShopForm from "./ShopForm";
import { MessageBox } from "../MessageBox";


function Shop() {
  const history = useHistory();
  const[shopFormData,setShopFormData]=useState({
    shopName:"",
    name:"",
    mobileNumber:"",
    email:"",
  })

  const [address, setAddress] = useState({
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const[showModal,setShowModal]=useState(false)
  const[modalContent,setModalContent]=useState({
    title:"",
    body:""
  })

  return (
    <div>
      <Navigation />
      <ShopForm
         ShopDetailsSubmitHandler={(e)=>ShopDetailsSubmitHandler(e,shopFormData,setModalContent,setShowModal,address)}
         shopFormData={shopFormData}
         shopFormDataInputChangeHandler={(e)=>shopFormDataInputChangeHandler(e,setShopFormData)}
         address={address}
         addressHandler={(e)=>addressHandler(e,setAddress)}
      />

<MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() =>
          ShopConfirmHandler(setShowModal, modalContent, history, shopFormData, address, setShopFormData, setAddress)
        }
        title={modalContent.title}
        body={modalContent.body}
      />

    </div>
  );
}

export default Shop;
