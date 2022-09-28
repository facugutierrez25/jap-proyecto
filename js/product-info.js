const NAME_CONTAINER = document.getElementById("prodname");
const PRICE_CONTAINER = document.getElementById("prodprice");
const DESCRIPTION_CONTAINER = document.getElementById("proddescription");
const CATEGORY_CONTAINER = document.getElementById("prodcategory");
const SOLD_COUNT_CONTAINER = document.getElementById("soldCount");
const IMG_LIST_CONTAINER = document.getElementById("img-list");
const COMMENTS_CONTAINER = document.getElementById("comments-list-container");
const RELATED_PRODUCTS_CONTAINER = document.getElementById("relacionados-container");

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(`${PRODUCT_INFO_URL}${localStorage.getItem("prodID")}.json`).then(function(resultObj){
        if (resultObj.status === "ok"){
            console.log(resultObj.data);
            NAME_CONTAINER.innerHTML = `${resultObj.data.name}`;
            PRICE_CONTAINER.innerHTML = `${resultObj.data.currency} ${resultObj.data.cost}`;
            DESCRIPTION_CONTAINER.innerHTML = `${resultObj.data.description}`;
            CATEGORY_CONTAINER.innerHTML = `${resultObj.data.category}`;
            SOLD_COUNT_CONTAINER.innerHTML = `${resultObj.data.soldCount}`

            let imagenes = resultObj.data.images
            let htmlContentToAppend = "";

            for (let img of imagenes){
                htmlContentToAppend += `
                <img src="${img}" class="col-3"></img>
                `
            }
            
            IMG_LIST_CONTAINER.innerHTML = htmlContentToAppend;

            let productosRelacionados = resultObj.data.relatedProducts;
            let htmlProductosRelacionados = "";
            
            for (let producto of productosRelacionados){
                htmlProductosRelacionados += `
                <div onclick="setProdID(${producto.id})" class="col-4 card cursor-active" style="padding:10px; margin:10px">
                    <div class="div-img">
                    <img class="bd-placeholder-img card-img-top rounded" src="${producto.image}" alt="${producto.name}">
                    </div>
                    <div class="card-body">
                        <strong class="card-title">${producto.name}</strong>
                    </div>
                    </div>
                </div>
                `
            }

            RELATED_PRODUCTS_CONTAINER.innerHTML = htmlProductosRelacionados;

        }
    });

    getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${localStorage.getItem("prodID")}.json`).then(function(resultObj){
        if (resultObj.status === "ok"){
            console.log(resultObj.data);

            htmlContentToAppend = "";
            let comments = resultObj.data;
            for(let i = 0; i < comments.length; i++){
                let comment = comments[i];
                let estrellaChecked = `<span class="fa fa-star checked"></span>`;
                let estrellaNoChecked = `<span class="fa fa-star"></span>`;
                let rate = estrellaChecked.repeat(comment.score) + estrellaNoChecked.repeat(5-comment.score);
                console.log(comment);
                htmlContentToAppend += `
                <div class="list-group-item">
                    <div class="row">
                        <p class="col"><strong>${comment.user}</strong> - ${comment.dateTime} - Score: ${rate}</p>
                    </div>
                    <div>
                        <p>${comment.description}</p>
                    </div>
                </div>
                `
            COMMENTS_CONTAINER.innerHTML = htmlContentToAppend;
            }

        }
    });

    document.getElementById("submit-comment-btn").addEventListener("click", function(event){

        event.preventDefault();
        localStorage.setItem("opinion", document.getElementById("opinion").value);
        localStorage.setItem("puntuacion", document.getElementById("puntuacion").value);
        let user = localStorage.getItem("username");
        let score = localStorage.getItem("puntuacion");
        var date = new Date();
        var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
        let estrellaChecked = `<span class="fa fa-star checked"></span>`;
        let estrellaNoChecked = `<span class="fa fa-star"></span>`;
        let rate = estrellaChecked.repeat(score) + estrellaNoChecked.repeat(5-score);


        htmlContentToAppend += `
        <div class="list-group-item">
            <div class="row">
                <p class="col"><strong>${user}</strong> - ${current_date} - Score: ${rate}</p>
            </div>
            <div>
                <p>${localStorage.getItem("opinion")}</p>
            </div>
        </div>
        `
        document.getElementById("opinion").value = "";
        document.getElementById("puntuacion").value = "";
        
        COMMENTS_CONTAINER.innerHTML = htmlContentToAppend;
    });


});