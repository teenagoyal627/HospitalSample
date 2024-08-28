import React from 'react'
import Card from "../../../UI/Card";
import classes from "./InventoryForm.module.css";

const InventoryFormFields = ({AddHandler,formData,InventoryHandleChange}) => {
  return (
       <Card>
        <form className={classes.form} onSubmit={AddHandler}>
          <div>
            <h1 className={classes.heading}>Inventory Form</h1>
          </div>
          <div className={classes.control}>
            <label>Medicine Name</label>
            <input
              type="text"
              required
              id="medicineName"
              value={formData.medicineName}
              onChange={InventoryHandleChange}
              name="medicineName"
            />
          </div>

          <div className={classes.control}>
          <label>Quantity</label>
          <input
            type="number"
            required
            id="quantity"
            value={formData.quantity}
            onChange={InventoryHandleChange}
            name="quantity"
          />
        </div>
        <div className={classes.control}>
          <label>Price(per Medicine) </label>
          <input
            type="number"
            min="1"
            required
            id="price"
            value={formData.price}
            onChange={InventoryHandleChange}
            name="price"
          />
        </div>
        <div className={classes.control}>
          <label>Mfg. Date</label>
          <input
            type="date"
            required
            id="mfg"
            value={formData.mfgDate}
            onChange={InventoryHandleChange}
            name="mfgDate"
          />
        </div>
        <div className={classes.control}>
          <label>Expire Date</label>
          <input
            type="date"
            required
            id="expire"
            value={formData.expireDate}
            onChange={InventoryHandleChange}
            name="expireDate"
          />
        </div>
        <div className={classes.control}>
          <label>MG</label>
          <input
            type="number"
            required
            id="mg"
            value={formData.mg}
            onChange={InventoryHandleChange}
            name="mg"
          />
        </div>
        <div className={classes.control}>
          <label>Campany </label>
          <input
            type="text"
            required
            id="campany"
            value={formData.company}
            onChange={InventoryHandleChange}
            name="company"
          />
        </div>
        <div className={classes.control}>
          <label>Composition </label>
          <input
            type="text"
            required
            id="composition"
            value={formData.composition}
            onChange={InventoryHandleChange}
            name="composition"
          />
        </div>

          <button type="submit">Save</button>
        </form>
      </Card>
  )
}

export default InventoryFormFields
