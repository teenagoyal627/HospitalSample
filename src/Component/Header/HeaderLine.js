import { Link } from "react-router-dom";
import style from './HeaderLine.module.css'

function HeaderLine(){

    return(
       
        <header className={style.header}>
         <div className={style.logo}>Medical Shop Managment System  </div>
     
        <nav>
            <ul>
                {/* <li> <Link to='/' className={style.link}> Home </Link></li> */}
               <li><Link to='shop' className={style.link}> Shop Details</Link></li>
               <li><Link to='inventory' className={style.link}>Inventories</Link></li>
               <li><Link to='createBill' className={style.link}> Create Bill</Link></li>
               <li><Link to='allBill' className={style.link}>All Bill</Link></li>
               <li><Link to='profile' className={style.link}>My Profile</Link></li>
               <li><Link to='logout' className={style.link}>Logout</Link></li>

                {/* <li><Link to ='signup' className={style.link}>Sign up</Link></li> */}
            </ul>
        </nav>

        </header>
       
    )
}
export default HeaderLine;