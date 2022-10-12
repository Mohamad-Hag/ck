import { Button, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import "../styles/CartItem.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeItem, editQuantity } from "../redux/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";

function CartItem({ id, title, quantity, price, img }) {
  const [qt, setQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const increaseQuantity = (e) => {
    if (qt === 100) return;
    setQuantity(qt + 1);
    dispatch(editQuantity({ id: id, quantity: qt + 1 }));
  };

  const decreaseQuantity = (e) => {
    if (qt === 1) return;
    setQuantity(qt - 1);
    dispatch(editQuantity({ id: id, quantity: qt - 1 }));
  };

  const removeItm = (e) => {
    dispatch(removeItem(id));
  };

  return (
    <Stack className="CartItem" direction="row" justifyContent="space-between">
      <Stack direction="row" spacing="var(--big-sp)">
        <div
          className="cartitem-img"
          style={{
            backgroundImage: `url('${img}')`,
          }}
        ></div>
        <Stack spacing={0} className="cartitem-info">
          <h3>{title}</h3>
          <label style={{fontSize: "var(--b2)"}}>One Unit: ${price}</label>
          <label style={{ color: "green" }}> Total: ${price * qt}</label>
        </Stack>
      </Stack>
      <Stack spacing="var(--small-sp)" alignItems="flex-end">
        <Button color="error" style={{ width: 200 }} onClick={removeItm}>
          Delete
        </Button>
        <Stack
          spacing="var(--tiny-sp)"
          direction="row"
          justifyContent="center"
          gap="var(--huge-sp)"
          alignItems="center"
        >
          <IconButton aria-label="increase quantity" onClick={increaseQuantity}>
            <AddIcon />
          </IconButton>
          <label style={{ fontSize: "var(--h3)" }}>{qt}</label>
          <IconButton aria-label="decrease quantity" onClick={decreaseQuantity}>
            <RemoveIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default CartItem;
