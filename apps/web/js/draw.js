
var draw = (function () {
    'use strict';

    return {
        clientsTable: clientsTable,
        productsTable: productsTable,
        productDetails: productDetails
    }
    function clientsTable(clients) {
        var element = document.getElementById("main");
        element.innerHTML = "";
        for (var i = 0; i < clients.length; i++) {
            (function (i) {
                var row = document.createElement("div");
                row.className = "flex";
                row.className += " row";
                row.className += " over";

                var child = document.createElement("div");
                child.className = "flex-item"
                row.className += " aCenter";
                child.innerHTML = clients[i].lastName;
                row.appendChild(child);

                var child2 = document.createElement("div");
                child2.className = "flex-item";
                child2.className += " hideColumnSmall";
                child2.innerHTML = clients[i].firstName;
                row.appendChild(child2);

                var child3 = document.createElement("div");
                child3.className = "flex-item";
                child3.className += " hideColumn";
                child3.innerHTML = clients[i].company;
                row.appendChild(child3);

                var child4 = document.createElement("div");
                child4.className = "flex-item";
                child4.className += " hideColumn";
                child4.innerHTML = clients[i].position;
                row.appendChild(child4);

                var child5 = document.createElement("div");
                child5.onclick = function () { editClient(i) };
                child5.className += " flex-item";

                var child6 = document.createElement("img");
                child6.src = "material-icons/ic_edit_24px.svg";
                child6.style.cursor = "pointer";
                child5.appendChild(child6);
                row.appendChild(child5);

                var child7 = document.createElement("div");
                child7.onclick = function () { deleteClient(i) };
                child7.className += " flex-item";

                var child8 = document.createElement("img");
                child8.src = "material-icons/ic_delete_24px.svg";
                child8.style.cursor = "pointer";
                child7.appendChild(child8);

                row.appendChild(child7);
                element.appendChild(row);
            })(i)
        }
    }
    function productsTable(products) {
        var element = document.getElementById("productList");
        element.innerHTML = "";
        for (var i = 0; i < products.length; i++) {
            (function (i) {
                var row = document.createElement("div");
                row.className = "flex-item";
                row.className += " row";
                row.className += " over";
                row.style.padding = "2px";
                var child = document.createElement("div");
                child.className = "flex-item"
                child.innerHTML = products[i].name;
                row.appendChild(child);

                var child2 = document.createElement("div");
                child2.className = "flex-item jEnd"
                row.appendChild(child2);

                var child3 = document.createElement("img");
                child3.onclick = function () { getDetails(products[i]._id) };
                child3.src = "material-icons/ic_info_outline_24px.svg";
                child3.style.cursor = "pointer";
                child2.appendChild(child3);
                element.appendChild(row);

                var child4 = document.createElement("img");
                child4.onclick = function () { deleteProduct(products[i]._id) };
                child4.src = "material-icons/ic_delete_24px.svg";
                child4.style.cursor = "pointer";
                child4.style.marginLeft = "20px";
                child2.appendChild(child4);
                element.appendChild(row);
            })(i)
        }
    }
    function productDetails(productDetail) {
        var element = document.getElementById("productDetails");
        element.innerHTML = "";

        var row = document.createElement("div");
        row.className = "flex";
        row.className += " column";
        row.style.margin = "2px";

        var child = document.createElement("div");
        child.className = "flex-item"
        child.innerHTML = "Name: " + productDetail.name;
        row.appendChild(child);
        element.appendChild(row);

        var child2 = document.createElement("div");
        child2.className = "flex-item"
        child2.innerHTML = "Price: " + productDetail.price;
        row.appendChild(child2);
        element.appendChild(row);

        var child3 = document.createElement("div");
        child3.className = "flex-item"
        child3.innerHTML = "Quantity: " + productDetail.quantity;
        row.appendChild(child3);
        element.appendChild(row);

        var child4 = document.createElement("div");
        child4.className = "flex-item"
        child4.innerHTML = "Brand: " + productDetail.brand;
        row.appendChild(child4);
        element.appendChild(row);

        var child5 = document.createElement("div");
        child5.className = "flex-item"
        child5.innerHTML = "Model: " + productDetail.model;
        row.appendChild(child5);
        element.appendChild(row);

        var child6 = document.createElement("div");
        child6.className = "flex-item"
        child6.innerHTML = "Origin: " + productDetail.origin;
        row.appendChild(child6);
        element.appendChild(row);

        var child7 = document.createElement("div");
        child7.className = "flex-item"
        child7.innerHTML = "Returnable: " + productDetail.returnable;
        row.appendChild(child7);
        element.appendChild(row);

        var child8 = document.createElement("div");
        child8.className = "flex-item"
        child8.innerHTML = "Rating: " + productDetail.rating;
        row.appendChild(child8);
        element.appendChild(row);

        var child9 = document.createElement("div");
        child9.className = "flex-item"
        child9.innerHTML = "Description: " + productDetail.description;
        row.appendChild(child9);
        element.appendChild(row);
    }
})()
