import "../styles/Register.css";
import "../styles/Login.css";
import Logo from "../components/Logo";
import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

function Register() {

  const submit = (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="Login">
      <form className="login-form" onSubmit={submit}>
        <div className="login-intro">
          <div className="login-intro-overlay" />
          <div className="login-intro-welcome">
            <Logo />
            <h1>Hi!</h1>
            <p>Nice to meet you, register to start your journey</p>
          </div>
        </div>
        <div className="form-inner">
          <Stack spacing="var(--large-sp)">
            <Stack spacing="var(--small-sp)">
              <TextField
                id="standard-basic"
                fullWidth
                label="Username"
                type="text"
              />
              <TextField
                id="standard-basic"
                fullWidth
                label="Email"
                type="email"
              />
              <TextField
                id="standard-basic"
                fullWidth
                label="Password"
                type="password"
              />
            </Stack>
            <Stack spacing="var(--small-sp)">
              <Button type="submit" variant="contained">Submit</Button>
              <p style={{ fontSize: "var(--b2)" }}>
                Already have an account,{" "}
                <Link
                  style={{
                    fontSize: "var(--b2)",
                    textDecoration: "underline",
                  }}
                  to="/login"
                >
                  Login
                </Link>
              </p>
            </Stack>
          </Stack>
        </div>
      </form>
    </div>
  );
}

export default Register;
