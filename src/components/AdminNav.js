import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

function AdminNav() {
  let navItems = [
    {
      title: "Home",
      to: "/admin",
    },
    {
      title: "Categories",
      to: "/admin/categories",
    },
    {
      title: "Products",
      to: "/admin/products",
    },
    {
      title: "Users",
      to: "/admin/users",
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

export default AdminNav;
