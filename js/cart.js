const PRODUCTS_TABLE = document.getElementById("productstablebody");

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

function mostrarProductosCart() {
    let arrayProdCart = JSON.parse(localStorage.getItem("arrayProdCart"));

    let productInfoHtml = "";

    for (let i = 0; i < arrayProdCart.length; i++) {
        let productInfo = arrayProdCart[i];

        productInfoHtml = `
        <th><img src="${productInfo.img}" style="max-width:100px"></th>
        <td>${productInfo.name}</td>
        <td>${productInfo.currency} ${productInfo.cost}</td>
        <td><input id="${productInfo.id}input" class="form-control inputcantidad" type="number" value="1" min="1"></td>
        <td><strong>${productInfo.currency} </strong><strong id="${productInfo.id}subtotal" class="subtotal"></strong></td>
        <td><button class="fa fa-trash" style= "color: red; border: 2px solid red; border-radius: 8px; padding: 5px" onclick="eliminarProducto(${productInfo.id})"></button><td>
        `

        var fila = document.createElement("tr");
        fila.id = `elemento${[productInfo.id]}`,
            fila.innerHTML = (productInfoHtml);
        PRODUCTS_TABLE.appendChild(fila);

        let htmlProdSubtotal = `
        ${productInfo.cost * document.getElementById(`${productInfo.id}input`).value}
        `
        document.getElementById(`${productInfo.id}subtotal`).innerHTML = htmlProdSubtotal;
        sumarSubtotales();
        sumarEnvio();

        document.getElementById(`${productInfo.id}input`).addEventListener("input", function () {
            htmlProdSubtotal = `
            ${productInfo.cost * document.getElementById(`${productInfo.id}input`).value}
            `
            document.getElementById(`${productInfo.id}subtotal`).innerHTML = htmlProdSubtotal;
            sumarSubtotales();
            sumarEnvio();
        })
    }

}

function eliminarProducto(id) {

    PRODUCTS_TABLE.removeChild(document.getElementById(`elemento${[id]}`));
    sumarSubtotales();
    sumarEnvio();

    let arrayProdCart = JSON.parse(localStorage.getItem("arrayProdCart"));
    for (let i = 0; i < arrayProdCart.length; i++) {
        let productInfo = arrayProdCart[i];
        if (id === productInfo.id) {
            let index = arrayProdCart.indexOf(productInfo);
            if (index > -1) {
                console.log(index)
                arrayProdCart.splice(index, 1);
                localStorage.setItem("arrayProdCart", JSON.stringify(arrayProdCart));

            }
        }
    }
}

function sumarSubtotales() {
    let subtotales = document.getElementsByClassName("subtotal");
    let htmlSubtotalGeneral = 0;
    for (let i = 0; i < subtotales.length; i++) {
        let subtotal = parseInt(subtotales[i].textContent);
        htmlSubtotalGeneral += subtotal;
    }
    document.getElementById("subtotalgeneral").innerHTML = `USD ${htmlSubtotalGeneral}`;
}

function sumarEnvio() {
    let inputsEnvio = document.getElementsByClassName("envio");
    for (let i = 0; i < inputsEnvio.length; i++) {
        let inputEnvio = inputsEnvio[i];
        if (inputEnvio.checked) {
            let subtotal = document.getElementById("subtotalgeneral").textContent.slice(4);
            document.getElementById("costodeenvio").innerHTML = `USD ${(parseInt(subtotal) * inputEnvio.value).toFixed()}`
        }
    }
    sumarTotal()
}

function sumarTotal() {
    let subtotalGenral = document.getElementById("subtotalgeneral").textContent.slice(4);
    let costoEnvio = document.getElementById("costodeenvio").textContent.slice(4);
    if (costoEnvio === "-") {
        document.getElementById("totalgeneral").innerHTML = `USD -`
    } else {
        document.getElementById("totalgeneral").innerHTML = `USD ${parseInt(subtotalGenral) + parseInt(costoEnvio)}`
    }

}

function seleccionarFormaDePago() {
    let inputsPago = document.getElementsByClassName("pago");
    for (let i = 0; i < inputsPago.length; i++) {
        let inputPago = inputsPago[i];
        if (inputPago.checked) {
            let inputs = document.getElementsByClassName(`${inputPago.value}`);
            for (let input of inputs) {
                input.removeAttribute("disabled");
            }
        } else {
            let inputs = document.getElementsByClassName(`${inputPago.value}`);
            for (let input of inputs) {
                input.setAttribute("disabled", true);
            }
        }
    }
}

function validarTextos() {
    let indicadorTexto = true
    let inputsTexto = document.getElementsByClassName("validationtext");
    for (let input of inputsTexto) {
        if (input.checkValidity()) {
            indicadorTexto = true
        } else {
            indicadorTexto = false;
        }
    }
    return indicadorTexto;
}

function validarCheckEnvio() {
    let inputsEnvioCheck = document.getElementsByClassName("form-check-input envio");
    let indicadorEnvio = false;
    for (let input of inputsEnvioCheck) {
        if (input.checked) {
            indicadorEnvio = true
        }
    }
    return indicadorEnvio
}

function validarPago() {
    let inputsFormaPago = document.getElementsByClassName("form-check-input pago");
    let indicadorPago = false;
    for (let input of inputsFormaPago) {
        if (input.checked) {
            indicadorPago = true
        }
    }
    return indicadorPago;
}

function validarDatos() {

    if (!validarPago()) {
        document.getElementById("validationFormaPagoFeedback").classList.remove("visually-hidden")
    } else {
        document.getElementById("validationFormaPagoFeedback").classList.add('visually-hidden')
    }

    if (validarTextos() && validarCheckEnvio() && validarPago()) {
        return true;
    } else {
        document.getElementById("envio").classList.add("was-validated")
        return false;
    };
}

document.addEventListener("DOMContentLoaded", function (e) {

    if (localStorage.getItem("arrayProdCart") === "[]") {
        getJSONData(`${CART_INFO_URL}${localStorage.getItem("userID")}.json`).then(function (resultObj) {
            if (resultObj.status === "ok") {
                console.log(resultObj.data);
                let productcart = resultObj.data.articles[0];
                let arrayProdCart = JSON.parse(localStorage.getItem("arrayProdCart"));
                let prodInfo = { id: productcart.id, img: productcart.image, name: productcart.name, currency: productcart.currency, cost: productcart.unitCost }
                arrayProdCart.push(prodInfo);
                localStorage.setItem("arrayProdCart", JSON.stringify(arrayProdCart));
                mostrarProductosCart();
            }
        });
    } else {
        mostrarProductosCart();
    }

    document.getElementById("cerrarpago").addEventListener("click", function () {
        let inputs = document.getElementsByClassName(`campospago`);
        for (let input of inputs) {
            input.value = "";
        }
    });

    document.getElementById("guardarpago").addEventListener("click", function () {
        if (!validarPago()) {
            document.getElementById("validationFormaPagoFeedback").classList.remove("visually-hidden")
        } else {
            document.getElementById("validationFormaPagoFeedback").classList.add('visually-hidden')
        }

    });

    document.getElementById("btnfinalizarcompra").addEventListener("click", function (e) {

        if (!validarDatos()) {
            e.preventDefault()
        } else {
            alert('¡Has comprado con éxito!', 'success')
        }
    });
});