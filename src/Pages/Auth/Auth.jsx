import React, { useState, useContext } from 'react'
import classes from './SignUp.module.css'
import LayOut from '../../components/Layout/LayOut'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { auth } from '../../Utility/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { DataContext } from '../../components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'
import { ClipLoader } from 'react-spinners'

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({
    signin: false,
    signup: false
  })

  const [{ user }, dispatch] = useContext(DataContext)
  const navigate = useNavigate()
  const navStateData = useLocation()

  const authHandler = (e) => {
    e.preventDefault()
    if (e.target.name == "signin") {
      setLoading({ ...loading, signIn: true })
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch({
            type: Type.SET_USER,
            user: userCredential
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/")
        }).catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage)
          setLoading({ ...loading, signIn: false })
        });
    } else {
      setLoading({ ...loading, signUp: true })
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch({
            type: Type.SET_USER,
            user: userCredential
          });
          setLoading({ ...loading, signUp: false })
          navigate(navStateData?.state?.redirect || "/")
        }).catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage)
          setLoading({ ...loading, signUp: false })
        });
    }
  }

  return (
    <section className={classes.login}>
      <Link>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png" alt="" />
      </Link>

      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData.state?.msg && (
          <small style={{
            padding: "5px",
            textAlign: "center",
            color: "red",
            fontWeight: "bold"
          }}>
            {navStateData.state.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id='email' />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="" id="password" />
          </div>

          <button type='submit' name='signin' onClick={authHandler} className={classes.login__signInButton}>
            {loading.signIn ? (<ClipLoader color="#000" size={15} />) : (
              'Sign In'
            )}
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZONE FAKE CLONE conditions of use & sale. please see our privacy Notice, our cookies notice and our Interest-based Ads Notice
        </p>

        <button type='submit' name='signup' onClick={authHandler} className={classes.login_registerButton}>
          {loading.signUp ? (<ClipLoader color="#000" size={15} />) : (
            'Create your Amazone Account'
          )}
        </button>
        {
          error && <small style={{ paddingTop: '5px', color: 'red', }}>{error}</small>
        }
      </div>
    </section>
  )
}

export default Auth
