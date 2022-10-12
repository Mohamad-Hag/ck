import { Button, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import LaunchIcon from "@mui/icons-material/Launch";
import CheckIcon from "@mui/icons-material/Check";
import "../styles/CategoryCard.css";
import { Link } from "react-router-dom";

function CategoryCard({ id, img, title, productsCount, children }) {
  return (
    <Button className="CategoryCard" component={Link} to={`/categories/${id}`}>
      <Stack spacing="var(--big-sp)" direction="row">
        <div
          className="categorycard-img"
          style={{
            backgroundImage: `url('${img}')`,
          }}
        ></div>
        <Stack className="categorycard-info" spacing={0}>
          <h3>{title}</h3>
          <p>{children}</p>
        </Stack>
        <Stack
          className="categorycard-controls"
          spacing="var(--tiny-sp)"
          alignItems="center"
        >
          <Button
            component={Link}
            to={`/categories/${id}`}
            variant="contained"
            endIcon={<LaunchIcon style={{ fill: "white" }} />}
          >
            View Products
          </Button>
          <label>
            Products Available: {productsCount} <CheckIcon />
          </label>
        </Stack>
      </Stack>
    </Button>
  );
}

export default CategoryCard;
