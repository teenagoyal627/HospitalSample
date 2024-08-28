import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase";

export const shopFormDataInputChangeHandler = (e, setShopFormData) => {
  const { id, value } = e.target;
  setShopFormData((prevState) => ({
    ...prevState,
    [id]: value,
  }));
}

export const addressHandler = (e, setAddress) => {
  const { name, value } = e.target;
  setAddress((prev) => ({
    ...prev,
    [name]: value,
  }));
}

export const ShopUserPhoneNumberValidation = (shopFormData) => {
  const isValidPhoneNumber = /^\d{10}$/.test(shopFormData.mobileNumber);
  return isValidPhoneNumber;
}

export const ShopDetailsSubmitHandler = (e, shopFormData, setModalContent, setShowModal, address) => {
  e.preventDefault();

  if (!ShopUserPhoneNumberValidation(shopFormData)) {
    setModalContent({
      title: "Error",
      body: "Enter 10 digit mobile number",
    });
    setShowModal(true);
    return;
  }

  setModalContent({
    title: "Success",
    body: " Thank you for providing your shop details. You can now navigate to the Inventory page to manage your products and inventory.",
  });
  setShowModal(true);
}

export const ShopConfirmHandler = async (setShowModal, modalContent, history, shopFormData, address, setShopFormData, setAddress) => {
  setShowModal(false);

  if (modalContent.title === "Success") {
    try {
      const userId = getAuth().currentUser.uid;
      await addDoc(collection(db, "ShopDetails"), {
        shopName: shopFormData.shopName,
        Name: shopFormData.name,
        MobileNumber: shopFormData.mobileNumber,
        email: shopFormData.email,
        UserID: userId,
        Address: {
          City: address.city,
          State: address.state,
          PostalCode: address.postalCode,
          Country: address.country,
        },
      });

      history.push("/inventory");
      setShopFormData({
        shopName: "",
        name: "",
        mobileNumber: "",
        email: ""
      });
      setAddress({
        city: "",
        state: "",
        postalCode: "",
        country: "",
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    history.replace('/shop');
  }
};
