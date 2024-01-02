import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { API_BASE } from '../App';
import { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function login_reducer(state, action) {
  switch (action.type) {
    case "email":
      return {
        ...state,
        email: action.payload
      }
    case "password":
      return {
        ...state,
        password: action.payload
      }
    default:
      return state
  }
  return state
}

async function getSHA256Hash(input) {
  const textAsBuffer = new TextEncoder().encode(input);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray
    .map((item) => item.toString(16).padStart(2, "0"))
    .join("");
  return hash;
};

function Login({ loadingScreen }) {
  const navigate = useNavigate()
  const initialUserData = {
    email: "",
    password: ""
  }
  const [userState, dispatchUser] = useReducer(login_reducer, initialUserData)
  const [err, setErr] = useState(false)
  const [displayLoader, setDisplayLoader] = useState(false)

  useEffect(() => {
    var data = JSON.parse(localStorage.getItem("data"))
    if (data && data.email) {
      loadingScreen(true)
      navigate("/home")
      // // console.log(data);
    }
  }, [])

  async function handleClick() {
    const password_hash = await getSHA256Hash(userState.password);
    setErr(false)
    setDisplayLoader(true)
    axios.post(`${API_BASE}/auth`, userState)
      .then((response) => {
        response = response.data
        if (response) {
          // console.log(response);
          localStorage.setItem("data", JSON.stringify(response));
          loadingScreen(true)
          // setLoginData(response)
          navigate("/home")
        }
        else {
          setErr(true)
        }
        setDisplayLoader(false)
      })
      .catch((err) => {
        // console.log(err);
      })
  }

  return (
    <div style={{ padding: "1em 1em 3em 1em", display: "flex", flexDirection: "column" }}>
      <Header text={'Login'} />
      <InputField
        title={"Email"}
        placeholder={"enter your email"}
        type={"email"}
        state={userState.email}
        setState={(val) => dispatchUser({ type: "email", payload: val })}
      />
      <InputField
        title={"Password"}
        placeholder={"something secret"}
        type={"password"}
        state={userState.password}
        setState={(val) => dispatchUser({ type: "password", payload: val })}
      />
      {
        err
          ? <p style={{ color: "red", fontSize: "var(--font-size-sm)" }}>email or password incorrect</p>
          : <></>
      }
      <Button text={"Login"} type={"light"} size={"big"} onClick={handleClick} />
      {
        displayLoader
          ? <p>authing login details</p>
          : <></>
      }
    </div>
  )
}

export default Login
