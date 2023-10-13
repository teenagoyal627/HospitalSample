import { Route} from "react-router"
import Login from "./Component/Authentication/Login"
import Signup from "./Component/Authentication/Signup"
import React, {  } from "react"
import Home from "./Component/Header/Home"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDetails from "./Component/Authentication/UserDetails"
import Shop from "./Component/ShopForm/Shop"
import Inventory from "./Component/Bill/Inventory/Inventories"
import InventoryForm from "./Component/Bill/Inventory/InventoryForm"
import CreateBill from "./Component/Bill/CreateBill/CreateBill"
import AllBill from "./Component/Bill/AllBills/AllBill"
// import  AlgoliaSearch  from "./Component/Bill/AllBills/AlgoliaSearch"

function App(){
  return(
    <div>
    <Route path='/'exact><Home/></Route>
    <Route path  ='/userDetails'><UserDetails/></Route>
   <Route path='/shop'><Shop/></Route>
   <Route path='/createBill'><CreateBill/></Route>
   <Route path='/allBill'><AllBill/></Route>
   <Route path='/inventory'><Inventory/></Route>
   <Route path='/inventoryForm'><InventoryForm/></Route>
   <Route path='/login'><Login/></Route>
   <Route path='/signup'><Signup/></Route>
   {/* <Route path='/search'><AlgoliaSearch/></Route> */}
</div>
  )
}
export default App