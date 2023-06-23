import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { multiStepContext } from "../Context/StepContext";
import { useCookies } from 'react-cookie'
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const history = useHistory();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { userType } = useContext(multiStepContext);
  const [cookie, , removeCookie] = useCookies(['token']);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const header = { 'x-token': cookie.token };
        const response = await axios.get("http://localhost:5000/users/me", { headers: header });
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUser();
  }, [cookie.token]);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };


  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleLogout = async() => {
    // Perform logout logic here

    try {
      const header = {'x-token': cookie.token}
      const res = await axios.get("http://localhost:5000/disconnect", {headers: header});
      console.log(res.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      removeCookie('token', { path: '/' });
      history.push("/");
    }
  };

  const getNavigationLinks = () => {
    if (userType === "client") {
      return [
        { label: "Transactions", to: "/transactions" },
        { label: "Customer Service", to: "/customer-service" },
        { label: "Profile", to: "/profile" },
      ];
    } else if (userType === "staff") {
      return [
        { label: "Transactions", to: "/transactions" },
        { label: "Notifications", to: "/notifications" },
        { label: "customer", to: "/customers" },
      ];
    } else if (userType === "admin") {
      return [{ label: "Control", to: "/control" }];
    } else {
      return [
        { label: "About Us", to: "/about" },
        { label: "Login", to: "/login" },
        { label: "Sign Up", to: "/signup", specialColor: true },
        { label: "API", to: "/api" },
      ];
    }
  };

  return (
    <nav
      className="navbar sticky-top navbar-expand-lg navbar-light"
      style={{
        background: "#ECF0F1",
        borderBottomLeftRadius: "50px",
        borderBottomRightRadius: "50px",
      }}
    >
      <Link
        className="navbar-brand"
        to="/"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src="./assets/images/logo.png"
          alt="Logo"
          style={{ width: "50px", height: "50px", marginRight: "10px" }}
        />
        <span style={{ marginLeft: "10px" }}>Community Bank</span>
      </Link>
      <button
        className={`navbar-toggler ${profileOpen ? "collapsed" : ""}`}
        type="button"
        aria-controls="navbarNav"
        aria-expanded={navbarOpen ? "true" : "false"}
        aria-label="Toggle navigation"
        onClick={toggleNavbar}
      >
        {profileOpen ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-bars"></i>
        )}
      </button>
      <div
        className={`collapse navbar-collapse ${navbarOpen ? "show" : ""}`}
        id="navbarNav"
      >
        <ul className="navbar-nav ml-auto">
          {getNavigationLinks().map((link, index) => (
            <li className="nav-item" key={index}>
              <Link
                className="nav-link"
                to={link.to}
                style={{
                  backgroundColor: link.specialColor ? "#DC7633" : "transparent",
                  color: link.specialColor ? "white" : "black",
                  borderRadius: "10px",
                  padding: "5px 10px",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {(userType === "client" || userType === "staff") && (
            <li className="nav-item profile-button">
              <button className="nav-link" onClick={toggleProfile}>
                <i className={`fas ${profileOpen ? "fa-times" : "fa-user"}`}></i>
              </button>
            </li>
          )}
          {userType && (
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          )}
        </ul>
      </div>
      {profileOpen && (
        <div className="profile-overlay">
          {userData ? (
            <div className="profile-info">
              <div className="profile-details">
                <h4>{userData.userID}</h4>
                <p>{userData.userType}</p>
                {/* Add more user data here */}
              </div>
            </div>
          ) : (
            <div className="profile-loading">
              <i className="fas fa-circle-notch fa-spin"></i>
              <p>Loading user data...</p>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
