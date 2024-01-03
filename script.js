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

  var cartItems = cartData.cartItems;

// Đảm bảo tồn tại ít nhất một phần tử trong mảng cartItems
if (cartItems.length > 0) {
    // Đổ dữ liệu từ cartItems vào các span
    cartItems.forEach(function(item, index) {
        var span = document.getElementById("item" + (index + 1));

        // Kiểm tra xem span có tồn tại không
        if (span) {
            // Kiểm tra xem có thẻ img trong span không
            var imgElement = span.querySelector("img");
            if (imgElement) {
                // Đặt src của ảnh
                imgElement.src = item.image;

                // Đặt nội dung của các thẻ p
                span.querySelectorAll("p")[0].innerText = item.itemName;
                span.querySelectorAll("p")[1].innerText = "Quantity: " + item.quantity;
                span.querySelectorAll("p")[2].innerText = "Price: $" + item.price;
            } else {
                console.error("Không có thẻ img trong phần tử có id: " + "item" + (index + 1));
            }
        } else {
            console.error("Không tìm thấy phần tử có id: " + "item" + (index + 1));
        }
    });
} else {
    console.error("Mảng cartItems rỗng.");
}
