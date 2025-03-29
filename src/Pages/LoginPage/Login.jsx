import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';
import { toast, ToastContainer, Zoom } from 'react-toastify';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      setLoading(!loading)
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      localStorage.setItem("user", JSON.stringify(user))

      toast.success("Login Successfull", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      })

      setTimeout(() => {

        navigate('/')
      }, 1500)

    } catch (error) {

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error :- ", errorCode, errorMessage);
      toast.error("Check your password and email", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Zoom,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false
      })
    }
    // Add authentication logic here
  };

  return (
    <div className="login-container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
      <div className="login-box">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {
            loading ? (
              <button type="button" className="loading-button" disabled>
                <svg className="spinner" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="spinner-path" />
                </svg>
                Processing…
              </button>
            ) : (

              <button type="submit">Sign In</button>
            )
          }

        </form>
        <p className="signup-link">New to Netflix?
          <span onClick={(e) => {
            handleLogin(e)
          }}>create a new account</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
