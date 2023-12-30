import React from 'react'
import classes from './ShopData.module.css'
const ShopData = ({shopDetails}) => {
  console.log(shopDetails)
  return (
    <div className={classes.data}>
    {/* <div className={classes.imageContainer}>
    <img src={shopDetails.image} alt="shop" className={classes.shopImage}/>

    </div> */}

            <h2 className={classes.shopName}>{shopDetails.shopName}</h2>
            <div className={classes.addressContainer}>
            <h2 >{shopDetails.Address.StreetAddress}</h2>
            <h2>,{shopDetails.Address.City}</h2>
            <h2>,{shopDetails.Address.State}</h2>
            <h2>-{shopDetails.Address.PostalCode}</h2>
            </div>
           
    </div>
  )
}

export default ShopData
