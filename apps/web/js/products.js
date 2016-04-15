var products = (function () {
    'use strict';
    var products, productDetail = {};
    var dialog = document.querySelector('#productDialog');
    var socket = io('/admin', { 'query': 'token=' + window.localStorage.getItem("token") });
    var snackbarContainer = document.querySelector('#toast');

    socket.on('addProduct', function (product) {
        products.push(product);
        drawTable();
        toast({ message: product.name + " added!" });
    });
    socket.on('deleteProduct', function (product) {
        products.forEach(function (t, i) {
            if (t._id === product._id) {
                products.splice(i, 1);
                if (product._id === productDetail._id) clearDetails();
                drawTable();
                toast({ message: product.name + " deleted!" });
            }
        });
    });
    socket.on('updateProduct', function (product) {
        products.forEach(function (t, i) {
            if (t._id === product._id) {
                products[i] = product;
                drawTable();
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
                drawTable();
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
    function clearDetails() {
        var element = document.getElementById("productDetails");
        element.innerHTML = "";
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