import { Stack } from "@mui/system";
import CartItem from "../components/CartItem";
import "../styles/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import LaunchIcon from "@mui/icons-material/Launch";
import NoData from "../components/NoData";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { clearItems } from "../redux/cartSlice";
import { useRef, useState } from "react";
import StorageManager from "../utils/StorageManager";
import { Toast, ToastWrapper } from "show-toast-box";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const navigate = useNavigate();
  const location = useLocation();
  const [alertTitle, setAlertTitle] = useState("Clear Shopping Cart");
  const [mode, setMode] = useState("clear");
  const [alertContent, setAlertContent] = useState(
    "Are you sure you want to clear your shopping cart? You may lose the order."
  );
  const shippingPrice = 20;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const wrapper = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearCart = (e) => {
    dispatch(clearItems());
    handleClose();
  };

  const proceed = () => {
    if (!StorageManager.getToken()) {
      navigate(`/login?redirect=${location.pathname}`);
    } else {
      clearCart();
      wrapper.current.add(
        <Toast theme="colorful" loaderText="Sending your cart, please don't leave this page..." type="success" loading={true} />
      );
      setTimeout(() => {
        wrapper.current.removeAll();
        wrapper.current.add(
          <Toast
            theme="colorful"
            type="success"
            title="Success!"
            description="Your shopping cart is submitted successfully, please keep close to your notifications to be notified when your order is ready!"
          />
        );
      }, 2000);
      handleClose();
    }
  };

  return (
    <div className="Cart">
      <Stack spacing="var(--huge-sp)">
        {items.length !== 0 && <h1>Shopping Cart ({items.length})</h1>}
        <Stack className="cart-list" spacing="var(--tiny-sp)">
          {items.length === 0 ? (
            <NoData
              link1={{
                title: "Fill My Cart",
                to: "/categories",
                icon: <LaunchIcon style={{ fill: "var(--bg)" }} />,
              }}
              title="Empty Shopping Cart!"
              icon={<ProductionQuantityLimitsIcon fontSize="large" />}
            >
              Look like you didn't add anything to your cart, click on 'Fill My
              Cart' button below to add new items.
            </NoData>
          ) : (
            items.map((itm) => (
              <CartItem
                key={itm.id}
                id={itm.id}
                quantity={itm.quantity}
                price={itm.price}
                title={itm.title}
                img={itm.img}
              >
                {itm.description}
              </CartItem>
            ))
          )}
        </Stack>
        {items.length !== 0 && (
          <>
            <Stack spacing="var(--tiny-sp)">
              <p>Order: ${total}</p>
              <p>Shipping: ${shippingPrice}</p>
              <Divider />
              <h3 className="cart-total">
                Total Price = <span>${total + shippingPrice}</span>
              </h3>
            </Stack>

            <Stack
              alignItems="center"
              justifyContent="space-between"
              direction="row"
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setAlertTitle("Clear Shopping Cart");
                  setMode("clear");
                  setAlertContent(
                    "Are you sure you want to clear your shopping cart? You may lose the order."
                  );
                  handleClickOpen();
                }}
              >
                Clear Cart
              </Button>
              <Stack
                spacing="var(--tiny-sp)"
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Button component={Link} to="/categories" variant="outlined">
                  Continue Shopping
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleClickOpen();
                    setMode("proceed");
                    setAlertTitle("Proceed to Checkout");
                    setAlertContent(
                      <div>
                        <p>Are you sure you want to submit your order?</p>
                        <p>
                          Total Price ={" "}
                          <span style={{ color: "green" }}>
                            ${total + shippingPrice}
                          </span>
                        </p>
                      </div>
                    );
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{alertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (mode === "clear") clearCart();
              else proceed();
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <ToastWrapper ref={wrapper} />
    </div>
  );
}

export default Cart;
