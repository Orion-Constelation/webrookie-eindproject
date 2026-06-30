let products;
fetch("./database/products.json")
    .then(res => res.json())
    .then(data =>{
        products = data;
        localStorage.setItem("products", JSON.stringify(products));
    });
    products = JSON.parse(localStorage.getItem("products"));
export { products };