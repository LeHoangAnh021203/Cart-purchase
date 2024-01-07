let cartData = {
  cardDetails: {
    bankName: "Vietcombank",
    number: "1234:5678:1234:5678",
    nameOnCard: "Le Hoang Anh",
    expiredDate: "12/20",
  },
  cartItems: [
    {
      image: "assets/images/beef_with_potato.png",
      itemName: "Beef with potato",
      quantity: 1,
      price: "150",
    },
    {
      image: "assets/images/healthy_food.png",
      itemName: "Healthy food",
      quantity: 1,
      price: "40",
    },
    {
      image: "assets/images/salad_chicken.png",
      itemName: "Salad chicken",
      quantity: 1,
      price: "170",
    },
    {
      image: "assets/images/beef_with_potato.png",
      itemName: "Beef with potato",
      quantity: 1,
      price: "150",
    },
    {
      image: "assets/images/healthy_food.png",
      itemName: "Healthy food",
      quantity: 1,
      price: "40",
    },
    {
      image: "assets/images/salad_chicken.png",
      itemName: "Salad chicken",
      quantity: 1,
      price: "170",
    },
  ],
};

let validator = {
  set: function (target, key, value) {
    handleGetCartData(); // Update the cart display
    return true;
  },
};
let dataStorage = new Proxy(cartData, validator);

function quantityElement(quantityNumber, itemIndex) {
  const quantityControlWrapper = document.createElement("div");
  const minusBtn = document.createElement("button");
  const plusBtn = document.createElement("button");
  const quantity = document.createElement("span");

  quantityControlWrapper.classList.add("quantity-control-wrapper");
  minusBtn.classList.add("minus-button");
  plusBtn.classList.add("plus-button");
  quantity.classList.add("quantity");

  quantity.textContent = quantityNumber;
  minusBtn.innerHTML = "-";
  plusBtn.innerHTML = "+";
  const handleUpdateItem = (isPlus = false) => {
    let price = +cartData.cartItems[itemIndex].price;
    const pricePerItem = price / quantityNumber;

    if (isPlus) quantityNumber++;
    else quantityNumber--;

    quantity.textContent = quantityNumber;
    price = pricePerItem * quantityNumber;
    cartData.cartItems[itemIndex].quantity = quantityNumber;
    cartData.cartItems[itemIndex].price = price.toString();
    dataStorage.cardItems = cartData.cartItems;
  };

  minusBtn.addEventListener("click", function () {
    if (quantityNumber > 1) handleUpdateItem();
  });

  plusBtn.addEventListener("click", function () {
    handleUpdateItem(true);
  });

  quantityControlWrapper.appendChild(minusBtn);
  quantityControlWrapper.appendChild(quantity);
  quantityControlWrapper.appendChild(plusBtn);
  return quantityControlWrapper;
}

function priceElement(price) {
  const priceElement = document.createElement("span");
  const value = document.createElement("span");
  const Price = document.createElement("span");

  Price.textContent = price;
  value.innerHTML = "$";

  priceElement.appendChild(value);
  priceElement.appendChild(Price);

  return priceElement;
}

function handleGetCartData() {
  let totalValue = 0;
  const itemArea = document.querySelector(".item-area");
  const subTotalArea = document.querySelector(".sub-area");

  if (cartData.cartItems?.length) {
    const fragment = new DocumentFragment();
    if (!itemArea) return;

    itemArea.innerHTML = "";
    subTotalArea.innerHTML = "";

    cartData.cartItems.forEach((item, index) => {
      const divElement = document.createElement("div");
      const span = document.createElement("span");
      const image = document.createElement("img");
      const quantity = quantityElement(item.quantity, index);
      const priceEl = priceElement(item.price);
      const cancel = document.createElement("span");
      const hrElement = document.createElement("hr");

      cancel.innerHTML = "X";
      cancel.style.cursor = "pointer";

      cancel.addEventListener("click", function () {
        console.log("Cancel button clicked!");
        const indexToRemove = cartData.cartItems.findIndex(
          (_item, itemIndex) => index === itemIndex
        );
        console.log("Index to remove:", indexToRemove);
        if (indexToRemove > -1) {
          cartData.cartItems.splice(indexToRemove, 1);
          dataStorage.cardItems = cartData.cartItems;
        }
      });

      image.src = item.image;
      image.style.width = "15%";

      divElement.classList.add("item-wrapper");
      hrElement.classList.add("hr-element");

      divElement.appendChild(image);
      span.textContent = item.itemName;
      divElement.appendChild(span);
      divElement.appendChild(quantity);
      divElement.appendChild(priceEl);
      divElement.appendChild(cancel);
      fragment.appendChild(divElement);
      fragment.appendChild(hrElement);

      totalValue += parseInt(item.price) * item.quantity;
    });

    const subTotal = `<span class="sub-element">Subtotal</span> <span class="total-element">$${totalValue}</span>`;
    itemArea.appendChild(fragment);
    subTotalArea.innerHTML = subTotal;
  } else {
    console.error("Mảng cartItems rỗng.");
    itemArea.innerHTML = "There are no item in the cart, please get some!";
    const subTotal = `<span class="sub-element">Subtotal</span> <span class="total-element">$0</span>`;
    subTotalArea.innerHTML = subTotal;
  }
}

function handleGetCardData() {
  const cardDetails = cartData.cardDetails;

  if (cardDetails) {
    const card = document.querySelector(".card");
    if (!card) return;

    const bankNameElement = document.querySelector(".card-bankname");
    const cardNumElements = document.querySelectorAll(".card-num");
    const cardDateElement = document.querySelector(".card-date");
    const cardNameElements = document.querySelectorAll(".card-name");

    bankNameElement.textContent = cardDetails.bankName;

    const cardNumbers = cardDetails.number.split(":");
    cardNumbers.forEach((number, index) => {
      cardNumElements[index].textContent = number;
    });

    cardDateElement.textContent = cardDetails.expiredDate;

    cardNameElements.forEach((element) => {
      element.textContent = cardDetails.nameOnCard;
    });
  }
}

function limitInput(element) {
  let inputValue = element.value;

  inputValue = inputValue.replace(/[^0-9]/g, "");

  if (inputValue.length > 4) {
    inputValue = inputValue.slice(0, 4);
  }

  element.value = inputValue;

  const errorMessage = document.createElement("span");

  if (!/[0-9]/.test(element.value)) {
    window.alert("Only numer!!!");
    document.body.appendChild(errorMessage);
  }
}

function limitCV(element) {
  let inputValue = element.value;

  inputValue = inputValue.replace(/[^0-9]/g, "");

  if (inputValue.length > 3) {
    inputValue = inputValue.slice(0, 3);
  }

  element.value = inputValue;

  const errorMessage = document.createElement("span");
  errorMessage.style.color = "red";

  if (!/[0-9]/.test(element.value)) {
    window.alert("Only numer!!!");
    document.body.appendChild(errorMessage);
  }
}

function limitName(element) {
  let inputValue = element.value;

  inputValue = inputValue.replace(/[^a-zA-Z]/g, "");

  if (inputValue.length > 50) {
    inputValue = inputValue.slice(0, 50);
  }
  element.value = inputValue;

  const errorMessage = document.createElement("span");
  errorMessage.style.color = "red";

  if (!/[a-zA-Z]/.test(element.value)) {
    window.alert("Only alphabets!!!");
    document.body.appendChild(errorMessage);
  }
}

handleGetCartData();
handleGetCardData();
