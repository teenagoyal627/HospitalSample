import React from 'react'
import classes from './ShopData.module.css'

const ShopData = ({ shopDetails }) => {
  console.log(shopDetails)
  return (
    <div className={classes.data}>
      {/* <div className={classes.imageContainer}>
    <img src={shopDetails.image} alt="shop" className={classes.shopImage}/>

    </div> */}
      {/* <h3>{shopDetails.shopName}</h3> */}

      {/* <div className={classes.container}> */}
        {/* <div className={classes.leftData}>
          <p>Date: {filterdata.Date}</p>
          <p>Hospital Name: {filterdata.HospitalName}</p>
          <p>Doctor Name: {filterdata.DoctorName}</p>
        </div> */}

        {/* <div className={classes.rightData}>
        <h5 >{shopDetails.Address.StreetAddress}</h5>
        <h2>{shopDetails.Address.City}</h2>
        <h2>{shopDetails.Address.State}</h2>
        <h2>{shopDetails.Address.PostalCode}</h2>
        </div>
      </div> */}
      <h1 className={classes.shopName}>{shopDetails.shopName}</h1>
      <div className={classes.addressContainer}>
        <h5 >{shopDetails.Address.StreetAddress}</h5>
        <h2>,{shopDetails.Address.City}</h2>
        <h2>,{shopDetails.Address.State}</h2>
        <h2>-{shopDetails.Address.PostalCode}</h2>
      </div>

    </div>
  )
}

export default ShopData
