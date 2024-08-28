import React from "react";
import Card from "../UI/Card";
import classes from "./Shop.module.css";

const ShopForm = ({
  ShopDetailsSubmitHandler,
  shopFormData,
  shopFormDataInputChangeHandler,
  address,
  addressHandler,
}) => {
  return (
    <div>
      <Card>
        <div>
          <h1 className={classes.heading}>Shop Details</h1>
        </div>
        <form className={classes.form} onSubmit={ShopDetailsSubmitHandler}>
          <div className={classes.control}>
            <label>Shop Name</label>
            <input
              type="text"
              required
              id="shopName"
              value={shopFormData.shopName}
              onChange={shopFormDataInputChangeHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Owner Name</label>
            <input
              type="text"
              required
              id="name"
              value={shopFormData.name}
              onChange={shopFormDataInputChangeHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="number"
              required
              id="mobileNumber"
              value={shopFormData.mobileNumber}
              onChange={shopFormDataInputChangeHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              id="email"
              value={shopFormData.email}
              onChange={shopFormDataInputChangeHandler}
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
      </Card>
    </div>
  );
};

export default ShopForm;
