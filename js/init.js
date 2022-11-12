const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
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

document.addEventListener("DOMContentLoaded", function () {
  if ((localStorage.getItem("username") === null) || (localStorage.getItem("username") === undefined)) {
    window.location.assign("login.html");
  } else {
    console.log(localStorage.getItem("username"));
    document.getElementById("username-container").innerHTML = `
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        ${localStorage.getItem("username")}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
        <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
        <li id="cerrarsesion"><a class="dropdown-item" href="login.html">Cerrar sesión</a></li>
      </ul>
    </div>
    `;
  }

  if (localStorage.getItem("arrayProdCart") === null) {
    let arrayProdCart = [];
    localStorage.setItem("arrayProdCart", JSON.stringify(arrayProdCart));
  }

  document.getElementById("cerrarsesion").addEventListener("click", function () {
    localStorage.removeItem("username");
    localStorage.removeItem("arrayProdCart");
    localStorage.removeItem("userNombre1");
    localStorage.removeItem("userNombre2");
    localStorage.removeItem("userApellido1");
    localStorage.removeItem("userApellido2");
    localStorage.removeItem("userTelefono");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userImg");
  });

});



