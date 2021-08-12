var cartString = "";
var total = 0;
var itemsInCart = 0;

class Product
{
    constructor(public name:string, public price:number){}
    public jsonObject:JSON = <JSON><unknown>{name:this.name, price:this.price};
}

function addToCart(item:Product):void
{
    itemsInCart++;
    var stringItem = JSON.stringify(<JSON>item.jsonObject);
    cartString = cartString + stringItem + "|?";

    total = total + +item.price;
    var totalString = total.toString();

    localStorage.setItem("bigString", cartString);
    localStorage.setItem("total", totalString);

    document.getElementById("cartSize").innerHTML = "Cart Size: " + itemsInCart;

    console.log(cartString);
    console.log(totalString);
}

function getData():void
{
    var bigString = localStorage.getItem("bigString");
    var cartArray = bigString.split("|?");
    var totalString = localStorage.getItem("total");

    console.log(bigString);
    console.log(cartArray[0]);
    console.log(totalString);

    document.getElementById("total").innerHTML = "Total: $" + totalString;

    for(var i = 0; i < cartArray.length; i++)
    {
        let parsed = JSON.parse(cartArray[i]);
        console.log(parsed);

        let row = document.createElement('tr');
        let productName = document.createElement('td');
        let text1 = document.createTextNode(parsed.name);
        let productPrice = document.createElement('td');
        let text2 = document.createTextNode(parsed.price);


        productName.appendChild(text1);
        productPrice.appendChild(text2);

        row.appendChild(productName);
        row.appendChild(productPrice);

        document.getElementById("table").appendChild(row);
    }
}