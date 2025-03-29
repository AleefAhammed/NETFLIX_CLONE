import React, { useEffect, useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../../Firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { Bounce, toast, ToastContainer, Zoom } from 'react-toastify';

function Signup() {
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!', {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
                transition: Zoom,
                hideProgressBar: true,
                pauseOnHover: false,
                draggable: false
            });
            setLoading(false);
            return;
        }
        setLoading(!loading)
        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: userName })

            await addDoc(collection(db, "users"), {
                id: userCredential.user.uid,
                userName: userName,
                email: email,
            })

            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Created Account successfully", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            }
            )

            setTimeout(() => {

                navigate('/')
            },1500)
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error :-", errorCode, errorMessage);
        }
    };

    useEffect(() => {

        const testFirestore = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                console.log("Firestore connected! Found users:", querySnapshot.docs.map(doc => doc.data()));
            } catch (error) {
                console.error("Firestore connection error:", error);
            }
        };

        testFirestore();
    }, [])

    return (
        <div className="signup-container">
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
            <div className="signup-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>

                    <input
                        type="text"
                        placeholder="User Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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

                        )
                            :
                            (
                                <button onClick={(e) => handleSignup(e)}>Sign Up</button>
                            )
                    }
                </form>

                <p className="login-link">Already have an account?
                    <span onClick={(e) => {

                        e.preventDefault()
                        navigate('/login')
                    }}>
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;
