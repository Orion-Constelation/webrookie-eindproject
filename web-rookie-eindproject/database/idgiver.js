fetch("products.json")
    .then(res => res.json())
    .then(data =>{
        let i = 0;
        data.forEach(element => {
            element.id = i;
            i++
        });
        console.log(JSON.stringify(data, null, 2));
    });