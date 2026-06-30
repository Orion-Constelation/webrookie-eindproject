let x = 0;
import { products } from "./database/fetch.js";

let noiseCancel;
let mic;
let rating;
let headsets = document.querySelector("#headsets");
const ClearBtn = document.querySelector("#ClearBtn");
let summery = document.querySelector("#summery");
let total = document.querySelector("#total");
let cart = [];
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

drawCart();

ClearBtn.addEventListener("click", () => {
    localStorage.setItem("cart", "");
    cart = [];
    drawCart();
});


function drawCart() {
    headsets.innerHTML = "";
    let TotPrice = 0;
    summery.innerHTML = "";
    cart.forEach(cartItem => {
        const element = products.find((e) => e.id == cartItem)
        x++;
        if (element.NC == "false") {
            noiseCancel = "not available"
        } else {
            noiseCancel = element.NC;
        }
        if (element.mic == "true") {
            mic = "internal"
        } else if (element.mic == "external") {
            mic = "external";
        } else {
            mic = "not included";
        }
        if (element.rating == "false") {
            rating = "N/A";
        } else {
            rating = `${element.rating}/5`
        }
        TotPrice += parseInt(element.price);
        const newBox = document.createElement("div");
        newBox.setAttribute("class", "HeadsetBox");
        newBox.innerHTML =
            `<h2>${element.name}</h2>
                <div class="img-holder">
                    <img src="${element.img}" class="headsetimg">
                </div>
                    <ul style="margin-block-end: 0;">
                        <li>${element.brand}</li>
                        <li>noise canceling: ${noiseCancel}</li>
                        <li>microphone: ${mic}</li>
                        <li>${element.type}</li>
                        <li>connection: ${element.connection}</li>
                        <li>€${element.price}</li>
                        <li>rating: ${rating}</li>
                    </ul>
                <div>
                    <button id="cartRemove${x}" class="cartRemove">
                        <img src="1413908.png" class="cartIcon">
                    </button>`;
        headsets.append(newBox);
        const tot = document.createElement("li");
        tot.innerHTML = TotPrice;
        const newLine = document.createElement("li");
        newLine.innerHTML = `${element.brand} ${element.name} €${element.price}`;
        summery.append(newLine);

        if (document.querySelectorAll(".cartRemove")) {
            const middleman = document.querySelector(`#cartRemove${x}`);
            middleman.addEventListener("click", () => {
                cartArray.push(JSON.stringify({
                    "name": element.name,
                    "color": element.color
                }));
                console.log(cartArray);
                localStorage.setItem(`cart`, JSON.stringify(cartArray));
            });
        }
    });
    const tot = document.createElement("li");
    if (TotPrice > 0) {
        tot.innerHTML = `Total: €${TotPrice}`;
    } else {
        tot.innerHTML = `Total: n/a`
    }
    summery.append(tot)
}