import { Stack } from "@mui/system";
import "../styles/Footer.css";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="Footer">
      <Stack direction="row" alignItems="center" spacing="var(--huge-sp)">
        <Logo /> <label>All Rights Reserved ©</label>
      </Stack>
    </footer>
  );
}

export default Footer;
