var products = (function (Global) {
    'use strict';
    var products, productDetail = {};
    var dialog = document.querySelector('#productDialog');
    var socket = io('/admin', { 'query': 'token=' + window.localStorage.getItem("token") });
    var snackbarContainer = document.querySelector('#toast');

    socket.on('addProduct', function (product) {
        products.push(product);
        Global.draw.productsTable(products);
        toast({ message: product.name + " added!" });
    });
    socket.on('deleteProduct', function (product) {
        products.forEach(function (t, i) {
            if (t._id === product._id) {
                products.splice(i, 1);
                if (product._id === productDetail._id) clearDetails();
                Global.draw.productsTable(products);
                toast({ message: product.name + " deleted!" });
            }
        });
    });
    socket.on('updateProduct', function (product) {
        products.forEach(function (t, i) {
            if (t._id === product._id) {
                products[i] = product;
                Global.draw.productsTable(products);
                toast({ message: product.name + " updated!" });
            }
        });
    });
    socket.on('reset', function (product) {
        console.log('reset in products');
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
                Global.draw.productsTable(products);
                toast({ message: "Data reset!" });
            }
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                window.location.assign('/web');
            }
        }
        http.send();
    });

    return {
        getData: getData,
        addProductDialog: addProductDialog,
        saveProduct: saveProduct,
        getDetails: getDetails,
        setDetails: setDetails,
        cancelProduct: cancelProduct,
        deleteProduct: deleteProduct,
        reset: reset,
        resetForm: resetForm,
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
                Global.draw.productsTable(products);
            }
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                window.location.assign('/web');
            }
        }
        http.send();
    }
    function getDetails(id) {
        productDetail = Global.draw.productDetails(id);
    }
    function setDetails(details) {
        productDetail = details;

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
                document.forms["productForm"].elements['returnable'].value = true;
            }
            else document.forms["productForm"].elements['returnable'].value = false;
            Global.rest.saveProduct();
        }
    }
    function deleteProduct(i) {
        Global.rest.deleteProduct(products[i]._id);
    }
    function cancelProduct() {
        dialog.close();
        resetForm();
    }
    function resetForm() {
        console.log(document.forms["productForm"].elements['returnable'].value);
        document.forms["productForm"].reset();
        document.forms["productForm"].elements['returnable'].value = 'off';
    }
    function showDialog() {
        if (!dialog.showModal) dialogPolyfill.registerDialog(dialog);
        else dialog.showModal();
    }

    function logout() {
        window.localStorage.removeItem("token");
        window.location.assign('/');
    }
    function reset() {
        rest.reset();
    }
})(this)