var rest = (function (Global) {
    'use strict';
    var productDialog = document.querySelector('#productDialog');
    var clientDialog = document.querySelector('#dialog');
    var clientEditDialog = document.querySelector('#editDialog');

    return {
        reset: reset,
        deleteProduct: deleteProduct,
        saveProduct: saveProduct,
        getDetails: getDetails,
        addClient: addClient,
        deleteClient: deleteClient,
        updateClient: updateClient
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
            }
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                window.location.assign('/web');
            }
        }
        http.send();
    }
    //products API
    function deleteProduct(id) {
        var http = new XMLHttpRequest();
        var url = "/product/" + id;

        http.open("DELETE", url, true);
        var token = 'Bearer ' + window.localStorage.getItem("token");
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
            }
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                window.location.assign('/web');
            }
        }
        http.send();
    }
    function saveProduct() {
        var http = new XMLHttpRequest();
        var url = "/product";
        http.open("POST", url, true);
        var token = 'Bearer ' + window.localStorage.getItem("token");
        if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
        http.setRequestHeader("Content-type", "application/json");
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 201) {
                productDialog.close();
                Global.products.resetForm();
            }
        }
        http.send(JSON.stringify({
            name: document.forms["productForm"].elements['name'].value,
            price: document.forms["productForm"].elements['price'].value,
            quantity: document.forms["productForm"].elements['quantity'].value,
            brand: document.forms["productForm"].elements['brand'].value,
            model: document.forms["productForm"].elements['model'].value,
            origin: document.forms["productForm"].elements['origin'].value,
            rating: document.forms["productForm"].elements['rating'].value,
            description: document.forms["productForm"].elements['description'].value,
            returnable: document.forms["productForm"].elements['returnable'].value

        }));
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
                Global.draw.productDetails(JSON.parse(http.responseText));
                Global.products.setDetails(JSON.parse(http.responseText));
            }
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                window.location.assign('/web');
            }
        }
        http.send();
    }

    //clients API
    function addClient() {
        var http = new XMLHttpRequest();
        var url = "/client";
        http.open("POST", url, true);
        var token = 'Bearer ' + window.localStorage.getItem("token");
        if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
        http.setRequestHeader("Content-type", "application/json");
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 201) {
                clientDialog.close();
                Global.clients.resetForm();
            }
        }
        http.send(JSON.stringify({
            lastName: document.forms["laForm"].elements['lastName'].value,
            firstName: document.forms["laForm"].elements['firstName'].value,
            company: document.forms["laForm"].elements['company'].value,
            position: document.forms["laForm"].elements['position'].value
        }));
    }

    function deleteClient(id) {
        var http = new XMLHttpRequest();
        var url = "/client/" + id;
        http.open("DELETE", url, true);
        var token = 'Bearer ' + window.localStorage.getItem("token");
        if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 204) {

            }
        }
        http.send();
    }
    function updateClient(id) {
        var http = new XMLHttpRequest();
        var url = "/client";
        http.open("PUT", url, true);
        var token = 'Bearer ' + window.localStorage.getItem("token");
        if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
        http.setRequestHeader("Content-type", "application/json");
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                clientEditDialog.close();
            }
            else if (http.readyState == 4 && http.status == 401) {

            }
        }
        http.send(JSON.stringify({
            _id: id,
            lastName: document.forms["editForm"].elements['lastName'].value,
            firstName: document.forms["editForm"].elements['firstName'].value,
            company: document.forms["editForm"].elements['company'].value,
            position: document.forms["editForm"].elements['position'].value,
        }));
    }
})(this)
