const PRODUCTS_TABLE = document.getElementById("productstablebody");

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(`${CART_INFO_URL}${localStorage.getItem("userID")}.json`).then(function (resultObj) {
        if (resultObj.status === "ok") {
            console.log(resultObj.data);
            let productscart = resultObj.data.articles;
            console.log(productscart);
            let htmlContentToAppend = "";

            for (let i = 0; i < productscart.length; i++) {
                let productcart = productscart[i];
                htmlContentToAppend += `
                <tr>
                <th><img src="${productcart.image}" style="max-width:100px"></th>
                <td>${productcart.name}</td>
                <td>${productcart.currency} ${productcart.unitCost}</td>
                <td><div id="${productcart.name}input"></div></td>
                <td><strong id="${productcart.name}subtotal"></strong></td>
              </tr>
                `
                PRODUCTS_TABLE.innerHTML += htmlContentToAppend;

                var input = document.createElement("input");
                input.class = "form-control";
                input.type = "number";
                input.value = productcart.count;
                input.min = 1;
                input.id = `inputcantidad`;

                document.getElementById(`${productcart.name}input`).appendChild(input);

                let htmlSubtotal = `
                ${productcart.currency} ${productcart.unitCost * input.value}
                `

            input.addEventListener("input", function () {
                    htmlSubtotal = `
                    ${productcart.currency} ${productcart.unitCost * input.value}
                    `
                    document.getElementById(`${productcart.name}subtotal`).innerHTML = htmlSubtotal;
                })

                document.getElementById(`${productcart.name}subtotal`).innerHTML = htmlSubtotal;
            }

        }
    });


    let arrayProdCart = JSON.parse(localStorage.getItem("arrayProdCart"));

    for (let producto of arrayProdCart) {
        let prodImg = producto[0];
        let prodName = producto[1];
        let prodCurrency = producto[2];
        let prodPrice = producto[3];
        let htmlProdToCart = "";
        htmlProdToCart += `
        <tr>
        <th><img src="${prodImg}" style="max-width:100px"></th>
        <td>${prodName}</td>
        <td>${prodCurrency} ${prodPrice}</td>
        <td><div id="${prodName}input"></div></td>
        <td><strong id="${prodName}subtotal"></strong></td>
      </tr>
        `
        PRODUCTS_TABLE.innerHTML+=(htmlProdToCart);

        var input = document.createElement("input");
        input.class = "form-control";
        input.type = "number";
        input.value = 1;
        input.min = 1;
        input.id = `inputcantidad`;

        document.getElementById(`${prodName}input`).appendChild(input);

        let htmlSubtotal = `
        ${prodCurrency} ${prodPrice * input.value}
        `

       input.addEventListener("input", function (){
            console.log("funciona");
            htmlSubtotal = `
            ${prodCurrency} ${prodPrice * input.value}
            `
            document.getElementById(`${prodName}subtotal`).innerHTML = htmlSubtotal;
        })

        document.getElementById(`${prodName}subtotal`).innerHTML = htmlSubtotal;




    }
});