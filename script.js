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
  ],
};

function quantityElement(quantityNumber) {
  const quantityControlWrapper = document.createElement("div");
  const minusBtn = document.createElement("button");
  const plusBtn = document.createElement("button");
  const quantity = document.createElement("span");

  quantityControlWrapper.classList.add("quantity-control-wrapper")
  minusBtn.classList.add("minus-button");
  plusBtn.classList.add("plus-button");
  quantity.classList.add("quantity");

  quantity.textContent = quantityNumber;
  minusBtn.innerHTML = "-";
  plusBtn.innerHTML = "+";
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

function handleGetData() {
  const cartItems = cartData.cartItems;
  let totalValue = 0;

  
  if (cartItems?.length) {
    const fragment = new DocumentFragment();
    const itemArea = document.querySelector(".item-area");
    if (!itemArea) return;

    cartItems.forEach((item) => {
      const divElement = document.createElement("div");
      const span = document.createElement("span");
      const image = document.createElement("img");
      const quantity = quantityElement(item.quantity);
      const priceEl = priceElement(item.price);
      const cancel = document.createElement("span");
      const hrElement = document.createElement("hr");

      cancel.innerHTML = "X"
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
      // totalElement.textContent = "Subtotal $" + totalValue;
    });
    const subElement = document.createElement("span");
    const totalElement = document.createElement("span");

    subElement.textContent = "Subtotal";
    totalElement.textContent = `$${totalValue}`;
    itemArea.appendChild(fragment);
    itemArea.appendChild(subElement);
    itemArea.appendChild(totalElement);

    subElement.classList.add("sub-element");
    totalElement.classList.add("total-element");
  } else {
    console.error("Mảng cartItems rỗng.");
  }
}

handleGetData();
