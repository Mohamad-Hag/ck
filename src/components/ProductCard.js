import { Button, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import "../styles/ProductCard.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import LaunchIcon from "@mui/icons-material/Launch";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../redux/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StorageManager from "../utils/StorageManager";

function ProductCard({ id, img, title, children, price = 0 }) {
  const [addedToCart, setAddedToCart] = useState(
    StorageManager.getItemById(id) ? true : false
  );
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  let atc = addedToCart || StorageManager.getItemById(id);

  const addRemoveToCart = (e) => {
    setAddedToCart(!addedToCart);

    if (!addedToCart === false) {
      dispatch(removeItem(id));
    } else {
      let item = {
        id: id,
        title: title,
        description: children,
        price: price,
        img: img,
        quantity: quantity,
      };
      dispatch(addItem(item));
      setQuantity(1);
    }
  };

  const increaseQuantity = (e) => {
    if (quantity === 100 || atc) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = (e) => {
    if (quantity === 1 || atc) return;
    setQuantity(quantity - 1);
  };

  return (
    <Stack className="ProductCard" spacing="var(--large-sp)">
      <div
        className="productcard-img"
        style={{
          backgroundImage: `url("${img}")`,
        }}
      />
      <Stack className="productcard-info">
        <h3>{title}</h3>
        <p>{children}</p>
        <label style={{ color: "green" }}>Price: ${price}</label>
      </Stack>
      <Stack
        spacing="var(--tiny-sp)"
        direction="row"
        justifyContent="center"
        gap="var(--huge-sp)"
        alignItems="center"
      >
        <IconButton
          aria-label="increase quantity"
          onClick={increaseQuantity}
          disabled={atc}
        >
          <AddIcon />
        </IconButton>
        <label style={{ fontSize: "var(--h3)" }}>{quantity}</label>
        <IconButton
          aria-label="decrease quantity"
          onClick={decreaseQuantity}
          disabled={atc}
        >
          <RemoveIcon />
        </IconButton>
      </Stack>
      <Stack spacing="var(--tiny-sp)">
        <Button
          onClick={addRemoveToCart}
          variant={atc ? "outlined" : "contained"}
          endIcon={
            !atc ? (
              <AddShoppingCartIcon style={{ fill: "white" }} />
            ) : (
              <RemoveShoppingCartIcon style={{ fill: "var(--accent-main)" }} />
            )
          }
        >
          {!atc ? "Add" : "Remove"} to Card
        </Button>
        <Button endIcon={<LaunchIcon style={{ fill: "var(--accent-main)" }} />}>
          View Details
        </Button>
      </Stack>
    </Stack>
  );
}

export default ProductCard;
