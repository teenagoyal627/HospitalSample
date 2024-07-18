import { collection, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./Shop.module.css";
import { db } from "../../Firebase";
import { useHistory } from "react-router";
import { getAuth } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navigation from "../Header/Navigation";

function Shop() {
  const history = useHistory();
  const [shopName, setShopName] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [error, setError] = useState(false);
  const [address, setAddress] = useState({
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const validatePhoneNumber = () => {
    const isValidPhoneNumber = /^\d{10}$/.test(mobileNumber);
    console.log(isValidPhoneNumber)
    if(!isValidPhoneNumber){
      setError(true)
      setShowConfirmationModal(false)
    }
    else{
      setError(false)
      setShowConfirmationModal(true)

    }
  };

  useEffect(() => {
    if (!error) {
console.log("no any error comes ")
    }
  }, [error]);

  const addressHandler = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit button click");

    validatePhoneNumber();
    if(!error){
      // setError(false)
      handleSubmission()
    }
  };

  const handleSubmission = async () => {
    try {
      const userId = getAuth().currentUser.uid;
      console.log(userId);
      await addDoc(collection(db, "ShopDetails"), {
        shopName: shopName,
        Name: name,
        MobileNumber: mobileNumber,
        email: email,
        UserID: userId,
        Address: {
          City: address.city,
          State: address.state,
          PostalCode: address.postalCode,
          Country: address.country,
        },
      });
      setShowConfirmationModal(true);
    } catch (err) {
      console.log("Error adding document: ", err);
    }
  };

  const handleConfirm = () => {
    setShowConfirmationModal(false);
    history.push("/inventory");
    setShopName("");
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
        <hr />
        {error && (
          <div style={{ color: "red" }}>
            <p>Enter a valid 10 digit number</p>
          </div>
        )}

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
                  <p>
                    Thank you for providing your shop details. You can now
                    navigate to the Inventory page to manage your products and
                    inventory.
                  </p>
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
