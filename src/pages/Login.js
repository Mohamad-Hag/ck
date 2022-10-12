import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../styles/Login.css";
import Logo from "../components/Logo";
import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useRef, useState } from "react";
import HOST from "../utils/Host";
import Axios from "axios";
import { ToastWrapper, Toast } from "show-toast-box";
import StorageManager from "../utils/StorageManager";

function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "/";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const wrapper = useRef();

  const submit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") return;

    setIsLoading(true);
    let api = `${HOST}users`;
    let res = await Axios.get(api);
    let data = res.data[0];
    let isExist = data.find(
      (d) => d.name === username && d.password === password
    );
    if (isExist) {
      StorageManager.setToken("DW2DWddW");
      StorageManager.setUser(isExist);
      if (isExist.isAdmin) navigate("/admin");
      else navigate(redirect);
      wrapper.current.add(
        <Toast
          autoRemove
          theme="colorful"
          type="success"
          title="Login Success!"
          description="Thanks for being here."
        />
      );
    } else {
      wrapper.current.add(
        <Toast
          theme="colorful"
          type="error"
          title="Login Failed!"
          description="Your username or password is incorrect."
        />
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="Login">
      <div className="login-form">
        <div className="login-intro">
          <div className="login-intro-overlay" />
          <div className="login-intro-welcome">
            <Logo />
            <h1>Welcome!</h1>
            <p>Nice to see you again, login to continue your experience</p>
          </div>
        </div>
        <form onSubmit={submit} className="form-inner">
          <Stack spacing="var(--large-sp)">
            <Stack spacing="var(--small-sp)">
              <TextField
                error={username === ""}
                helperText={username === "" && "Username can't be empty"}
                id="standard-basic"
                fullWidth
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                id="standard-basic"
                error={password === ""}
                helperText={password === "" && "Password can't be empty"}
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>
            <Stack spacing="var(--small-sp)">
              <Button type="submit" variant="contained" disabled={isLoading}>
                {!isLoading ? "Submit" : "Loading..."}
              </Button>
              <p style={{ fontSize: "var(--b2)" }}>
                Don't have an account,{" "}
                <Link
                  style={{ fontSize: "var(--b2)", textDecoration: "underline" }}
                  to="/register"
                >
                  Register
                </Link>
              </p>
            </Stack>
          </Stack>
        </form>
      </div>
      <ToastWrapper ref={wrapper} />
    </div>
  );
}

export default Login;
