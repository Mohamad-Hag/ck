import { Stack } from "@mui/system";
import "../styles/NoData.css";
import PermScanWifiIcon from "@mui/icons-material/PermScanWifi";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function NoData({ title, icon, children, link1, link2 }) {
  return (
    <Stack className="NoData" alignItems="center" spacing="var(--large-sp)">
      {icon ? icon : <PermScanWifiIcon fontSize="large" />}
      <Stack className="nodata-info" spacing="var(--tiny-sp)">
        <h1>{title}</h1>
        {children[0] && <label>{children}</label>}
      </Stack>
      <Stack direction="row" alignItems="center" spacing="var(--tiny-sp)">
        {link1 && (
          <Button
            component={Link}
            to={link1.to}
            variant="contained"
            endIcon={link1.icon}
          >
            {link1.title}
          </Button>
        )}
        {link1 && link2 && (
          <Button
            component={Link}
            to={link2.to}
            variant="outlined"
            endIcon={link2.icon}
          >
            {link2.title}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

export default NoData;
