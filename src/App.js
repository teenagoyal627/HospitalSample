import { Route} from "react-router"
import Login from "./Component/Authentication/Login/Login"
import Signup from "./Component/Authentication/Signup/Signup"
import React, {  } from "react"
import Home from "./Component/Header/Home"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDetails from "./Component/Authentication/UserDetails/UserDetails"
import Shop from "./Component/ShopDetails/Shop"
import Inventory from "./Component/Bill/Inventory/StoreInventories/Inventories"
import InventoryForm from "./Component/Bill/Inventory/InventoryDetailsForm/InventoryFunctionality"
import CreateBill from "./Component/Bill/CreateBill/CreateBill"
import AllBill from "./Component/Bill/AllBills/AllBill"
// import Profile from "./Component/Authentication/Profile"
import Logout from "./Component/Authentication/Logout/Logout"
// import  AlgoliaSearch  from "./Component/Bill/AllBills/AlgoliaSearch"

function App(){
  return(
    <div>
    <Route path='/'exact><Home/></Route>
    <Route path='/userDetails'><UserDetails/></Route>
   <Route path='/shop'><Shop/></Route>
   <Route path='/createBill'><CreateBill/></Route>
   <Route path='/allBill'><AllBill/></Route>
   <Route path='/inventory'><Inventory/></Route>
   <Route path='/inventoryForm'><InventoryForm/></Route>
   <Route path='/login'><Login/></Route>
   <Route path='/signup'><Signup/></Route>
   {/* <Route path='/profile'><Profile/></Route> */}
   <Route path='/logout'><Logout/></Route>
   {/* <Route path='/search'><AlgoliaSearch/></Route> */}
</div>
  )
}
export default App