import { useState } from 'react';
// import Hamburger from './Hamburger';
import HeaderLine from './HeaderLine';
import classes from './Navigation.module.css'

function Navigation(props) {
    // const[open,setOpen]= useState(false)

    // function handleClick(){
    //         setOpen(!open)
    //         console.log("hamburger button is  show")
    //    }

    return (
        <div>
            <HeaderLine />
            {/* <Hamburger open={open} onClick={handleClick} /> */}

            {/* {open &&(<main className={classes.main}>
                {props.children}
            </main>
           
            )} */}

        </div>
    )
}
export default Navigation;