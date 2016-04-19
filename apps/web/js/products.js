var products = (function () {
    'use strict';
    var products, productDetail = {};
    var dialog = document.querySelector('#productDialog');
    var socket = io('/admin', { 'query': 'token=' + window.localStorage.getItem("token") });
    var snackbarContainer = document.querySelector('#toast');

    socket.on('addProduct', function (product) {
        products.push(product);
        draw.productsTable(products);
        toast({ message: product.name + " added!" });
    });
    socket.on('deleteProduct', function (product) {
        products.forEach(function (t, i) {
            if (t._id === product._id) {
                products.splice(i, 1);
                if (product._id === productDetail._id) clearDetails();
                draw.productsTable(products);
                toast({ message: product.name + " deleted!" });
            }
        });
    });
    socket.on('updateProduct', function (product) {
        products.forEach(function (t, i) {
            if (t._id === product._id) {
                products[i] = product;
                draw.productsTable(products);
                toast({ message: product.name + " updated!" });
            }
        });
    });
    socket.on('reset', function (product) {
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
                draw.productsTable(products);
                toast({ message: "Data reset!" });
            }
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                window.location.assign('/web');
            }
        }
        http.send();
    })
    return {
        getData: getData,
        addProductDialog: addProductDialog,
        saveProduct: saveProduct,
        cancelProduct: cancelProduct,
        reset: reset,
        logout: logout

    }
    function toast(msg) {
        snackbarContainer.MaterialSnackbar.showSnackbar(msg);
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
                draw.productsTable(products);
            }
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                window.location.assign('/web');
            }
        }
        http.send();
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
                draw.productDetails(productDetail);
            }
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                window.location.assign('/web');
            }
        }
        http.send();
    }
    function clearDetails() {
        var element = document.getElementById("productDetails");
        element.innerHTML = "";
    }

    function addProductDialog() {
        showDialog();
    }
    function saveProduct() {
        if (
            document.forms["productForm"].elements['name'].value === ''
        ) {
            var data = { message: 'Please fill all required fields' };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
        else {
            if (document.forms["productForm"].elements['returnable'].value === "on") {
                document.forms["productForm"].elements['returnable'].value = false;
            }
            else document.forms["productForm"].elements['returnable'].value = true;

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
    }
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
    function cancelProduct() {
        dialog.close();
        resetForm();
    }
    function resetForm() {
        document.forms["productForm"].reset();
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
    function logout() {
        window.localStorage.removeItem("token");
        window.location.assign('/');
    }

})()