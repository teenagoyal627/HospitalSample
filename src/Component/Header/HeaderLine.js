import { Link } from "react-router-dom";
import style from './HeaderLine.module.css'

function HeaderLine() {

    return (

        <header className={style.header}>
             <div className="nav-bar">
          <a href="/" className="logo">
            <h1>Medical Shop Managment System</h1>
          </a>
          </div>
            <nav>
                <ul>
                    <li><Link to='shop' className={style.link}> Shop Details</Link></li>
                    <li><Link to='inventory' className={style.link}>Inventories</Link></li>
                    <li><Link to='createBill' className={style.link}> Create Bill</Link></li>
                    <li><Link to='allBill' className={style.link}>All Bill</Link></li>
                    <li><Link to='logout' className={style.link}>Logout</Link></li>
                </ul>
            </nav>

        </header>

    )
}
export default HeaderLine;

