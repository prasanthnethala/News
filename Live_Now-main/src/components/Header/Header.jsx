import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import { CiTwitter } from "react-icons/ci";
import { FiInstagram } from "react-icons/fi";
import { GrLogout } from "react-icons/gr";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { setUser } from "../../Redux/Slices/userSlice";
const Header = () => {
  const { user } = useSelector((state) => state.user);
  console.log(typeof user);
  const [userLogo, setUSerLogo] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    //protect route --->
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUSerLogo(user.email.split("")[0].toUpperCase());
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
        navigate("/login");
      }
    });
  }, []);

  const ref = useRef();
  //side menu toggle --->
  const toggleMenu = () => {
    if (ref.current.classList.contains("humMenu")) {
      ref.current.classList.add("translate0");
      ref.current.classList.remove("humMenu");
    } else if (!ref.current.classList.contains("humMenu")) {
      ref.current.classList.remove("translate0");
      ref.current.classList.add("humMenu");
    }
  };

  //logout user --->
  const Logout = () => {
    signOut(auth);
    alert("Logged out");
    dispatch(setUser(null));
  };

  return (
    <>
      <div className="Header">
        <div className="leftNav">
          <div className="logo">
            <span>{userLogo}</span>
          </div>
          <div className="nav">
            <ul>
              <li>Learn</li>
              <li>Blog</li>
              <li>BOOKMARKS</li>
              <li>UI KIT</li>
              <li>LAIN NYA</li>
            </ul>
          </div>
        </div>
        <div className="social">
          <span>
            <CiTwitter />
          </span>
          <span>
            <FiInstagram />
          </span>
          <span>
            <FiInstagram />
          </span>
          <span>
            <GrLogout onClick={Logout} />
          </span>
        </div>
        <AiOutlineMenu
          onClick={toggleMenu}
          className="menuIcon"
          style={{ display: "none" }}
        />
      </div>

      <div ref={ref} onClick={toggleMenu} className="humMenu">
        <span style={{ float: "right", marginRight: "10px", fontSize: "30px" }}>
          X
        </span>
        <div className="list">
          <li>Learn</li>
          <li>Blog</li>
          <li>BOOKMARKS</li>
          <li>UI KIT</li>
          <li>
            <span>
              <GrLogout onClick={Logout} />
            </span>
          </li>
        </div>
      </div>
    </>
  );
};

export default Header;
