import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// button color #2471A3 hover change color #1B4F72
const useStyles = makeStyles({
  button: {
    background: "#FADBD8",
    border: 0,
    borderRadius: 6,
    color: "black",
    height: 48,
    padding: "0 30px",
    "&:hover": {
      background: "#F1948A",
      color: "white",
    }
  },
});

export default function Landing() {
  const classes = useStyles();
  const StepCard = ({ icon, iconClass, title, description, to }) => (
    <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg transition-transform duration-300 transform hover:scale-105">
        <div className="px-4 py-5 flex-auto">
          <Link to={to} className="card-link text-decoration-none">
            <div
              className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full ${iconClass}`}
            >
              <i className={icon}></i>
            </div>
            <h6 className="text-xl font-semibold">
              <span className="text-decoration-none">{title}</span>
            </h6>
            <p className="mt-2 mb-4 text-gray-600">
              <span className="text-decoration-none">{description}</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <main>
        <div
          className="relative  pt-16 pb-32 flex content-center items-center justify-center"
          style={{
            minHeight: "75vh",
          }}
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://www.regions.com/-/media/Images/Hero5050/5050-DigitalBanking-OLB-hero.jpg",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <div className="flex justify-center">
                    <img
                      src="./assets/images/logo.png"
                      alt="Logo"
                      style={{
                        width: "200px",
                        height: "200px",
                        marginRight: "10px",
                      }}
                    />
                  </div>
                  <h1 className="text-white font-semibold text-5xl">
                    Community Bank.
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    <Link
                      to="/signup"
                      className="text-blue-500 hover:text-blue-700 font-bold text-xl"
                    >
                      Join us
                    </Link>{" "}
                    on this journey of financial empowerment and become part of
                    a thriving community. Together, we can redefine the way we
                    bank and foster stronger connections within our community.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-gray-300 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <StepCard
                icon="fas fa-award"
                iconClass="bg-red-400"
                title="1. Create Account"
                description="Add the basic details about yourself and some bank details to open an account."
                to="/add"
              />
              <StepCard
                icon="fas fa-retweet"
                iconClass="bg-blue-400"
                title="2. Transfer Money"
                description="Go to the customer page and transfer money to any person by clicking on transfer."
                to="/customers"
              />
              <StepCard
                icon="fas fa-fingerprint"
                iconClass="bg-green-400"
                title="3. Transaction History"
                description="Discover your money flow by checking the transfer amount in your transactions."
                to="/transactions"
              />
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Working of the New Customer
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                  It is a three step process in which the first you have to give
                  the details about yourself and then the bank detials and the
                  last step is to verify all your details.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  While filling the form the feild account name and amount is
                  very necessary to fill properly beacuse this data will only
                  show on the customers page if you forgot to fill any feild
                  then there will be an alert.
                </p>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-800">
                  <img
                    alt="..."
                    src="./assets/images/form.svg"
                    className="w-full align-middle rounded-t-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 bg-gray-300 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap"></div>
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-600">
                  <img
                    alt="..."
                    src="./assets/images/customers.svg"
                    className="w-full align-middle rounded-t-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Customers
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                  This is the main part of the website in which all the
                  customers name is present with their account balance through
                  which you can send and receive money from any person.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  1. Click on the transfer button.<br></br>
                  2. Choose the person and amount.<br></br>
                  3. Click on Send button.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 bg-gray-300 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap"></div>
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Transactions
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                  In the transactions page you can see the transactions amount
                  who sent how much money to whom.It is direct and straight. You
                  can only read the data their.
                </p>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-600">
                  <img
                    alt="..."
                    src="./assets/images/transactions.svg"
                    className="w-full align-middle rounded-t-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-gray-900">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-900 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
        <div className="flex flex-wrap text-center justify-center">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-4xl font-semibold text-white">
              Details of the website
            </h2>
            <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
              This website is made by using MERN stack
              (MongoDB, Express, React, Node.js). It is a simple banking system
              in which you can transfer money from one person to another person.
              You can also see the transaction history of the person.
            </p>
            <ButtonGroup>
              <Button
                tag="a"
                variant="contained"
                className={classes.button}
                href="https://github.com/robelandro/Cobank"
              >
                View on Github
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
        </section>
      </main>
    </>
  );
}
