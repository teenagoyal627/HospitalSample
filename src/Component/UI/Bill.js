import classes from './Bill.module.css'
function Bill(props){
    return(
        <div className={classes.bill}>
            {props.children}
        </div>
    )
}
export default Bill;