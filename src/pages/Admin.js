import { Stack } from "@mui/system";
import "../styles/Admin.css";

function Admin() {
  return (
    <div className="Admin">
      <Stack spacing="var(--huge-sp)">
        <h1>Statistics</h1>
        <div className="admin-stats">
          <div className="admin-stat">
            4k <p>Users</p>
          </div>
          <div className="admin-stat">10 <p>Categories</p></div>
          <div className="admin-stat">30 <p>Admins</p></div>
          <div className="admin-stat">5k <p>Products</p></div>
          <div className="admin-stat">10 <p>Categories</p></div>
          <div className="admin-stat">30 <p>Admins</p></div>
          <div className="admin-stat">5k <p>Products</p></div>
          <div className="admin-stat">10 <p>Categories</p></div>
          <div className="admin-stat">30 <p>Admins</p></div>
          <div className="admin-stat">5k <p>Products</p></div>
        </div>
      </Stack>
    </div>
  );
}

export default Admin;
