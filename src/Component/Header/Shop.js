// import { async } from "@firebase/util";
import{collection,addDoc} from 'firebase/firestore'
import { useState } from "react";
import Card from "../UI/Card";
import classes from './Shop.module.css'
import {db} from '../../Firebase'
import { useHistory } from 'react-router';
import CustomizedDialogs from '../../Customization';

function Shop() {
    const [ShopName, setShopName] = useState("")
    const [Name, setName] = useState("")
    const [MobileNumber, setMobileNumber] = useState("")
    const [Email, setEmail] = useState("")
    const [Location, setLocation] = useState("")
    const [PinCode, setPinCode] = useState("")
    const history=useHistory();

    const submitHandler = async(event) => {
        event.preventDefault();
        setShopName("")
        setName("")
        setMobileNumber("")
        setEmail("")
        setLocation("")
        setPinCode("");
        //this is for store teh data on firestore 
     try{
        await addDoc(collection(db,"ShopDetails"),
        {
            shopName:ShopName,
            Name:Name,
            MobileNumber:MobileNumber,
            email:Email,
            location:Location,
            pinCode:PinCode

        })
    }catch(err){
        history.replace('/signup')
    }
    history.replace('/inputData');

}
    return (

        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>

                    <label htmlFor="shopName">Shop Name</label>
                    <input type='text'
                        required id='shopName'
                        value={ShopName}
                        onChange={(event) => setShopName(event.target.value)}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="name">Name</label>
                    <input type='text'
                        required id='name'
                        value={Name}
                        onChange={(event) => setName(event.target.value)} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input type='number'
                        required id='mobileNumber'
                        value={MobileNumber}
                        onChange={(event) => setMobileNumber(event.target.value)} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="email">Email</label>
                    <input type='email'
                        required id='email'
                        value={Email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className={classes.control}>

                    <label htmlFor="location">Location </label>
                    <input type='text'
                        required id='location'
                        value={Location}
                        onChange={(event) => setLocation(event.target.value)} />
                </div>
                <div className={classes.control}>

                    <label htmlFor="pinCode">Pincode </label>
                    <input type='number'
                        required id='pinCode'
                        value={PinCode}
                        onChange={(event) => setPinCode(event.target.value)} />
                </div>
                <div className={classes.actions}>
                   <div>
                    <button
                     type="submit">{<CustomizedDialogs/>}</button>
                      </div>
                </div>

            </form>
        </Card>
    )

}
export default Shop;