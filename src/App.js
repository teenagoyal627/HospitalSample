import { Route} from "react-router"
import Login from "./Component/Authentication/Login"
import Signup from "./Component/Authentication/Signup"
import AllBill from "./Component/Bill/AllBill"
import CreateBill from "./Component/Bill/CreateBill"
import InputData from "./Component/Bill/InputData"
import Inventory from "./Component/Bill/Inventory"
import Navigation from "./Component/Header/Navigation"
import React, { useState } from "react"
import Shop from "./Component/Header/Shop"
import Home from "./Component/Header/Home"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
  return(
    <div>
    {/* <AlertDialog/> */}

    <Navigation>
   
    <Route path='/'exact><Home/></Route>
   <Route path='/shop'><Shop/></Route>
   <Route path='/inputData'><InputData/></Route>
   <Route path='/createBill'><CreateBill/></Route>
   <Route path='/allBill'><AllBill/></Route>
   <Route path='/inventory'><Inventory/></Route>
   <Route path='/login'><Login/></Route>
   <Route path='/signup'><Signup/></Route>
   </Navigation>
</div>
    
  )
}
export default App