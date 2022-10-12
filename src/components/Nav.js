import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

function Nav() {
  let navItems = [
    {
      title: "Home",
      to: "/",
    },
    {
      title: "Categories",
      to: "/categories",
    },
    {
      title: "Contact",
      to: "/contact",
    },
    {
      title: "About",
      to: "/about",
    },
  ];

  return (
    <Stack className="Nav" spacing={"var(--medium-sp)"} direction="row">
      {navItems.map((ni, i) => (
        <li key={i.toString()} className="nav-item">
          <Button component={Link} variant={i === 0 && "contained"} to={ni.to}>
            {ni.title}
          </Button>
        </li>
      ))}
    </Stack>
  );
}

export default Nav;
