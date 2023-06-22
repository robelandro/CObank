import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const multiStepContext = createContext();

export default function StepContext(props) {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [transferData, setTransferData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [userType, setUserType] = useState(null);

  async function submitData() {
    setFinalData((finalData) => [...finalData, userData]);
    console.log(userData);
    try {
      const result = await axios.post("http://localhost:5000/createClient", userData);
      console.log(result.data.id);
      setUserData("");
      setCurrentStep(1);
      setErrorMessage(false);
      history.push({pathname: "/addtional", state: {id: result.data.id}});
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        setErrorMessage(err.response.data.error);
      } else {
        console.log(err.message);
        setErrorMessage(err.message);
      }
    }
  }

  async function sendMoney() {
    await axios.post("http://localhost:5000/customer/money", transferData);
    history.push("/customers");
  }

  return (
    <multiStepContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        userData,
        setUserData,
        finalData,
        setFinalData,
        submitData,
        transferData,
        setTransferData,
        sendMoney,
        errorMessage,
        setErrorMessage,
        userType,
        setUserType,
      }}
    >
      {props.children}
    </multiStepContext.Provider>
  );
}
