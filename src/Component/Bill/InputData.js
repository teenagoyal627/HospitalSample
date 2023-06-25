import { Link } from "react-router-dom";
import Bill from "../UI/Bill";
import classes from './InputData.module.css'
function InputData() {

    return (

        <div className={classes.bill}>
            <Bill> <Link to='/createBill' className={classes.link}>Create Bill</Link>
            <h3>if you want to create the bill that click on this link</h3>
            </Bill><br />
            <Bill><Link to='/allBill' className={classes.link}>All Bill</Link>
            <h3>if you want to show the all bills then click on this link</h3>
            </Bill> <br />
            <Bill>  <Link to='/inventory' className={classes.link}>Inventory </Link>
            <h3>if you wants to updation then click on this link</h3>
            </Bill>

        </div>
    )
}
export default InputData;