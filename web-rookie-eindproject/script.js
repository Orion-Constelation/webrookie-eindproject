import { products } from "./database/fetch.js";
const body = document.querySelector("body");
const headsets = document.querySelector("#headsets");
const JBLradio = document.querySelector("#jbl");
const Sonyradio = document.querySelector("#sony");
const brandAll = document.querySelector("#brandAll");
const colorAll = document.querySelector("#colorAll");
const colorbtn = document.querySelectorAll(".color");
const NCbtn = document.querySelectorAll(".NC");
const cartCount = document.querySelector("#cartCounter");
let noiseCancel;
let mic;
let rating;
let x = 0;
let cartArray = [];
if (localStorage.getItem("cart")) {
    cartArray = JSON.parse(localStorage.getItem("cart"));
}



if (localStorage.getItem("ColorFilter")) {
    const activeColor = document.querySelector(`#${localStorage.getItem("ColorFilter")}`);
    activeColor.setAttribute("checked", true);
}

if (localStorage.getItem("NCFilter")) {
    const activeNC = document.querySelector(`#${localStorage.getItem("NCFilter")}`);
    activeNC.setAttribute("checked", true);
}

Sonyradio.addEventListener("click", () => {
    headsets.innerHTML = "";
    localStorage.setItem("BrandFilter", "Sony");
    drawpage(products);
});

JBLradio.addEventListener("click", () => {
    headsets.innerHTML = "";
    localStorage.setItem("BrandFilter", "JBL");

    drawpage(products);

});

brandAll.addEventListener("click", () => {
    headsets.innerHTML = "";
    localStorage.setItem("BrandFilter", "All");

    drawpage(products);


});

colorAll.addEventListener("click", () => {
    headsets.innerHTML = "";
    localStorage.setItem("ColorFilter", "colorAll");

    drawpage(products);
})

colorbtn.forEach((e) => {
    e.addEventListener("click", () => {
        headsets.innerHTML = "";
        localStorage.setItem("ColorFilter", `${e.value}`);
        drawpage(products);
    });
});

NCbtn.forEach((e) => {
    e.addEventListener("click", () => {
        headsets.innerHTML = "";
        localStorage.setItem("NCFilter", `${e.value}`);
        drawpage(products);
    })
});

drawpage(products);

function drawpage(element) {
    if (cartArray) {
        cartCount.innerHTML = cartArray.length;
    }

    headsets.innerHTML = "";
    let x = 0;
    element.filter((e) =>
        (localStorage.getItem("BrandFilter") == "All" ? true : e.brand == localStorage.getItem("BrandFilter"))
        && (localStorage.getItem("ColorFilter") == "colorAll" ? true : e.color == localStorage.getItem("ColorFilter"))
        && (localStorage.getItem("NCFilter") == "NCall" ? true : e.NC == localStorage.getItem("NCFilter"))

    ).forEach(element => {
        console.log(element);
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
                    <button id="cartButton${x}" class="cartButton">
                        <img src="1413908.png" class="cartIcon">
                    </button>`;


        headsets.append(newBox);
        if (document.querySelectorAll(".cartButton")) {
            const middleman = document.querySelector(`#cartButton${x}`);
            middleman.addEventListener("click", () => {
                cartArray.push(element.id);
                console.log(cartArray);
                localStorage.setItem(`cart`, JSON.stringify(cartArray));
                cartCount.innerHTML = cartArray.length;
            })
        }
    })
}


switch (localStorage.getItem("BrandFilter")) {
    case "Sony":
        Sonyradio.setAttribute("checked", true);
        break;
    case "JBL":
        JBLradio.setAttribute("checked", true);
        break;
    case "All":
        brandAll.setAttribute("checked", true);
    default:
        break;
}


console.log(products);