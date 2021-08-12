var cartString = "";
var total = 0;
var itemsInCart = 0;
var Product = /** @class */ (function () {
    function Product(name, price) {
        this.name = name;
        this.price = price;
        this.jsonObject = { name: this.name, price: this.price };
    }
    return Product;
}());
function addToCart(item) {
    itemsInCart++;
    var stringItem = JSON.stringify(item.jsonObject);
    cartString = cartString + stringItem + "|?";
    total = total + +item.price;
    var totalString = total.toString();
    localStorage.setItem("bigString", cartString);
    localStorage.setItem("total", totalString);
    document.getElementById("cartSize").innerHTML = "Cart Size: " + itemsInCart;
    console.log(cartString);
    console.log(totalString);
}
function getData() {
    var bigString = localStorage.getItem("bigString");
    var cartArray = bigString.split("|?");
    var totalString = localStorage.getItem("total");
    console.log(bigString);
    console.log(cartArray[0]);
    console.log(totalString);
    document.getElementById("total").innerHTML = "Total: $" + totalString;
    for (var i = 0; i < cartArray.length; i++) {
        var parsed = JSON.parse(cartArray[i]);
        console.log(parsed);
        var row = document.createElement('tr');
        var productName = document.createElement('td');
        var text1 = document.createTextNode(parsed.name);
        var productPrice = document.createElement('td');
        var text2 = document.createTextNode(parsed.price);
        productName.appendChild(text1);
        productPrice.appendChild(text2);
        row.appendChild(productName);
        row.appendChild(productPrice);
        document.getElementById("table").appendChild(row);
    }
}
