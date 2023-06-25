import { Link,  useHistory }from 'react-router-dom';
import classes from './Login.module.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';
import { useState } from 'react';
function Login(){

    const history=useHistory();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the email change
    const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
    };
    const onLogin=(event)=>{
        event.preventDefault();
        setError('');
        signInWithEmailAndPassword(auth,email,password)
        .then((user)=>{
            // alert("user succefully login")
            console.log(user.user)
        })
        .catch(err => setError(err.message))
        if (email === '' || password === '') {
            setError(true);
            } else {
            setSubmitted(true);
            setError(false);
            if(password===setPassword)
            history.replace("/inputdata");
            }
        setEmail('')
        setPassword('')
       
    }
    // Showing success message
const successMessage = () => {
    return (
    <div className="success"style={{display: submitted ? '' : 'none', }}>
    <h1>User {email} successfully Login!!</h1>
    </div>
    );
    };
// Showing error message if error is true
const errorMessage = () => {
    return (
    <div className={classes.error} style={{display: error ? '' : 'none',}}>
    <h3>Please enter correct email and password.</h3>
    </div>
    );
    };
    
    return (
        <div className={classes.form}>
          <div>
            <h1>Login</h1>
          </div>
          <div className={classes.message}>
         {errorMessage()}
             {successMessage()}
             </div>
          <form>
                <label>Email</label>
                    <input 
                    type='email'
                    id='email'
                    placeholder="Enter email" 
                    autoComplete='email'
                    onChange={handleEmail}
                    />
    
                    <label>Password</label>
                    <input type='password'
                    id='password'
                     placeholder="Enter password" 
                     autoComplete='current-password'
                     onChange={handlePassword} />
                    
                <br/><br/>
                    <button className={classes.btn}
                    onClick={onLogin}>Login</button>
                    
                <hr/>
                <div>
                <h5>New account 
                <Link to='/signup'className={classes.link}>Signup</Link>
               </h5>
                </div>
             
              </form>
        </div>
    )
}
export default Login;