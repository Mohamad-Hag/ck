import { useTheme } from "@emotion/react";
import { createMuiTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { Route, Router, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Divider from "./components/Divider";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Protector from "./components/Protector";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Register from "./pages/Register";
import StorageManager from "./utils/StorageManager";
import CreateCategory from "./pages/CreateCategory";
import EditCategory from "./pages/EditCategory";
import AdminCategories from "./pages/AdminCategories";
import Admin from "./pages/Admin";

function App() {
  const theme = createMuiTheme();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const displayHeader = path !== "login" && path !== "register";
  const isToken = StorageManager.getToken() ? true : false;
  const isAdmin = isToken && StorageManager.getUser().isAdmin;

  return (
    <ThemeProvider theme={theme}>
      <Divider>
        {displayHeader && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/login"
            element={
              <Protector protect={isToken}>
                <Login />
              </Protector>
            }
          />
          <Route
            path="/register"
            element={
              <Protector protect={isToken}>
                <Register />
              </Protector>
            }
          />
          <Route path="/categories">
            <Route index element={<Categories />}></Route>
            <Route path=":id" element={<Products />}></Route>
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin">
            <Route
              index
              element={
                <Protector protect={!isAdmin}>
                  <Admin />
                </Protector>
              }
            />
            <Route
              path="categories"
              element={
                <Protector protect={!isAdmin}>
                  <AdminCategories />
                </Protector>
              }
            />
            <Route
              path="categories/create"
              element={
                <Protector protect={!isAdmin}>
                  <CreateCategory />
                </Protector>
              }
            />
            <Route
              path="categories/:id/edit"
              element={
                <Protector protect={!isAdmin}>
                  <EditCategory />
                </Protector>
              }
            />
          </Route>
        </Routes>
      </Divider>
      {/* <Footer /> */}
    </ThemeProvider>
  );
}

export default App;
