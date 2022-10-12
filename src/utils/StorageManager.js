class StorageManager {
  static #initializeCart() {
    let cart = {
      count: 0,
      items: [],
    };
    this.#setStorageItem(cart);
  }
  static getItems() {
    if (!localStorage.getItem("cart")) this.#initializeCart();
    let cart = JSON.parse(localStorage.getItem("cart"));
    return cart.items;
  }

  static getItemById(id) {
    if (!localStorage.getItem("cart")) return undefined;
    let cart = JSON.parse(localStorage.getItem("cart"));
    return cart.items.find((itm) => itm.id === id);
  }

  static addItem(item) {
    if (!localStorage.getItem("cart")) this.#initializeCart();
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.items.push(item);
    cart.count = cart.count + 1;
    this.#setStorageItem(cart);
  }

  static removeItem(id) {
    if (!localStorage.getItem("cart")) this.#initializeCart();
    let cart = JSON.parse(localStorage.getItem("cart"));
    let items = cart.items;
    if (items.length === 0) return;

    items = items.filter((itm) => itm.id !== id);
    cart.items = items;
    cart.count = cart.count - 1;
    this.#setStorageItem(cart);
  }

  static clearItems() {
    if (!localStorage.getItem("cart")) this.#initializeCart();
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.items = [];
    cart.count = 0;
    this.#setStorageItem(cart);
  }

  static getCount() {
    if (!localStorage.getItem("cart")) this.#initializeCart();
    let cart = JSON.parse(localStorage.getItem("cart"));
    return cart.count;
  }

  static editQuantity(id, quantity) {
    if (!localStorage.getItem("cart")) this.#initializeCart();
    let cart = JSON.parse(localStorage.getItem("cart"));
    let items = cart.items;
    items[this.getIndexById(id)].quantity = quantity;
    this.#setStorageItem(cart);
  }

  static getIndexById(id) {
    let items = this.getItems();
    for (let i = 0; i < items.length; i++) if (items[i].id === id) return i;
    return -1;
  }

  static #setStorageItem(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static calculateTotal() {
    if (!localStorage.getItem("cart")) this.#initializeCart();
    let cart = JSON.parse(localStorage.getItem("cart"));
    let items = cart.items;
    let total = 0;
    for (let item of items) total += item.price * item.quantity;
    cart.total = total;
    this.#setStorageItem(cart);
  }

  static getTotal() {
    if (!localStorage.getItem("cart")) this.#initializeCart();
    let cart = JSON.parse(localStorage.getItem("cart"));
    return cart.total;
  } 

  static getToken() {
    return localStorage.getItem("token");
  }

  static setToken(token) {
    return localStorage.setItem("token", token);
  }

  static setUser(user)
  {    
    localStorage.setItem("user", JSON.stringify(user));
  }

  static removeToken()
  {
    localStorage.removeItem("token");
  }
  
  static removeUser()
  {
    localStorage.removeItem("user");
  }

  static getUser()
  {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default StorageManager;
