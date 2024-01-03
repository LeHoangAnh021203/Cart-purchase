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

  quantity.textContent = quantityNumber;
  minusBtn.innerHTML = "-";
  plusBtn.innerHTML = "+";
  quantityControlWrapper.appendChild(minusBtn);
  quantityControlWrapper.appendChild(quantity);
  quantityControlWrapper.appendChild(plusBtn);
  return quantityControlWrapper;
}

function handleGetData() {
  const cartItems = cartData.cartItems;

  // Đảm bảo tồn tại ít nhất một phần tử trong mảng cartItems
  if (cartItems?.length) {
    const fragment = new DocumentFragment();
    const itemArea = document.querySelector(".item-area");
    if (!itemArea) return;

    cartItems.forEach((item) => {
      const divElement = document.createElement("div");
      const span = document.createElement("span");
      const image = document.createElement("img");
      const quantity = quantityElement(item.quantity);
      image.src = item.image;
      image.style.width = "30%";

      divElement.classList.add("item-wrapper");

      divElement.appendChild(image);
      span.textContent = item.itemName;
      divElement.appendChild(span);
      divElement.appendChild(quantity);
      fragment.appendChild(divElement);
    });
    itemArea.appendChild(fragment);
  } else {
    console.error("Mảng cartItems rỗng.");
  }
}

handleGetData();
