import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { AiOutlineArrowRight } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { VscGithub } from "react-icons/vsc"
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/Slices/userSlice';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const dispatch=useDispatch()

    //Sign Up
    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("Please enter correct password");
            return;
        }
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            console.log(user)
            dispatch(setUser(user))
            alert("sign up successfull " + user.email);
            navigate("/login")
            
        } catch (e) {
            alert(e.message)
            return;
        }
    }
    const googleProvider = new GoogleAuthProvider();

    //Sign up with PopUp
    const signUpWithGoogle = async () => {
        signInWithPopup(auth, googleProvider).then((res) => {
            dispatch(setUser(res.user))

            alert("sign up successfull " + res.user.email);
        }).catch((e)=>{
            alert(e.message);
        })
    }
    return (
        <div className='loginPAge'>
            <div className="loginDiv">
                <img style={{ borderRadius: "12px 12px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThQe26pjQDTILBfmtsura0MSCDhSFhU1iF9w&usqp=CAU" alt="rocketImg" />
                <h3 style={{ textAlign: "center", color: "#7653d3", fontWeight: "bold" }}>welcome to Bardeen</h3>
                <p style={{ textAlign: "center" }}>let's Signup to launch your automations.</p>
                <div className="inputs">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email Address' />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='Confirm Password' />

                </div>
                <div className="hyperlinks">
                    <Link to="/login" style={{ color: "#6249a3", textDecoration: "none" }}>Already have Account</Link>
                    <span style={{ color: "#6249a3" }}>Forgot Password?</span>

                </div>
                <button onClick={handleSignup} className='signinBtn'>Sign up</button>
                <div className="loginOptions">
                    <div className="option">
                        <div onClick={signUpWithGoogle} style={{ display: "flex", alignItems: "center",cursor:"pointer" }}>

                            <FcGoogle className='loginLogo' />
                            <span style={{ marginLeft: "10px", color: "#7653d3", fontWeight: "bold" }}>Sign up With Google</span>
                        </div>
                        <span><AiOutlineArrowRight /></span>
                    </div>
                    <div className="option">
                        <div style={{ display: "flex", alignItems: "center" }}>

                            <VscGithub className='loginLogo' />
                            <span style={{ marginLeft: "10px", color: "#7653d3", fontWeight: "bold" }}>Sign up With Github</span>
                        </div>
                        <span><AiOutlineArrowRight /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
