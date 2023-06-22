import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Select,
} from "@material-ui/core";
import "./Customer.css";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function Customer() {
  const { id } = useParams();
  const [id2, setId2] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState("");
  const [user, setUser] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getData(id);
    axios.get("http://localhost:5000/customers").then((res) => {
      setUser(res.data);
    });
  }, [id]);

  console.log(data);

  const getData = async (id) => {
    console.log(id);
    const response = await axios.get(`http://localhost:5000/customers/${id}`);
    if (response) {
      setData(response.data);
    }
  };

  async function sendMoney() {
    console.log(transferData);

    await axios.put("http://localhost:5000/customer/money", transferData);
    await axios.post("http://localhost:5000/transactions", transferData);
    history.push("http://localhost:5000/customers");
  }

  const count = Number(amount);

  const transferData = {
    count,
    id,
    id2,
  };

  return (
    <div className="app">
      <div className="details">
        <div className="big-img">
          <img
            src="../assets/images/sampleProfile.png"
            style={{ width: "70%" }}
            alt={data.DOB}
          />
        </div>
        <div className="box">
          <div className="row">
            <h4>
              {data.name}
              <h6>br{data.amount}</h6>
            </h4>
            <span>
              {data.accountType}
              <i></i> {data.gender}
            </span>
          </div>
          <div className="row">
            <FormControl>
              <InputLabel id="countrySelectLabel">Transfer to</InputLabel>
              <Select
                labelId="countrySelectLabel"
                id="countrySelect"
                onChange={(e) => setId2(e.target.value)}
                value={id2}
              >
                {user.map((code, index) =>
                  data.name !== code.name ? (
                    <MenuItem key={index} value={code._id}>
                      {code.name}
                    </MenuItem>
                  ) : null
                )}
              </Select>
            </FormControl>
            <TextField
              label="Transfer Amount"
              id="standard-start-adornment"
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              error={amount > data.amount}
              helperText={
                amount > data.amount
                  ? "The amount is greater than your balance"
                  : " "
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">br</InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={amount > data.amount}
              onClick={sendMoney}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
