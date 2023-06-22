import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Landing from './Landing';
import TransTable from './TransTable';
import { useCookies } from 'react-cookie';
import { multiStepContext } from "../Context/StepContext";
import { makeStyles } from "@material-ui/core/styles";
// Import a spinner component
import { BounceLoader } from "react-spinners";


const useStyles = makeStyles({
  loader: {
    display: "flex", // Use flexbox
    alignItems: "center", // Align items to the center
    justifyContent: "center", // Justify content to the center
    height: "50vh", // Set the height to the full viewport
  },
});

const Home = () => {
    const [cookie, ] = useCookies(['token']);
    const [isLanding, setIsLanding] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // Create a state variable for loading
    const { setUserType } = useContext(multiStepContext);
    const classes = useStyles();

    useEffect(() => {
        // Move the function definition inside the hook
        const fetchUser = async () => {
          try {
            setIsLoading(true); // Set the loading state to true before fetching data
            const header = {'x-token': cookie.token}
            const res = await axios.get("http://localhost:5000/users/me", {headers: header});
            console.log(res.data);
            setIsLanding(false);
            setUserType(res.data.userType);
          } catch (error) {
            console.error(error.message);
            setIsLanding(true);
            setUserType(undefined);
          } finally {
            setIsLoading(false); // Set the loading state to false after fetching data
          }
        };
        // Call the function
        fetchUser();
      }, [cookie.token, setUserType]); // Include the cookie value in the dependency array
    
  return (
    <div className={classes.home}>
      {isLoading ? (
        <div className={classes.loader}>
          <BounceLoader color={"#E91E63"} size={150} />
        </div>
      ) : (
        isLanding ? (
          <Landing />
        ) : (
          <TransTable />
        )
      )}
    </div>
  );
};

export default Home;
