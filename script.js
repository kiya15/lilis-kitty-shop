// 💗 LILI'S KITTY SHOP 💗
// Interactive Kitty Cash Shopping Cart
// + Email Order Notifications

const FORMSPREE_ENDPOINT =
  "https://formspree.io/f/mnpndbdv";


// =========================
// 🛍️ SHOP STOCK
// =========================

const products = [

  {
    name: "Sweet Treat Pack Sticker Book",
    level: "Level 1 💗",
    price: 5,
    emoji: "🍭"
  },

  {
    name: "Labubu Taba-Licious Snarkie",
    level: "Level 2 💚",
    price: 15,
    emoji: "💚"
  },

  {
    name: "Gabby's Dollhouse Cat Ears",
    level: "Level 2 💚",
    price: 20,
    emoji: "🐱"
  },

  {
    name: "Kinetic Sand Kit",
    level: "Special Edition 💙",
    originalPrice: 100,
    price: 90,
    emoji: "✨",
    specialEdition: true
  },

  {
    name: "Hello Kitty Booster Pack",
    level: "Booster Pack 🎀",
    price: 2.50,
    emoji: "🎀",
    stock: 32,
    maxPerVisit: 3
  }

];


// =========================
// 🛒 CART
// =========================

let cart = [];

const productList =
  document.getElementById("productList");

const cartButton =
  document.getElementById("cartButton");

const cartPanel =
  document.getElementById("cartPanel");

const closeCart =
  document.getElementById("closeCart");

const cartItems =
  document.getElementById("cartItems");

const cartCount =
  document.getElementById("cartCount");

const cartTotal =
  document.getElementById("cartTotal");

const checkoutButton =
  document.getElementById("checkoutButton");


// =========================
// 🔢 COUNT ITEM IN CART
// =========================

function getAmountInCart(productName) {

  return cart.filter(
    item => item.name === productName
  ).length;

}


// =========================
// 💕 SHOW PRODUCTS
// =========================

function displayProducts() {

  productList.innerHTML = "";

  products.forEach((product, index) => {

    const card =
      document.createElement("div");

    card.className = "product-card";

    let stockMessage = "";

    if (product.stock !== undefined) {

      const amountInCart =
        getAmountInCart(product.name);

      const remaining =
        product.stock - amountInCart;

      stockMessage = `

        <p class="product-level">
          🎀 ${remaining} packs in stock
        </p>

        <p class="product-level">
          Maximum ${product.maxPerVisit}
          per shop visit
        </p>

      `;

    }


    let priceDisplay = `

      <p class="product-price">
        $${product.price.toFixed(2)}
        Kitty Cash
      </p>

    `;


    if (product.specialEdition) {

      priceDisplay = `

        <p class="product-level">

          <span style="
            text-decoration: line-through;
            opacity: 0.65;
          ">
            Was $${product.originalPrice.toFixed(2)}
          </span>

        </p>

        <p class="product-price">
          💙 Now $${product.price.toFixed(2)}
          Kitty Cash
        </p>

        <p class="product-level">
          ✨ Special Edition price drop!
        </p>

      `;

    }


    card.innerHTML = `

      <div style="font-size:55px;">
        ${product.emoji}
      </div>

      <h3>
        ${product.name}
      </h3>

      <p class="product-level">
        ${product.level}
      </p>

      ${priceDisplay}

      ${stockMessage}

      <button
        class="add-cart"
        data-index="${index}"
      >
        Add to Cart 🛒
      </button>

    `;

    productList.appendChild(card);

  });

}


// =========================
// 🛍️ ADD TO CART
// =========================

productList.addEventListener(
  "click",
  function(event) {

    if (
      !event.target.classList.contains(
        "add-cart"
      )
    ) {
      return;
    }

    const index =
      Number(event.target.dataset.index);

    const product =
      products[index];

    const amountInCart =
      getAmountInCart(product.name);


    if (
      product.maxPerVisit !== undefined &&
      amountInCart >= product.maxPerVisit
    ) {

      alert(
        "🎀 You can only buy " +
        product.maxPerVisit +
        " Hello Kitty Booster Packs " +
        "per shop visit! 💗"
      );

      return;

    }


    if (
      product.stock !== undefined &&
      amountInCart >= product.stock
    ) {

      alert(
        "🐾 Sorry! This item is out of stock."
      );

      return;

    }


    cart.push(product);

    updateCart();
    displayProducts();

  }
);


// =========================
// 🧾 UPDATE CART
// =========================

function updateCart() {

  cartCount.textContent =
    cart.length;


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <p class="empty-cart">
        Your cart is empty! 🐾
      </p>

    `;

    cartTotal.textContent =
      "$0.00 Kitty Cash";

    return;

  }


  cartItems.innerHTML = "";

  let total = 0;


  cart.forEach((item, index) => {

    total += item.price;

    const cartItem =
      document.createElement("div");

    cartItem.className =
      "cart-item";


    cartItem.innerHTML = `

      <div>

        <strong>
          ${item.emoji}
          ${item.name}
        </strong>

        <br>

        $${item.price.toFixed(2)}

      </div>

      <button
        class="remove-item"
        data-index="${index}"
      >
        Remove
      </button>

    `;


    cartItems.appendChild(cartItem);

  });


  cartTotal.textContent =
    "$" +
    total.toFixed(2) +
    " Kitty Cash";

}


// =========================
// ❌ REMOVE FROM CART
// =========================

cartItems.addEventListener(
  "click",
  function(event) {

    if (
      !event.target.classList.contains(
        "remove-item"
      )
    ) {
      return;
    }

    const index =
      Number(event.target.dataset.index);

    cart.splice(index, 1);

    updateCart();
    displayProducts();

  }
);


// =========================
// 🛒 OPEN CART
// =========================

cartButton.addEventListener(
  "click",
  function() {

    cartPanel.classList.add(
      "open"
    );

  }
);


// =========================
// ✖️ CLOSE CART
// =========================

closeCart.addEventListener(
  "click",
  function() {

    cartPanel.classList.remove(
      "open"
    );

  }
);


// =========================
// 💌 PLACE KITTY ORDER
// =========================

checkoutButton.addEventListener(
  "click",
  async function() {

    if (cart.length === 0) {

      alert(
        "Your Kitty Cart is empty! 🐱💕"
      );

      return;

    }


    const total =
      cart.reduce(
        (sum, item) =>
          sum + item.price,
        0
      );


    // GROUP ITEMS TOGETHER

    const groupedItems = {};

    cart.forEach(item => {

      if (!groupedItems[item.name]) {

        groupedItems[item.name] = {
          quantity: 0,
          price: item.price
        };

      }

      groupedItems[item.name].quantity++;

    });


    // MAKE EMAIL ORDER LIST

    let orderDetails = "";

    Object.entries(groupedItems).forEach(
      ([name, details]) => {

        const itemTotal =
          details.quantity *
          details.price;

        orderDetails +=
          name +
          " x " +
          details.quantity +
          " — $" +
          itemTotal.toFixed(2) +
          " Kitty Cash\n";

      }
    );


    const orderData = {

      _subject:
        "🐱 NEW LILI KITTY SHOP ORDER!",

      customer:
        "LILI",

      order:
        orderDetails,

      total:
        "$" +
        total.toFixed(2) +
        " Kitty Cash",

      message:
        "A new LILI Kitty Shop order has been placed! 💗"

    };


    // SHOW SENDING MESSAGE

    const originalButtonText =
      checkoutButton.textContent;

    checkoutButton.textContent =
      "Sending Order... 💌";

    checkoutButton.disabled = true;


    try {

      const response =
        await fetch(
          FORMSPREE_ENDPOINT,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              "Accept":
                "application/json"
            },

            body:
              JSON.stringify(orderData)
          }
        );


      if (!response.ok) {

        throw new Error(
          "Order could not be sent."
        );

      }


      // SUCCESS 💗

      alert(

        "🎀 ORDER PLACED! 🎀\n\n" +

        "Your Kitty Shop order has been sent! 💌\n\n" +

        "Total: $" +

        total.toFixed(2) +

        " Kitty Cash\n\n" +

        "Bring your Kitty Cash to the shop " +

        "to collect your goodies! 🛍️🐱💗"

      );


      // EMPTY CART AFTER ORDER

      cart = [];

      updateCart();
      displayProducts();

      cartPanel.classList.remove(
        "open"
      );

    }


    catch (error) {

      alert(

        "🐾 Oops! Your order didn't send.\n\n" +

        "Please don't pay your Kitty Cash yet. " +

        "Try placing the order again! 💗"

      );

    }


    finally {

      checkoutButton.textContent =
        originalButtonText;

      checkoutButton.disabled = false;

    }

  }
);


// =========================
// 🐱 START LILI'S SHOP
// =========================

displayProducts();
updateCart();
