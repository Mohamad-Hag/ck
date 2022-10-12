import { Badge, Button, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Nav from "./Nav";
import "../styles/Header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import StorageManager from "../utils/StorageManager";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import AdminNav from "./AdminNav";

function Header() {
  const count = useSelector((state) => state.cart.count);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const logout = () => {
    StorageManager.removeUser();
    StorageManager.removeToken();
    navigate("/");
  };

  return (
    <div className="Header">
      <Stack justifyContent="space-between" direction="row">
        <Stack direction="row" spacing={"var(--huge-sp)"} alignItems="center">
          <Link to="/">
            <Logo />
          </Link>
          {path !== "admin" ? <Nav /> : <AdminNav />}
        </Stack>
        <Stack spacing="var(--medium-sp)" direction="row">
          {path !== "admin" && (
            <IconButton aria-label="delete" component={Link} to="/cart">
              <Badge badgeContent={count} color="error">
                <ShoppingCartIcon style={{ fill: "var(--txt)" }} />
              </Badge>
            </IconButton>
          )}
          {StorageManager.getToken() === null ? (
            <Stack spacing="var(--tiny-sp)" direction="row">
              <Button variant="outlined" component={Link} to="/register">
                Register
              </Button>
              <Button variant="contained" component={Link} to="/login">
                Login
              </Button>
            </Stack>
          ) : (
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <Button {...bindTrigger(popupState)}>My Account</Button>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <Stack
                      sx={{ p: 2 }}
                      style={{ width: "400px" }}
                      spacing="var(--tiny-sp)"
                    >
                      <h3>
                        {StorageManager.getUser().name}{" "}
                        {StorageManager.getUser().isAdmin && "(Admin)"}
                      </h3>
                      <p>{StorageManager.getUser().email}</p>
                      <Button variant="contained" fullWidth>
                        Settings
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </Stack>
                  </Popover>
                </div>
              )}
            </PopupState>
          )}
        </Stack>
      </Stack>
    </div>
  );
}

export default Header;
