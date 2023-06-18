import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ userType }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simulating fetching user data from /user endpoint
    fetchUserData();
  }, []);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const fetchUserData = () => {
    // Simulating fetching user data from /user endpoint
    setTimeout(() => {
      const data = {
        name: "John Doe",
        email: "johndoe@example.com",
        // Add more data properties as needed
      };
      setUserData(data);
    }, 1000);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const getNavigationLinks = () => {
    userType = 'client'
    if (userType === "client") {
      return [
        { label: "Transactions", to: "/transactions" },
        { label: "Profile", to: "/profile" },
        { label: "Customer Service", to: "/customer-service" },
        { label: "Log Out", to: "/logout" },
      ];
    } else if (userType === "staff") {
      return [
        { label: "Transactions", to: "/transactions" },
        { label: "Profile", to: "/profile" },
        { label: "Notifications", to: "/notifications" },
        { label: "Log Out", to: "/logout" },
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
        </ul>
      </div>
      {profileOpen && (
        <div className="profile-overlay">
          {userData ? (
            <div className="profile-info">
              <div className="profile-details">
                <h4>{userData.name}</h4>
                <p>{userData.email}</p>
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
