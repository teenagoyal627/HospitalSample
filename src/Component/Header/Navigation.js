import HeaderLine from './HeaderLine';
import classes from './Navigation.module.css'

function Navigation(props) {
    return (
        <div>
            <HeaderLine />
            <main className={classes.main}>
                {props.children}
            </main>
        </div>
    )
}
export default Navigation;