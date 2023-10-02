import React, { useState } from "react";
import "./Login.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { VscGithub } from "react-icons/vsc";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/Slices/userSlice";
import { Link } from "react-router-dom/dist";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Login existing user --->
  const handleLogin = async () => {
    if (!password || !password) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      alert("sign in successfull " + user.email);
      navigate("/");
      return;
    } catch (e) {
      alert(e.message);
      return;
    }
  };
  const googleProvider = new GoogleAuthProvider();
  //Login using Google account --->
  const signinWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        dispatch(setUser(res.user));

        alert("sign in successfull " + res.user.email);
        navigate("/");
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <div className="loginPAge">
      <div className="loginDiv">
        <img
          style={{ borderRadius: "12px 12px" }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThQe26pjQDTILBfmtsura0MSCDhSFhU1iF9w&usqp=CAU"
          alt="rocketImg"
        />
        <h3
          style={{ textAlign: "center", color: "#7653d3", fontWeight: "bold" }}
        >
          welcome to Bardeen
        </h3>
        <p style={{ textAlign: "center" }}>
          log in to launch your automations.
        </p>
        <div className="inputs">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email Address"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="hyperlinks">
          <Link
            to="/signup"
            style={{
              color: "#6249a3",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Create Account
          </Link>
          <span style={{ color: "#6249a3" }}>Forgot Password?</span>
        </div>
        <button onClick={handleLogin} className="signinBtn">
          Sign in
        </button>
        <div className="loginOptions">
          <div className="option">
            <div
              onClick={signinWithGoogle}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FcGoogle className="loginLogo" />
              <span
                style={{
                  marginLeft: "10px",
                  color: "#7653d3",
                  fontWeight: "bold",
                }}
              >
                Sign in With Google
              </span>
            </div>
            <span>
              <AiOutlineArrowRight />
            </span>
          </div>
          <div className="option">
            <div style={{ display: "flex", alignItems: "center" }}>
              <VscGithub className="loginLogo" />
              <span
                style={{
                  marginLeft: "10px",
                  color: "#7653d3",
                  fontWeight: "bold",
                }}
              >
                Sign in With Github
              </span>
            </div>
            <span>
              <AiOutlineArrowRight />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
