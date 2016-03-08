var products = (function () {
    'use strict';
    var products, productDetail;
    var dialog = document.querySelector('#productDialog');
    return {
        getData: getData,
        addProductDialog: addProductDialog,
        saveProduct: saveProduct,
        cancelProduct: cancelProduct,
        reset: reset

    }
    function getData() {
        var http = new XMLHttpRequest();
        var url = "/product";
        http.open("GET", url, true);
        var token = 'Bearer ' + window.localStorage.getItem("token");
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                products = JSON.parse(http.responseText);
                drawTable();
            }
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                window.location.assign('/web');
            }
        }
        http.send();
    }

    function drawTable() {
        var element = document.getElementById("productList");
        element.innerHTML = "";
        for (var i = 0; i < products.length; i++) {
            (function (i) {
                var row = document.createElement("div");
                row.className = "flex-item";
                row.className += " row";
                row.className += " over";
                row.className += " jBetween";
                row.style.margin = "2px";
                var child = document.createElement("div");
                child.className = "flex-item"
                child.innerHTML = products[i].name;
                row.appendChild(child);

                var child2 = document.createElement("div");
                child2.className = "flex-item"
                row.appendChild(child2);

                var child3 = document.createElement("img");
                child3.onclick = function () { getDetails(products[i]._id) };
                child3.src = "material-icons/ic_info_outline_24px.svg";
                child3.style.cursor = "pointer";

                child2.appendChild(child3);
                element.appendChild(row);
            })(i)
        }
    }
    function getDetails(id) {
        var http = new XMLHttpRequest();
        var url = "/product/" + id;

        http.open("GET", url, true);
        var token = 'Bearer ' + window.localStorage.getItem("token");
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                productDetail = JSON.parse(http.responseText);
                drawDetails();
            }
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                window.location.assign('/web');
            }
        }
        http.send();
    }
    function drawDetails() {
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


    function addProductDialog() {
        showDialog();
    }
    function saveProduct() {
        console.log(document.forms["productForm"].elements['returnable'].value);
        if (document.forms["productForm"].elements['returnable'].value === "on"){
            document.forms["productForm"].elements['returnable'].value = false;
        }
        else  document.forms["productForm"].elements['returnable'].value = true;
        var http = new XMLHttpRequest();
        var url = "/product";
        http.open("POST", url, true);
        var token = 'Bearer ' + window.localStorage.getItem("token");
        if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
        http.setRequestHeader("Content-type", "application/json");
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 201) {
                dialog.close();
                getData();
                resetForm();
            }
        }
        http.send(JSON.stringify({
            name: document.forms["productForm"].elements['name'].value,
            price: document.forms["productForm"].elements['price'].value,
            quantity: document.forms["productForm"].elements['quantity'].value,
            brand: document.forms["productForm"].elements['brand'].value,
            model: document.forms["productForm"].elements['model'].value,
            origin: document.forms["productForm"].elements['origin'].value,
            returnable: document.forms["productForm"].elements['returnable'].value,
            rating: document.forms["productForm"].elements['rating'].value,
            description: document.forms["productForm"].elements['description'].value
        }));
    }
    function cancelProduct() {
        dialog.close();
        resetForm();
    }
    function resetForm() {
        document.forms["productForm"].elements['name'].value = 'No name';
        document.forms["productForm"].elements['price'].value = 0;
        document.forms["productForm"].elements['quantity'].value = 0;
        document.forms["productForm"].elements['brand'].value = '';
        document.forms["productForm"].elements['model'].value = '';
        document.forms["productForm"].elements['origin'].value = '';
        document.forms["productForm"].elements['returnable'].value = true;
        document.forms["productForm"].elements['rating'].value = 0;
        document.forms["productForm"].elements['description'].value = '';
    }
    function showDialog() {
        if (!dialog.showModal) dialogPolyfill.registerDialog(dialog);
        else dialog.showModal();
    }
    function reset() {
        var element = document.getElementById("productList");
        element.innerHTML = "";
        var element = document.getElementById("productDetails");
        element.innerHTML = "";
        var http = new XMLHttpRequest();
        var url = "/reset";
        http.open("GET", url, true);
        var token = 'Bearer ' + window.localStorage.getItem("token");
        if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                setTimeout(function () { getData(); }, 1500)
            }
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                window.location.assign('/web');
            }
        }
        http.send();
    }
    resetForm();
})()