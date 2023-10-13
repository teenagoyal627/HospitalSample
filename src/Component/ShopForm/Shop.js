import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import Card from "../UI/Card";
import classes from "./Shop.module.css";
import { db, storage } from "../../Firebase";
import { useHistory } from "react-router";
import { getAuth } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "../Authentication/Signup";
import Navigation from "../Header/Navigation";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Shop() {
  const history = useHistory();
  const [shopName, setShopName] = useState("");
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [address, setAddress] = useState({
    //store the addresss in the form of object.
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const addressHandler = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setShowConfirmationModal(true);

    if (!file) return;
    //this function will be called when the upload is completed
    const handleUploadComplete = (downloadURL) => {
      const auth = getAuth().currentUser.uid;
      console.log(getAuth());
      console.log(auth);

      addDoc(collection(db, "ShopDetails"), {
        shopName: shopName,
        image: downloadURL, // Use the download URL here
        Name: name,
        MobileNumber: mobileNumber,
        email: email,
        UserID: auth,
        Address: {
          City: address.city,
          State: address.state,
          PostalCode: address.postalCode,
          Country: address.country,
        },
      })
        .then((shopDataRef) => {
          const shopId = shopDataRef.id;
          console.log(shopId);
          <div>
            <Signup shopId={shopId} />
          </div>;
          alert("image is uploaded successfully");
        })
        .catch((error) => {
          console.error("Error adding shop data: ", error);
          alert("Error uploading image");
        });
    };

    //this is for store teh data on firestore
    try {
      const storageRef = ref(storage, `shop_Image/${file.name}`);
      console.log("storageref is called");
      const metadata = {
        contentType: "image/jpeg",
      };
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // This function will be called during the upload process
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        console.log("now getdoenldurl run"),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("file is available is ", downloadURL);
              handleUploadComplete(downloadURL);
            })
            .catch((error) => {
              alert("error uploading image", error);
            });
          console.log("downlaod url run");
        }
      )} catch (err) {
      alert("error uploading image" + err);
    }
  };
  const handleConfirm = () => {
    setShowConfirmationModal(false);
    history.push("/inventory");
    setShopName("");
    setFile("");
    setName("");
    setMobileNumber("");
    setEmail("");
    setAddress({
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div>
      <Navigation />
      {/* <Image/> */}
      <Card>
        <div>
          <h1 className={classes.heading}>Shop Details</h1>
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label>Shop Name</label>
            <input
              type="text"
              required
              id="shopName"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Shop Image</label>
            <input
              type="file"
              required
              onChange={handleFileChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Owner Name</label>
            <input
              type="text"
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="number"
              required
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <fieldset>
              <label>Address</label>
              <input
                type="text"
                name="city"
                placeholder="city"
                required
                style={{ marginBottom: ".7rem" }}
                value={address.city}
                onChange={addressHandler}
              />
              <input
                type="text"
                name="state"
                placeholder="state/province"
                required
                style={{ marginBottom: ".7rem" }}
                value={address.state}
                onChange={addressHandler}
              />
              <input
                type="text"
                name="postalCode"
                placeholder="postal/zip code"
                required
                style={{ marginBottom: ".7rem" }}
                value={address.postalCode}
                onChange={addressHandler}
              />
              <input
                type="text"
                name="country"
                placeholder="country"
                required
                value={address.country}
                onChange={addressHandler}
              />
            </fieldset>
          </div>
          <button type="submit">Submit</button>
        </form>
        {showConfirmationModal && (
          <div
            className="modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Submission</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCancel}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p> content dalna hai</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleConfirm}
                  >
                    OK
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Shop;
