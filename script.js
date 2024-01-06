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

  minusBtn.addEventListener("click", function () {
    if (quantityNumber > 0) {
      quantityNumber--;
      quantity.textContent = quantityNumber;
    }
  });

  plusBtn.addEventListener("click", function () {
    quantityNumber++;
    quantity.textContent = quantityNumber;
  });

  // cancel.addEventListener("click", function () {
  //   // Lấy index của mục trong cartItems
  //   const indexToRemove = cartData.cartItems.findIndex(cartItem => cartItem.itemName === span.textContent);

  // //   // Xóa mục từ cartItems
  //   if (indexToRemove !== -1) {
  //     cartData.cartItems.splice(indexToRemove, 1);
  //     handleGetCartData(); // Cập nhật hiển thị giỏ hàng
  //   }
  // });


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
  const cartItems = cartData.cartItems;
  let totalValue = 0;
  // let Price = 0;

  
  if (cartItems?.length) {
    const fragment = new DocumentFragment();
    const itemArea = document.querySelector(".item-area");
    const subTotalArea = document.querySelector(".sub-area");
    if (!itemArea) return;

    itemArea.innerHTML = '';

    cartItems.forEach((item) => {
      // const bigDivElement = document.createElement("div");
      const divElement = document.createElement("div");
      const span = document.createElement("span");
      const image = document.createElement("img");
      const quantity = quantityElement(item.quantity);
      const priceEl = priceElement(item.price);
      const cancel = document.createElement("span");
      const hrElement = document.createElement("hr");

      cancel.innerHTML = "X"
      cancel.style.cursor = "pointer";

      cancel.addEventListener('click', function () {
        console.log('Cancel button clicked!');
        const indexToRemove = cartItems.findIndex(item => item.itemName === span.textContent);
        console.log('Index to remove:', indexToRemove);
        if (indexToRemove !== -1) {
          cartItems.splice(indexToRemove, 1);
          handleGetCartData(); // Update the cart display
        }
      });

      image.src = item.image;
      image.style.width = "15%";

      divElement.classList.add("item-wrapper");
      hrElement.classList.add("hr-element");
      
      // price.textContent = `$${parseInt(item.price) * item.quantity}`;

      divElement.appendChild(image);
      span.textContent = item.itemName;
      divElement.appendChild(span);
      divElement.appendChild(quantity);
      divElement.appendChild(priceEl);
      divElement.appendChild(cancel);
      fragment.appendChild(divElement);
      fragment.appendChild(hrElement);
      
      totalValue += parseInt(item.price) * item.quantity;
      // Price += parseInt(item.price) * item.quantity;
      // priceEl.textContent = `$${Price}`;
      
    });
    const subElement = document.createElement("span");
    const totalElement = document.createElement("span");

    subElement.textContent = "Subtotal";
    totalElement.textContent = `$${totalValue}`;
    itemArea.appendChild(fragment);
    subTotalArea.appendChild(subElement);
    subTotalArea.appendChild(totalElement);

    subElement.classList.add("sub-element");
    totalElement.classList.add("total-element");

    document.querySelectorAll('.item-wrapper span[aria-label="cancel"]').forEach((cancelBtn, index) => {
      cancelBtn.addEventListener('click', () => {
        cartItems.splice(index, 1); // Remove the item from the cartItems array
        handleGetCartData(); // Update the cart display
      });
    });
  } else {
    console.error("Mảng cartItems rỗng.");
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

    cardTypeElements.forEach((element) => {
      element.textContent = "VISA";
    });
  }
}

function limitInput(element){
  let inputValue = element.value;

  inputValue = inputValue.replace(/[^0-9]/g, '');

  if (inputValue.length > 4){
    inputValue = inputValue.slice(0, 4);
  }

  element.value = inputValue;

  const errorMessage = document.createElement("span");

  if (!/[0-9]/.test(element.value)){
    window.alert('Only numer!!!');
    document.body.appendChild(errorMessage);
  }
}

function limitCV(element){
  let inputValue = element.value;

  inputValue = inputValue.replace(/[^0-9]/g, '');

  if (inputValue.length > 3){
    inputValue = inputValue.slice(0, 3);
  }

  element.value = inputValue;

  const errorMessage = document.createElement("span");
  errorMessage.style.color = 'red';

  if (!/[0-9]/.test(element.value)){
    window.alert('Only numer!!!');
    document.body.appendChild(errorMessage);
  }
}

function limitName(element){
  let inputValue = element.value;

  inputValue = inputValue.replace(/[^a-zA-Z]/g, '');

  if (inputValue.length > 50){
    inputValue = inputValue.slice(0, 50);
  }
  element.value = inputValue;

  const errorMessage = document.createElement("span");
  errorMessage.style.color = 'red';

  if (!/[a-zA-Z]/.test(element.value)){
    window.alert('Only alphabets!!!');
    document.body.appendChild(errorMessage);
  }

}


handleGetCartData();
handleGetCardData();
